"use client";

import { useRef } from "react";

export type TaskItemProps = {
  index: number;
  text: string;
  completed: boolean;
  onToggle: (index: number) => void;
  onRemove: (index: number) => void;
  menuOpen: boolean;
  onToggleMenu: (index: number) => void;
};

export default function TaskItem({ index, text, completed, onToggle, onRemove, menuOpen, onToggleMenu }: TaskItemProps) {
  const buttonRef = useRef<HTMLDivElement | null>(null);

  return (
    <li className={`flex items-center justify-between p-2 bg-[rgba(217,243,228,0.5)] rounded-[8px] mb-2 ${completed ? "" : ""}`}>
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={completed}
          onChange={() => onToggle(index)}
          className="mr-2 w-[18px] h-[18px]"
          aria-label={completed ? "Mark as active" : "Mark as completed"}
        />
        <span className={`${completed ? "line-through opacity-60 text-[#7DAE9D]" : "text-[#2A8D63]"}`}>{text}</span>
      </div>
      <div ref={buttonRef} className="relative text-[18px] px-[6px] cursor-pointer" onClick={() => onToggleMenu(index)}>
        ⋮
        <div className={`absolute top-full right-0 bg-white border border-[#CADACA] rounded shadow mt-1 whitespace-nowrap z-10 ${menuOpen ? "block" : "hidden"}`}>
          <button
            type="button"
            className="block w-full text-left px-3 py-1 text-[14px] text-[#2A8D63] hover:bg-[rgba(217,243,228,0.8)]"
            onClick={() => onRemove(index)}
          >
            Remove Task
          </button>
        </div>
      </div>
    </li>
  );
}


