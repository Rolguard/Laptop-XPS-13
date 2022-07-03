import Task from './Task'

const Tasks = ({ tasks, onDelete, onToggle }) => {

    return (
        // Without div tag, called empty fragment
        // Map outputs JSX
        // Loop through with map, outputting component Task with task as prop
        <>
            {tasks.map((task) => (<Task key={task.id} task={task}
                onDelete={onDelete} onToggle={onToggle} />))}
        </>
    )
}

export default Tasks