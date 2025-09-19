"use client";

import { useRef } from "react";
import type { TaskId } from "../types/todo";

export type TaskItemProps = {
  id: TaskId;
  text: string;
  completed: boolean;
  onToggle: (id: TaskId) => void;
  onRemove: (id: TaskId) => void;
  menuOpen: boolean;
  onToggleMenu: (id: TaskId) => void;
};

import { memo } from "react";

// Single task row with checkbox and overflow menu
function TaskItemBase({ id, text, completed, onToggle, onRemove, menuOpen, onToggleMenu }: TaskItemProps) {
  const buttonRef = useRef<HTMLDivElement | null>(null);

  return (
    <li className={`flex items-center justify-between p-2 bg-[rgba(217,243,228,0.5)] rounded-[8px] mb-2 ${completed ? "" : ""}`}>
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={completed}
          onChange={() => onToggle(id)}
          className="mr-2 w-[18px] h-[18px]"
          aria-label={completed ? "Mark as active" : "Mark as completed"}
        />
        <span className={`${completed ? "line-through opacity-60 text-[#7DAE9D]" : "text-[#2A8D63]"}`}>{text}</span>
      </div>
      <div ref={buttonRef} className="relative text-[18px] px-[6px]">
        <button
          type="button"
          aria-haspopup="menu"
          aria-expanded={menuOpen}
          className="cursor-pointer"
          onClick={() => onToggleMenu(id)}
        >
          ⋮
        </button>
        <div className={`absolute top-full right-0 bg-white border border-[#CADACA] rounded shadow mt-1 whitespace-nowrap z-10 ${menuOpen ? "block" : "hidden"}`}>
          <button
            type="button"
            className="block w-full text-left px-3 py-1 text-[14px] text-[#2A8D63] hover:bg-[rgba(217,243,228,0.8)]"
            onClick={() => onRemove(id)}
          >
            Remove Task
          </button>
        </div>
      </div>
    </li>
  );
}

const TaskItem = memo(TaskItemBase);
export default TaskItem;


