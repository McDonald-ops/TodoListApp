"use client";

import { useEffect, useState } from "react";
import TaskItem from "./TaskItem";

export type Task = {
  text: string;
  completed: boolean;
};

export default function TaskList({
  tasks,
  onToggle,
  onRemove,
}: {
  tasks: Task[];
  onToggle: (index: number) => void;
  onRemove: (index: number) => void;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

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
      {tasks.map((t, i) => (
        <div key={`${t.text}-${i}`} data-task-menu>
          <TaskItem
            index={i}
            text={t.text}
            completed={t.completed}
            onToggle={onToggle}
            onRemove={(idx) => { onRemove(idx); setOpenIndex(null); }}
            menuOpen={openIndex === i}
            onToggleMenu={(idx) => setOpenIndex(prev => prev === idx ? null : idx)}
          />
        </div>
      ))}
    </ul>
  );
}


