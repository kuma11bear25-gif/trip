import { useEffect, useRef, useState } from "react";
import { PREFECTURES } from "../data/prefectures";
import { photoImageUrl } from "../api";
import type { Summary } from "../types";

interface JapanMapProps {
  summary: Summary;
  selectedCode: string | null;
  onSelect: (code: string) => void;
}

const MAP_URL = "/japan-map.svg";

function densityColor(count: number): string {
  if (count <= 0) return "var(--map-empty)";
  if (count === 1) return "var(--map-density-1)";
  if (count <= 3) return "var(--map-density-2)";
  if (count <= 9) return "var(--map-density-3)";
  return "var(--map-density-4)";
}

export default function JapanMap({ summary, selectedCode, onSelect }: JapanMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svgReady, setSvgReady] = useState(false);
  const onSelectRef = useRef(onSelect);
  onSelectRef.current = onSelect;

  useEffect(() => {
    let cancelled = false;
    fetch(MAP_URL)
      .then((res) => res.text())
      .then((svgText) => {
        if (cancelled || !containerRef.current) return;
        containerRef.current.innerHTML = svgText;

        const groups = containerRef.current.querySelectorAll<SVGGElement>(".prefecture");
        groups.forEach((group) => {
          const code = (group.dataset.code ?? "").padStart(2, "0");
          group.classList.add("prefecture-group");
          group.addEventListener("click", () => onSelectRef.current(code));
        });

        setSvgReady(true);
      })
      .catch((err) => console.error("地図の読み込みに失敗しました", err));

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!svgReady || !containerRef.current) return;
    const groups = containerRef.current.querySelectorAll<SVGGElement>(".prefecture");
    groups.forEach((group) => {
      const code = (group.dataset.code ?? "").padStart(2, "0");
      const count = summary[code]?.count ?? 0;
      group.style.fill = densityColor(count);
      group.classList.toggle("prefecture-selected", code === selectedCode);
    });
  }, [summary, selectedCode, svgReady]);

  return (
    <div className="japan-map">
      <div className="japan-map__svg" ref={containerRef} aria-label="日本地図" />
      {svgReady && (
        <div className="japan-map__overlay" aria-hidden="true">
          {PREFECTURES.map((pref) => {
            const entry = summary[pref.code];
            if (!entry || entry.count === 0) return null;
            return (
              <button
                key={pref.code}
                type="button"
                className={`photo-pin${pref.code === selectedCode ? " photo-pin--selected" : ""}`}
                style={{ left: `${pref.cx * 100}%`, top: `${pref.cy * 100}%` }}
                onClick={() => onSelect(pref.code)}
                title={`${pref.nameJa}（${entry.count}件）`}
              >
                {entry.thumbnail ? (
                  <img src={photoImageUrl(entry.thumbnail)} alt="" />
                ) : null}
                <span className="photo-pin__count">{entry.count}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
