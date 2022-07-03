import { FaTimes } from 'react-icons/fa'

const Task = ({ task, onDelete, onToggle }) => {

    return (
        // State gets passed down, actions get passed up
        // If task.reminder is true, then className includes reminder else no reminder class
        // `` backtick notation enables template literals like python f strings
        // Enables inserting of variables and any javascript expression with ${} 
        <div className={`task ${task.reminder ? 'reminder' : ''}`} onDoubleClick={() => onToggle(task.id)}>
            <h3>{task.text} <FaTimes
                style={{ color: 'red', cursor: 'pointer' }}
                // Call a function then call onDelete and pass in a task.id
                onClick={() => onDelete(task.id)}
            />
            </h3>
            <p>{task.day}</p>
        </div>
    )
}
export default Task