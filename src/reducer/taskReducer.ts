import type { ColumnType, Task } from "../types/task";

export interface TaskState {
  tasks: Task[];
}

export type TaskAction =
  | {
      type: "ADD_TASK";
      payload: {
        title: string;
        description: string;
      };
    }
  | {
      type: "DELETE_TASK";
      payload: {
        id: string;
      };
    }
  | {
      type: "MOVE_TASK";
      payload: {
        id: string;
        status: ColumnType;
      };
    }
  | {
      type: "LOAD_TASKS";
      payload: Task[];
    };

export const initialTaskState: TaskState = {
  tasks: [],
};

export const taskReducer = (
  state: TaskState,
  action: TaskAction,
): TaskState => {
  switch (action.type) {
    case "ADD_TASK": {
      const newTask: Task = {
        id: crypto.randomUUID(),
        title: action.payload.title.trim(),
        description: action.payload.description.trim(),
        status: "todo",
      };

      return {
        tasks: [newTask, ...state.tasks],
      };
    }

    case "DELETE_TASK":
      return {
        tasks: state.tasks.filter((task) => task.id !== action.payload.id),
      };

    case "MOVE_TASK":
      return {
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id
            ? { ...task, status: action.payload.status }
            : task,
        ),
      };

    case "LOAD_TASKS":
      return {
        tasks: action.payload,
      };

    default:
      return state;
  }
};
