import { FormEvent, useMemo, useState } from "react";

interface TaskFormProps {
  onAddTask: (title: string, description: string) => void;
}

const TaskForm = ({ onAddTask }: TaskFormProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const isSubmitDisabled = useMemo(() => title.trim().length === 0, [title]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitDisabled) {
      return;
    }

    onAddTask(title, description);
    setTitle("");
    setDescription("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-lg border border-slate-200 bg-white p-4 shadow-soft sm:p-5"
    >
      <div className="grid gap-4 md:grid-cols-[1fr_1.5fr_auto] md:items-end">
        <div>
          <label
            htmlFor="task-title"
            className="mb-2 block text-sm font-semibold text-slate-700"
          >
            Title
          </label>
          <input
            id="task-title"
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Prepare sprint notes"
            className="w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-cyan-600 focus:ring-4 focus:ring-cyan-100"
          />
        </div>

        <div>
          <label
            htmlFor="task-description"
            className="mb-2 block text-sm font-semibold text-slate-700"
          >
            Description
          </label>
          <textarea
            id="task-description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Add the relevant details for this task"
            rows={1}
            className="min-h-[42px] w-full resize-y rounded-md border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-cyan-600 focus:ring-4 focus:ring-cyan-100"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitDisabled}
          className="inline-flex min-h-[42px] items-center justify-center rounded-md bg-cyan-700 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-200 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-600 disabled:shadow-none"
        >
          Add Task
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
