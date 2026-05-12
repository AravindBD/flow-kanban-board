import { useEffect, useReducer } from "react";
import Board from "./components/Board";
import TaskForm from "./components/TaskForm";
import {
  initialTaskState,
  taskReducer,
} from "./reducer/taskReducer";
import type { ColumnType } from "./types/task";
import {
  loadTasksFromStorage,
  saveTasksToStorage,
} from "./utils/storage";

const App = () => {
  const [state, dispatch] = useReducer(taskReducer, initialTaskState);

  useEffect(() => {
    dispatch({
      type: "LOAD_TASKS",
      payload: loadTasksFromStorage(),
    });
  }, []);

  useEffect(() => {
    saveTasksToStorage(state.tasks);
  }, [state.tasks]);

  const handleAddTask = (title: string, description: string) => {
    dispatch({
      type: "ADD_TASK",
      payload: { title, description },
    });
  };

  const handleDeleteTask = (id: string) => {
    dispatch({
      type: "DELETE_TASK",
      payload: { id },
    });
  };

  const handleMoveTask = (id: string, status: ColumnType) => {
    dispatch({
      type: "MOVE_TASK",
      payload: { id, status },
    });
  };

  return (
    <main className="min-h-screen bg-[#f6f7fb] px-4 py-6 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <header className="flex flex-col justify-between gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-cyan-700">
              Task Management
            </p>
            <h1 className="mt-2 text-3xl font-bold text-slate-950 sm:text-4xl">
              Kanban Board
            </h1>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white px-4 py-3 shadow-sm">
            <p className="text-sm font-medium text-slate-500">Total tasks</p>
            <p className="text-2xl font-bold text-slate-950">
              {state.tasks.length}
            </p>
          </div>
        </header>

        <TaskForm onAddTask={handleAddTask} />

        <Board
          tasks={state.tasks}
          onDeleteTask={handleDeleteTask}
          onMoveTask={handleMoveTask}
        />
      </div>
    </main>
  );
};

export default App;
