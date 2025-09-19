"use client";

import { useMemo, useState } from "react";
import { WEEKDAYS, getDaysMatrix } from "../utils/calendar";

export default function Calendar() {
  const [currDate, setCurrDate] = useState<Date>(new Date());

  const header = useMemo(
    () => currDate.toLocaleString("default", { month: "long", year: "numeric" }),
    [currDate]
  );

  const cells = useMemo(() => getDaysMatrix(currDate), [currDate]);

  const today = new Date();
  const isToday = (d: number): boolean =>
    d === today.getDate() &&
    currDate.getMonth() === today.getMonth() &&
    currDate.getFullYear() === today.getFullYear();

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <button
          type="button"
          onClick={() => setCurrDate(d => new Date(d.getFullYear(), d.getMonth() - 1, 1))}
          className="bg-transparent border-0 text-[18px] cursor-pointer text-[#2A8D63]"
          aria-label="Previous month"
        >
          &lt;
        </button>
        <div className="font-semibold" aria-live="polite">{header}</div>
        <button
          type="button"
          onClick={() => setCurrDate(d => new Date(d.getFullYear(), d.getMonth() + 1, 1))}
          className="bg-transparent border-0 text-[18px] cursor-pointer text-[#2A8D63]"
          aria-label="Next month"
        >
          &gt;
        </button>
      </div>
      <div className="grid grid-cols-7 text-center">
        {WEEKDAYS.map(w => (
          <div key={w} className="text-[12px] text-[#7DAE9D] mb-1">{w}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 text-center">
        {cells.map((c, idx) => (
          <div
            key={idx}
            className={[
              "p-2 m-[1px] rounded-[20px] cursor-pointer text-[#2A8D63]",
              c.type === "prev" ? "text-[#CADACA]" : "",
              c.type === "curr" && isToday(c.label) ? "bg-[#D5F2E1]" : "",
            ].join(" ")}
          >
            {c.label}
          </div>
        ))}
      </div>
    </div>
  );
}


