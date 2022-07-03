import { useState } from "react"
import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'

function App() {

  // Name of the state is tasks, function to update the state is setTasks
  // State is immutable
  // useState returns the current state value (tasks) and a function for update the state (setTasks)
  const [tasks, setTasks] = useState([
    {
      id: 1,
      text: 'Doctors Appointment',
      day: 'Jun 27th 2:30pm',
      reminder: true,
    },
    {
      id: 2,
      text: 'COMP2041 Class',
      day: 'Jul 1st 1:00pm',
      reminder: false,
    },
    {
      id: 3,
      text: 'CSESoc EngSoc SciSoc Pubcrawl Release',
      day: 'Jul 2nd 7:00pm',
      reminder: true,
    },

  ])

  const deleteTask = (id) => {
    // filter, an array method, takes in a function
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const toggleReminder = (id) => {
    // Calling a hook (useState) inside a function component (setTasks) adds some local state
    // to the component
    // If the task id in the current iteration is equal to the id passed in, ? = then
    // ... = property spread notation - Spread out enumerable properties in props as discrete properties
    // E.g. {...this.props} === a={this.props.a} b={this.props.b}
    // spread includes properties of children i.e. a
    // You need to use property spread notation when updating state since you can't change state directly
    // : = else, task stays the same
    setTasks(tasks.map((task) => task.id === id ? { ...task, reminder: !task.reminder } : task))
  }

  return (
    <div className="container">
      <Header title={'Task Tracker'} />
      <AddTask />
      {/* Take tasks and pass into the Tasks component as a prop
        If tasks is greater than 0 display Tasks component
        else display message
      */}
      {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask}
        onToggle={toggleReminder} />
        : 'No tasks currently added.'}
    </div>
  );
}

export default App;
