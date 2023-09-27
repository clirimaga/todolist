import "./StatusBar.css";

export default function StatusBar({ tasks }) {

  function countItemsByCompletion(arrayOfObjects, completedValue) {
    let count = 0;

    for (let i = 0; i < arrayOfObjects.length; i++) {
      if (arrayOfObjects[i].completed === completedValue) {
        count++;
      }
    }

    return count;
  }

  return (
    <div className="statusBar">
      <span className="allTasks">All Tasks: {tasks.length}</span>
      <span className="incomplete">
        Incomplete: {countItemsByCompletion(tasks, false)}
      </span>
      <span className="complete">
        Complete: {countItemsByCompletion(tasks, true)}
      </span>
    </div>
  );
}
