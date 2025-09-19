export type TaskId = string;

export type Task = {
  id: TaskId;
  text: string;
  completed: boolean;
};

export type Filter = "all" | "active" | "completed";


