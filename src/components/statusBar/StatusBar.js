import "./StatusBar.css";
import { useMemo } from 'react';
export default function StatusBar({ tasks }) {

  const countItemsByCompletion = useMemo(() => {
    function countItems(arrayOfObjects, completedValue) {
      let count = 0;
      for (let i = 0; i < arrayOfObjects.length; i++) {
        if (arrayOfObjects[i].completed === completedValue) {
          count++;
        }
      }
      return count;
    }

    return {
      completed: countItems(tasks, true),
      incomplete: countItems(tasks, false),
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
