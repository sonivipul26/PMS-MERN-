import { useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import TaskModal from '../components/TaskModal'
import { Outlet } from 'react-router-dom'
import './Home.css'

function Home() {
  const [showModal, setShowModal] = useState(false)
  const [tasks, setTasks] = useState([])

  // Load tasks from localStorage
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || []
    setTasks(storedTasks)
  }, [])

  // Save tasks to localStorage
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  function addTask(task) {
    setTasks(prev => [...prev, task])
  }

  function toggleTask(id) {
    setTasks(prev =>
      prev.map(task =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    )
  }

  function deleteTask(id) {
    setTasks(prev => prev.filter(task => task.id !== id))
  }

  return (
    <div className="home">
      <Sidebar />

      <div className="main">
        <Navbar onCreateTask={() => setShowModal(true)} />

        <div className="content">
          <Outlet context={{ tasks, toggleTask, deleteTask }} />
        </div>
      </div>

      {showModal && (
        <TaskModal
          onClose={() => setShowModal(false)}
          onAddTask={addTask}
        />
      )}
    </div>
  )
}

export default Home
