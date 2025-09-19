"use client";

import { useCallback, useRef } from "react";
import { useLocalStorage } from "./useLocalStorage";
import type { Task, TaskId } from "../types/todo";

function generateId(): TaskId {
  // Simple unique id: timestamp + random
  return `${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

export function useTasks(initial: Task[] = []) {
  const [tasks, setTasks] = useLocalStorage<Task[]>("tasks", initial);
  const lastAddedId = useRef<TaskId | null>(null);

  const addTask = useCallback((text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return null;
    const task: Task = { id: generateId(), text: trimmed, completed: false };
    lastAddedId.current = task.id;
    setTasks(prev => [...prev, task]);
    return task.id;
  }, [setTasks]);

  const toggleTask = useCallback((id: TaskId) => {
    setTasks(prev => prev.map(t => (t.id === id ? { ...t, completed: !t.completed } : t)));
  }, [setTasks]);

  const removeTask = useCallback((id: TaskId) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  }, [setTasks]);

  return { tasks, setTasks, addTask, toggleTask, removeTask, lastAddedId } as const;
}


