"use client";

import { useEffect, useState } from "react";
import TaskItem from "./TaskItem";
import { memo } from "react";
import type { Task, TaskId } from "../types/todo";

// Renders the list of tasks and manages the per-item menu open state
function TaskListBase({
  tasks,
  onToggle,
  onRemove,
}: {
  tasks: Task[];
  onToggle: (id: TaskId) => void;
  onRemove: (id: TaskId) => void;
}) {
  const [openIndex, setOpenIndex] = useState<TaskId | null>(null);

  // Close menu on outside click
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      const target = e.target as HTMLElement;
      if (!target.closest('[data-task-menu]')) setOpenIndex(null);
    }
    document.addEventListener('click', onDocClick);
    return () => document.removeEventListener('click', onDocClick);
  }, []);

  return (
    <ul className="list-none mb-6">
      {tasks.length === 0 ? (
        <li className="text-center text-sm font-bold text-[#7DAE9D]">No tasks yet</li>
      ) : tasks.map((t) => (
        <div key={t.id} data-task-menu>
          <TaskItem
            id={t.id}
            text={t.text}
            completed={t.completed}
            onToggle={onToggle}
            onRemove={(id) => { onRemove(id); setOpenIndex(null); }}
            menuOpen={openIndex === t.id}
            onToggleMenu={(id) => setOpenIndex(prev => prev === id ? null : id)}
          />
        </div>
      ))}
    </ul>
  );
}

const TaskList = memo(TaskListBase);
export default TaskList;


