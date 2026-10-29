"use client";

import { useId, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { PipelineStage, pipelineStages } from "./data";
import { Range, RangeToggle } from "./range-toggle";
import { TrendIndicator } from "./trend-indicator";

const TICK_COUNT = 4;

const formatK = (value: number) =>
  `${Number((value / 1000).toFixed(1)).toString()}k`;

/** Round the axis max up so ticks land on whole thousands. */
function niceMax(max: number) {
  const step = Math.ceil(max / (TICK_COUNT - 1) / 1000) * 1000 || 1000;
  return step * (TICK_COUNT - 1);
}

/** Smooth path through the points with flat tangents, in a 0–100 viewBox. */
function buildPath(points: { x: number; y: number }[]) {
  return points.reduce((d, p, i) => {
    if (i === 0) return `M ${p.x} ${p.y}`;
    const prev = points[i - 1];
    const mid = (prev.x + p.x) / 2;
    return `${d} C ${mid} ${prev.y}, ${mid} ${p.y}, ${p.x} ${p.y}`;
  }, "");
}

function AreaChart({ series }: { series: PipelineStage["series"] }) {
  const gradientId = useId();
  const [active, setActive] = useState(3);

  const { max, points, line, area } = useMemo(() => {
    const max = niceMax(Math.max(...series.map((s) => s.value)));
    const points = series.map((s, i) => ({
      x: (i / (series.length - 1)) * 100,
      y: 100 - (s.value / max) * 100,
    }));
    const line = buildPath(points);
    return { max, points, line, area: `${line} L 100 100 L 0 100 Z` };
  }, [series]);

  const ticks = Array.from(
    { length: TICK_COUNT },
    (_, i) => (max / (TICK_COUNT - 1)) * (TICK_COUNT - 1 - i),
  );
  const point = points[active];

  const handlePointer = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    setActive(
      Math.min(series.length - 1, Math.max(0, Math.round(ratio * (series.length - 1)))),
    );
  };

  return (
    <div className="flex w-full gap-2.5 px-2 pt-6 md:px-6">
      {/* Y axis */}
      <div className="relative h-[260px] w-[26px] shrink-0 text-[12px] text-[#888D93] md:h-[400px]">
        {ticks.map((tick, i) => (
          <span
            key={tick}
            className="absolute right-0 -translate-y-1/2"
            style={{ top: `${(i / (TICK_COUNT - 1)) * 100}%` }}
          >
            {formatK(tick)}
          </span>
        ))}
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <div
          className="relative h-[260px] border-b-[0.5px] border-l-[0.5px] border-black/20 md:h-[400px]"
          onPointerMove={handlePointer}
        >
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="absolute inset-0 size-full overflow-visible"
            aria-hidden
          >
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#5019F5" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#3D0EE6" stopOpacity={0.08} />
              </linearGradient>
            </defs>
            <path d={area} fill={`url(#${gradientId})`} />
            <path
              d={line}
              fill="none"
              stroke="#7557D3"
              strokeWidth={2}
              vectorEffect="non-scaling-stroke"
            />
            <line
              x1={point.x}
              x2={point.x}
              y1={point.y}
              y2={100}
              stroke="#7557D3"
              strokeWidth={2}
              strokeDasharray="4 4"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          {/* Active point + tooltip */}
          <div
            className="pointer-events-none absolute"
            style={{ left: `${point.x}%`, top: `${point.y}%` }}
          >
            <span className="absolute size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-[1.5px] border-[#7557D3] bg-white" />
            <div className="absolute bottom-3 flex -translate-x-1/2 flex-col items-center gap-1 rounded-[6px] border border-[#E6E6E6] bg-white px-5 py-2 whitespace-nowrap text-[#333] shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
              <span className="text-[12px]">
                {series[active].day}
              </span>
              <span className="text-[16px] leading-[18px] font-semibold">
                {formatK(series[active].value)}
              </span>
              <span className="absolute -bottom-[5px] left-1/2 size-2 -translate-x-1/2 rotate-45 border-r border-b border-[#E6E6E6] bg-white" />
            </div>
          </div>
        </div>

        {/* X axis */}
        <div className="flex justify-between pt-6 pb-2 text-[12px]">
          {series.map((s, i) => (
            <span
              key={s.day}
              className={cn(
                i === active
                  ? "font-medium text-[#333]"
                  : " text-[#807E7C]",
              )}
            >
              {s.day.slice(0, 3)}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function PipelineFunnelCard() {
  const [range, setRange] = useState<Range>("7d");
  const [stageKey, setStageKey] = useState(pipelineStages[0].key);
  const stage = pipelineStages.find((s) => s.key === stageKey) ?? pipelineStages[0];

  return (
    <section className="flex min-w-0 flex-1 flex-col gap-2 overflow-hidden rounded-[16px] border border-[#F3F3F3] bg-[#FAFAFA] px-2 pt-4 pb-2">
      <header className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="flex-1 text-[16px] leading-[19.2px] font-bold whitespace-nowrap text-[#333]">
          Pipeline funnel analytics
        </h2>
        <RangeToggle value={range} onChange={setRange} size="lg" />
      </header>

      <div className="flex flex-1 flex-col gap-4 rounded-[10px] border border-[#F3F3F3] bg-white py-2">
        <div role="tablist" className="flex overflow-x-auto px-2">
          {pipelineStages.map((s) => {
            const active = s.key === stage.key;
            return (
              <button
                key={s.key}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setStageKey(s.key)}
                className={cn(
                  "flex min-w-[120px] flex-1 cursor-pointer flex-col items-center justify-center gap-2 p-2",
                  active
                    ? "border-b-2 border-[#7557D3]"
                    : "border-b border-[#E6E6E6]",
                )}
              >
                <span className="text-[16px] leading-[19.2px] font-bold text-[#252C32]">
                  {s.total}
                </span>
                <span className="text-[12px] text-[#41474D]">
                  {s.label}
                </span>
                <TrendIndicator trend={s.trend} caption="since yesterday" />
              </button>
            );
          })}
        </div>

        <AreaChart series={stage.series} />
      </div>
    </section>
  );
}
