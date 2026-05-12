import TaskCard from "./TaskCard";
import type { ColumnType, Task } from "../types/task";

interface ColumnProps {
  title: string;
  status: ColumnType;
  tasks: Task[];
  onDeleteTask: (id: string) => void;
  onMoveTask: (id: string, status: ColumnType) => void;
}

const columnAccent: Record<ColumnType, string> = {
  todo: "border-t-sky-500",
  inprogress: "border-t-amber-500",
  done: "border-t-emerald-500",
};

const Column = ({
  title,
  status,
  tasks,
  onDeleteTask,
  onMoveTask,
}: ColumnProps) => {
  return (
    <section
      aria-labelledby={`${status}-heading`}
      className={`flex min-h-[22rem] flex-col rounded-lg border border-slate-200 border-t-4 ${columnAccent[status]} bg-slate-50/80 p-4 shadow-sm`}
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 id={`${status}-heading`} className="text-lg font-bold text-slate-950">
          {title}
        </h2>
        <span className="rounded-full bg-white px-2.5 py-1 text-xs font-bold text-slate-600 shadow-sm ring-1 ring-slate-200">
          {tasks.length}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onDeleteTask={onDeleteTask}
              onMoveTask={onMoveTask}
            />
          ))
        ) : (
          <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed border-slate-300 bg-white/70 p-6 text-center text-sm font-medium text-slate-500">
            No tasks in this column
          </div>
        )}
      </div>
    </section>
  );
};

export default Column;
