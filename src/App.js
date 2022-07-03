import { useState } from "react"
import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'

function App() {
  const [showAddTask, setShowAddTask] = useState(false)
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
  const addTask = (task) => {
    const id = Math.floor(Math.random() * 10000) + 1
    // Create a newTask variable which is a JSON string with id, and the spread notation of task (copy of all the json object literals
    // I.e. Copy of all the key-value pairs)
    const newTask = { id, ...task }
    // Copy current json object literals of tasks and also add the new task as
    setTasks([...tasks, newTask])
  }


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
      {/* () => function() (=> is the arrow function) passes the function to the prop onAdd */}
      <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask} />
      {/* Shorthand of saying if condition is True then AddTask, can use instead of ? , : since we don't need else */}
      {showAddTask && <AddTask onAdd={addTask} />}
      {/* Take tasks and pass into the Tasks component as a prop, prop=parameter/argument
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
