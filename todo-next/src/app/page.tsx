"use client";

import Image from "next/image";
import { useMemo, useState, useCallback, useEffect, Suspense } from "react";
import Calendar from "../components/Calendar";
import Filters from "../components/Filters";
import TaskList from "../components/TaskList";
import type { Filter, TaskId } from "../types/todo";
import { useTasks } from "../hooks/useTasks";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

// Component that uses useSearchParams wrapped in Suspense
function HomeContent() {
  const { tasks, addTask, toggleTask, removeTask } = useTasks([]);
  const [filter, setFilter] = useState<Filter>("all");
  const [input, setInput] = useState<string>("");

  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  useEffect(() => {
    const f = params.get("filter") as Filter | null;
    if (f && ["all","active","completed"].includes(f)) setFilter(f);
  }, [params]);
  const updateFilter = useCallback((f: Filter) => {
    const usp = new URLSearchParams(params.toString());
    if (f === "all") usp.delete("filter"); else usp.set("filter", f);
    router.push(`${pathname}?${usp.toString()}`, { scroll: false });
    setFilter(f);
  }, [params, pathname, router]);

  const filteredTasks = useMemo(() => {
    if (filter === "active") return tasks.filter(t => !t.completed);
    if (filter === "completed") return tasks.filter(t => t.completed);
    return tasks;
  }, [tasks, filter]);

  const completedCount = useMemo(
    () => tasks.filter(t => t.completed).length,
    [tasks]
  );

  const onSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    const id = addTask(input);
    if (id) setInput("");
  }, [addTask, input]);

  const onToggle = useCallback((id: TaskId) => toggleTask(id), [toggleTask]);
  const onRemove = useCallback((id: TaskId) => removeTask(id), [removeTask]);

  return (
    <div className="flex justify-center p-5">
      <div className="w-[600px]">
        {/* Top bar */}
        <div className="flex justify-between items-center mb-6">
          <div className="w-10 h-10 relative">
            <Image src="/avatar.png" alt="Profile Avatar" fill className="rounded-full object-cover" />
          </div>
          <div className="text-2xl cursor-pointer settings-spin">⚙️</div>
        </div>

        {/* Calendar */}
        <div className="bg-white rounded-xl p-5 shadow mb-5">
          <Calendar />
        </div>

        {/* New task input */}
        <form className="flex items-center mb-6" onSubmit={onSubmit} aria-label="Add task">
          <label htmlFor="task-input" className="sr-only">Add new task</label>
          <input
            id="task-input"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Add new task"
            className="flex-1 p-2 border border-[#CADACA] rounded-[16px] mr-1 text-sm text-[#2A8D63] placeholder:text-[#7DAE9D] bg-white outline-none"
          />
          <button
            type="submit"
            className="w-[30px] h-[30px] border-0 bg-[#4A7BD1] text-white rounded-full text-[20px] cursor-pointer hover:bg-[#3A5BB1] active:bg-[#2A4D91] transition-colors"
            aria-label="Add task"
          >
            ＋
          </button>
          <div className="relative ml-5 w-[30px] h-[30px] cursor-pointer">
            <svg viewBox="0 0 24 24" aria-hidden="true" className="w-full h-full fill-[#0e7c7b] hover:fill-[#2A8D63] transition-colors">
              <path d="M12 2C10.343 2 9 3.343 9 5v1.083C6.165 6.56 4 9.175 4 12v5l-1 1v1h18v-1l-1-1v-5c0-2.825-2.165-5.44-5-5.917V5c0-1.657-1.343-3-3-3zM7 17v-5c0-2.481 1.79-4.537 4.152-4.917L11 7c0-.551.449-1 1-1s1 .449 1 1v.083C15.21 7.463 17 9.519 17 12v5H7zm5 4c1.104 0 2-.896 2-2h-4c0 1.104.896 2 2 2z"/>
            </svg>
            <span className="absolute top-0 right-0 min-w-4 h-4 px-1 rounded-[8px] bg-[#e74c3c] text-white text-[10px] font-bold leading-4 text-center translate-x-1/2 -translate-y-1/2">1</span>
          </div>
        </form>

        {/* Filters */}
        <Filters filter={filter} onChange={updateFilter} />

        {/* Task list */}
        <TaskList
          tasks={filteredTasks}
          onToggle={onToggle}
          onRemove={onRemove}
        />

        {/* Footer */}
        <div className="text-center text-sm text-[#7DAE9D] font-bold">{completedCount} of {tasks.length} tasks done</div>
      </div>
    </div>
  );
}

// App composition: top bar, calendar, task input, filters, list, footer
export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
}
