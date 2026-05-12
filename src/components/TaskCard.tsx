import type { ColumnType, Task } from "../types/task";

interface TaskCardProps {
  task: Task;
  onDeleteTask: (id: string) => void;
  onMoveTask: (id: string, status: ColumnType) => void;
}

const statusOrder: ColumnType[] = ["todo", "inprogress", "done"];

const TaskCard = ({ task, onDeleteTask, onMoveTask }: TaskCardProps) => {
  const currentStatusIndex = statusOrder.indexOf(task.status);
  const previousStatus = statusOrder[currentStatusIndex - 1];
  const nextStatus = statusOrder[currentStatusIndex + 1];

  return (
    <article className="group rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-cyan-200 hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="break-words text-base font-semibold text-slate-950">
            {task.title}
          </h3>
          <p className="mt-2 whitespace-pre-wrap break-words text-sm leading-6 text-slate-600">
            {task.description || "No description provided."}
          </p>
        </div>

        <button
          type="button"
          onClick={() => onDeleteTask(task.id)}
          aria-label={`Delete ${task.title}`}
          className="rounded-md border border-transparent px-2 py-1 text-sm font-semibold text-rose-700 transition hover:border-rose-200 hover:bg-rose-50 focus:outline-none focus:ring-4 focus:ring-rose-100"
        >
          Delete
        </button>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {previousStatus && (
          <button
            type="button"
            onClick={() => onMoveTask(task.id, previousStatus)}
            className="rounded-md border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:border-cyan-300 hover:bg-cyan-50 hover:text-cyan-900 focus:outline-none focus:ring-4 focus:ring-cyan-100"
          >
            Move Left
          </button>
        )}

        {nextStatus && (
          <button
            type="button"
            onClick={() => onMoveTask(task.id, nextStatus)}
            className="rounded-md border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:border-cyan-300 hover:bg-cyan-50 hover:text-cyan-900 focus:outline-none focus:ring-4 focus:ring-cyan-100"
          >
            Move Right
          </button>
        )}

        {task.status !== "done" && (
          <button
            type="button"
            onClick={() => onMoveTask(task.id, "done")}
            className="rounded-md bg-emerald-700 px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-emerald-800 focus:outline-none focus:ring-4 focus:ring-emerald-100"
          >
            Move to Done
          </button>
        )}
      </div>
    </article>
  );
};

export default TaskCard;
