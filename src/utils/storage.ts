import type { Task } from "../types/task";

const STORAGE_KEY = "kanban-board-tasks";

const isTask = (value: unknown): value is Task => {
  if (!value || typeof value !== "object") {
    return false;
  }

  const task = value as Task;
  return (
    typeof task.id === "string" &&
    typeof task.title === "string" &&
    typeof task.description === "string" &&
    ["todo", "inprogress", "done"].includes(task.status)
  );
};

export const loadTasksFromStorage = (): Task[] => {
  try {
    const storedTasks = localStorage.getItem(STORAGE_KEY);
    if (!storedTasks) {
      return [];
    }

    const parsedTasks: unknown = JSON.parse(storedTasks);
    return Array.isArray(parsedTasks) ? parsedTasks.filter(isTask) : [];
  } catch {
    return [];
  }
};

export const saveTasksToStorage = (tasks: Task[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
};
