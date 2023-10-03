import "./StatusBar.css";
import { useMemo } from "react";
export default function StatusBar({ tasks }) {
  const countItemsByCompletion = useMemo(() => {
    const completedCount = tasks.filter((task) => task.completed).length;
    const incompleteCount = tasks.filter((task) => !task.completed).length;

    return {
      completed: completedCount,
      incomplete: incompleteCount,
    };
  }, [tasks]);

  return (
    <div className="statusBar">
      <span className="allTasks">All Tasks: {tasks.length}</span>
      <span className="incomplete">
        Incomplete: {countItemsByCompletion.incomplete}
      </span>
      <span className="complete">
        Complete: {countItemsByCompletion.completed}
      </span>
    </div>
  );
}
