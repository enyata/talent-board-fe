"use client";

import { useState } from "react";
import { scheduling } from "./data";
import { BreakdownRow, Panel } from "./panel";
import { Range, RangeToggle } from "./range-toggle";

const SIZE = 182;
const STROKE = 24;
const RADIUS = (SIZE - STROKE) / 2 - 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function Donut({
  segments,
  total,
}: {
  segments: { value: number; color: string }[];
  total: string;
}) {
  const sum = segments.reduce((acc, s) => acc + s.value, 0);
  let offset = 0;

  return (
    <div className="relative size-[182px] shrink-0">
      {/* Rotated so the first segment starts at 6 o'clock and runs clockwise. */}
      <svg
        width={SIZE}
        height={SIZE}
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className="rotate-90"
        aria-hidden
      >
        {segments.map((segment) => {
          const length = (segment.value / sum) * CIRCUMFERENCE;
          const dashOffset = -offset;
          offset += length;
          const common = {
            cx: SIZE / 2,
            cy: SIZE / 2,
            r: RADIUS,
            fill: "none",
            strokeLinecap: "round" as const,
            strokeDasharray: `${length} ${CIRCUMFERENCE}`,
            strokeDashoffset: dashOffset,
          };
          // White halo underneath gives the overlapping round caps their outline.
          return (
            <g key={segment.color}>
              <circle {...common} stroke="white" strokeWidth={STROKE + 4} />
              <circle {...common} stroke={segment.color} strokeWidth={STROKE} />
            </g>
          );
        })}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <p className="text-[18px] leading-[21.6px] font-bold text-[#1C1B1F]">
          {total}
        </p>
        <p className="text-[10px] font-medium text-[#252C32]">Total</p>
      </div>
    </div>
  );
}

export function SchedulingCard() {
  const [range, setRange] = useState<Range>("7d");

  return (
    <Panel
      title="Scheduling"
      action={<RangeToggle value={range} onChange={setRange} size="sm" short />}
    >
      <div className="flex justify-center">
        <Donut
          total={scheduling.total}
          segments={scheduling.items.map(({ value, color }) => ({ value, color }))}
        />
      </div>
      <div className="flex flex-col gap-4 px-2">
        {scheduling.items.map((item) => (
          <BreakdownRow
            key={item.label}
            item={item}
            bordered
            labelClassName="text-[14px] leading-[21px]"
            marker={
              <span
                className="size-2.5 shrink-0 rounded-full"
                style={{ backgroundColor: item.color }}
              />
            }
          />
        ))}
      </div>
    </Panel>
  );
}
