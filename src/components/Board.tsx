import Column from "./Column";
import type { ColumnType, Task } from "../types/task";

interface BoardProps {
  tasks: Task[];
  onDeleteTask: (id: string) => void;
  onMoveTask: (id: string, status: ColumnType) => void;
}

const columns: Array<{ title: string; status: ColumnType }> = [
  { title: "To Do", status: "todo" },
  { title: "In Progress", status: "inprogress" },
  { title: "Done", status: "done" },
];

const Board = ({ tasks, onDeleteTask, onMoveTask }: BoardProps) => {
  return (
    <div className="grid gap-5 lg:grid-cols-3">
      {columns.map((column) => (
        <Column
          key={column.status}
          title={column.title}
          status={column.status}
          tasks={tasks.filter((task) => task.status === column.status)}
          onDeleteTask={onDeleteTask}
          onMoveTask={onMoveTask}
        />
      ))}
    </div>
  );
};

export default Board;
