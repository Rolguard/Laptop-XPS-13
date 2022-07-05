import { useState, useEffect } from "react"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import About from './components/About'

function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  // Name of the state is tasks, function to update the state is setTasks
  // State is immutable
  // useState returns the current state value (tasks) and a function for update the state (setTasks)
  // Using JSON server to store tasks data (mockup backend)
  const [tasks, setTasks] = useState([])

  // useEffect hook is used to handle side effects, often used when you want something to happen when the page loads

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }

    getTasks()
    // Added a dependency array, if you have a value where if it changes then this function is run
    // Then pass the value into the dependency array, otherwise leave empty
  }, [])

  // fetchTasks is put outside of the useEffect hook to be used elsewhere
  const fetchTasks = async () => {
    // asynchronous programming lets us start a potentially long task and still be responsive to other events
    // fetch() enables us to fetch resources asynchronously across a network
    // even while the task is running, rather than having to wait for it to be fully completed
    // await waits for a Promise object, the Promise object represents the completion of an asynchronous operation and its resulting value
    // 
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()

    return data
  }

  const fetchTask = async (id) => {
    // asynchronous programming lets us start a potentially long task and still be responsive to other events
    // fetch() enables us to fetch resources asynchronously across a network
    // even while the task is running, rather than having to wait for it to be fully completed
    // await waits for a Promise object, the Promise object represents the completion of an asynchronous operation and its resulting value
    // 
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()

    return data
  }

  const addTask = async (task) => {
    // Adding data to JSON server requires headers
    const res = await fetch("http://localhost:5000/tasks", {
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task) // Turn javascript object into a JSON string
    })

    // data returned is the new task that is added, must await the Promise
    const data = await res.json()

    setTasks([...tasks, data])

    // const id = Math.floor(Math.random() * 10000) + 1

    // // Create a newTask variable which is a JSON string with id, and the spread notation of task (copy of all the json object literals
    // // I.e. Copy of all the key-value pairs)
    // const newTask = { id, ...task }

    // // Copy current json object literals of tasks and also add the new task as
    // setTasks([...tasks, newTask])


  }


  const deleteTask = async (id) => {
    // No need to store in variable since we are not getting any data back from the fetch request
    // 2nd argument is object specifying a HTTP DELETE request
    // Objects can store properties the values of key-value pairs and methods (values are function definitions/expressions)
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE',
    })

    // filter, an array method, takes in a function
    // The arrow function is a compact version of traditional function expression e.g. myFunction(task) { return task.id !== id}
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const toggleReminder = async (id) => {
    const tasktoToggle = await fetchTask(id)
    const updTask = { ...tasktoToggle, reminder: !tasktoToggle.reminder }

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(updTask)
    })

    const data = await res.json()
    // Calling a hook (useState) inside a function component (setTasks) adds some local state
    // to the component
    // If the task id in the current iteration is equal to the id passed in, ? = then
    // ... = property spread notation - Spread out enumerable properties in props as discrete properties
    // E.g. {...this.props} === a={this.props.a} b={this.props.b}
    // spread includes properties of children i.e. a
    // You need to use property spread notation when updating state since you can't change state directly
    // : = else, task stays the same
    setTasks(tasks.map((task) => task.id === id ? { ...task, reminder: data.reminder } : task))
  }

  return (
    // Using react-router-dom enables us to use BrowserRouter and Route to enable different routes in our app
    // This means we can show different things based on the current route e.g. http://localhost:3000/about
    <Router>
      <div className="container">
        {/* () => function() (=> is the arrow function) passes the function to the prop onAdd */}
        <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask} />
        {/* Shorthand of saying if condition is True then AddTask, can use instead of ? , : since we don't need else */}
        <Routes>
          <Route path='/' exact element={
            <>
              {showAddTask && <AddTask onAdd={addTask} />}
              {/* Take tasks and pass into the Tasks component as a prop, prop=parameter/argument
              If tasks is greater than 0 display Tasks component
              else display message
            */}
              {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask}
                onToggle={toggleReminder} />
                : 'No tasks currently added.'}
            </>
          }
          />
          <Route path='/about' element={<About />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
