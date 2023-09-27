import './CreateTask.css'
export default function CreateTask( {newTask,setNewTask,addTask}) {

  return (
    <div className='createTask'>
        <input type='text' placeholder='Create Some Tasks...' value={newTask} onChange={(e) => {setNewTask(e.target.value)}} />
        <button onClick={addTask}>+</button>
    </div>

  )
}
