"use client";

import { useCallback, useRef } from "react";
import { useLocalStorage } from "./useLocalStorage";
import type { Task, TaskId } from "../types/todo";

// Generates a compact unique id. Good enough for client-side lists.
function generateId(): TaskId {
  return `${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

// Encapsulates task list state, persistence, and operations
export function useTasks(initial: Task[] = []) {
  const [tasks, setTasks] = useLocalStorage<Task[]>("tasks", initial);
  const lastAddedId = useRef<TaskId | null>(null);

  // Adds a task and returns its generated id (or null if skipped)
  const addTask = useCallback((text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return null;
    const task: Task = { id: generateId(), text: trimmed, completed: false };
    lastAddedId.current = task.id;
    setTasks(prev => [...prev, task]);
    return task.id;
  }, [setTasks]);

  // Toggles completion for a given task id
  const toggleTask = useCallback((id: TaskId) => {
    setTasks(prev => prev.map(t => (t.id === id ? { ...t, completed: !t.completed } : t)));
  }, [setTasks]);

  // Permanently removes a task by id
  const removeTask = useCallback((id: TaskId) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  }, [setTasks]);

  return { tasks, setTasks, addTask, toggleTask, removeTask, lastAddedId } as const;
}


