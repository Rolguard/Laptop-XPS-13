import { useState } from 'react'
// Calling useState within a function adds some local state to it

// All AddTask components have a prop called onAdd (which is initially a json object in App.js)
// AddTask component also has text, day and reminder variables / current state values from useState
// These can be modified by calling its associated function to let you update the variable's current state

const AddTask = ({ onAdd }) => {
    const [text, setText] = useState('')
    const [day, setDay] = useState('')
    const [reminder, setReminder] = useState(false)

    const onSubmit = (e) => {
        // Function is called when the onSubmit event is triggered in the form
        // e.preventDefault, prevents the submit event to submit to a page
        e.preventDefault()

        // Input validation for text variable, will return false if empty I'm assuming
        if (!text) {
            alert('Please add a task.')
            return
        }
        // If text is not empty, set value of onAdd prop which initially held task (json object) i.e. {text, day, reminder}
        // onAdd is not directly called because we want to perform input validation and restore default values
        onAdd({ text, day, reminder })

        // Reset state to default values after adding task
        setText('')
        setDay('')
        setReminder(false)
    }

    return (
        <form className='add-form' onSubmit={onSubmit}>
            <div className='form-control'>
                <label>Task</label>
                {/* Setting value to the variable given from useState enables us to
                dynamically change the value after a call to its update state function */}
                <input type='text' placeholder='Add Task' value={text}
                    onChange={(e) => setText(e.target.value)}
                />
            </div>
            <div className='form-control'>
                <label>Day & Time</label>
                <input type='text' placeholder='Add Day & Time' value={day}
                    onChange={(e) => setDay(e.target.value)} />
            </div>
            <div className='form-control form-control-check'>
                <label>Set Reminder</label>
                <input type='checkbox' value={reminder}
                    checked={reminder}
                    // e.currentTarget.checked returns true or false depending on whether it is checked or not
                    onChange={(e) => setReminder(e.currentTarget.checked)} />
            </div>

            <input type="submit" value='Save Task' className='btn btn-block' />

        </form>
    )
}
export default AddTask