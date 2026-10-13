"use client";

import { useState } from "react";
import { userRetention } from "./data";
import { BreakdownRow, Panel } from "./panel";
import { Range, RangeToggle } from "./range-toggle";

export function UserRetentionCard() {
  const [range, setRange] = useState<Range>("7d");

  return (
    <Panel
      title="User retention"
      action={<RangeToggle value={range} onChange={setRange} />}
    >
      {userRetention.map((item) => (
        <BreakdownRow
          key={item.label}
          item={item}
          labelClassName="text-[14px] font-semibold"
        />
      ))}
    </Panel>
  );
}
