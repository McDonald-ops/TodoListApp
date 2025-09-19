"use client";

import type { Filter } from "../types/todo";

import { memo } from "react";

// Segmented control for switching the filter state
function FiltersBase({
  filter,
  onChange,
}: {
  filter: Filter;
  onChange: (f: Filter) => void;
}) {
  const baseBtn =
    "flex-1 mx-[5px] py-[6px] border-0 rounded-[20px] text-white text-[14px] cursor-pointer";
  return (
    <div className="flex justify-around mb-[30px]">
      {(
        [
          { key: "all", label: "All" },
          { key: "active", label: "Active" },
          { key: "completed", label: "Completed" },
        ] as { key: Filter; label: string }[]
      ).map(({ key, label }) => (
        <button
          key={key}
          type="button"
          onClick={() => onChange(key)}
          className={`${baseBtn} ${filter === key ? "bg-[#4A7BD1]" : "bg-[#CADACA]"}`}
          data-filter={key}
          aria-pressed={filter === key}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

const Filters = memo(FiltersBase);
export default Filters;
