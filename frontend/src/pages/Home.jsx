import { useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import TaskModal from '../components/TaskModal'
import { Outlet } from 'react-router-dom'
import './Home.css'

const API_URL = "https://project-management-backend-lkt3.onrender.com"

function Home() {
  const [showModal, setShowModal] = useState(false)

  const [tasks, setTasks] = useState([])
  const [projects, setProjects] = useState([])
  const [members, setMembers] = useState([])

  // ================= FETCH ALL DATA =================
  useEffect(() => {
    fetchTasks()
    fetchProjects()
    fetchMembers()
  }, [])

  async function fetchTasks() {
    try {
      const res = await fetch(`${API_URL}/tasks`)
      const data = await res.json()
      setTasks(data)
    } catch (err) {
      console.error('Error fetching tasks:', err)
    }
  }

  async function fetchProjects() {
    try {
      const res = await fetch(`${API_URL}/projects`)
      const data = await res.json()
      setProjects(data)
    } catch (err) {
      console.error('Error fetching projects:', err)
    }
  }

  async function fetchMembers() {
    try {
      const res = await fetch(`${API_URL}/members`)
      const data = await res.json()
      setMembers(data)
    } catch (err) {
      console.error('Error fetching members:', err)
    }
  }

  // ================= TASK FUNCTIONS =================

  async function addTask(task) {
    try {
      const res = await fetch(`${API_URL}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task)
      })

      const newTask = await res.json()
      setTasks(prev => [...prev, newTask])
    } catch (err) {
      console.error('Error adding task:', err)
    }
  }

  async function toggleTask(id) {
    try {
      const task = tasks.find(t => t._id === id)

      await fetch(`${API_URL}/tasks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !task.completed })
      })

      setTasks(prev =>
        prev.map(t =>
          t._id === id ? { ...t, completed: !t.completed } : t
        )
      )
    } catch (err) {
      console.error('Error toggling task:', err)
    }
  }

  // ✅ NEW: Generic update function (used for subtasks)
  async function updateTask(id, updatedData) {
    try {
      await fetch(`${API_URL}/tasks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData)
      })

      setTasks(prev =>
        prev.map(task =>
          task._id === id
            ? { ...task, ...updatedData }
            : task
        )
      )
    } catch (err) {
      console.error('Error updating task:', err)
    }
  }

  async function deleteTask(id) {
    try {
      await fetch(`${API_URL}/tasks/${id}`, {
        method: 'DELETE'
      })

      setTasks(prev => prev.filter(t => t._id !== id))
    } catch (err) {
      console.error('Error deleting task:', err)
    }
  }

  // ================= PROJECT FUNCTIONS =================

  async function addProject(project) {
    try {
      const res = await fetch(`${API_URL}/projects`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(project)
      })

      const newProject = await res.json()
      setProjects(prev => [...prev, newProject])
    } catch (err) {
      console.error('Error adding project:', err)
    }
  }

  async function deleteProject(id) {
    try {
      await fetch(`${API_URL}/projects/${id}`, {
        method: 'DELETE'
      })

      setProjects(prev => prev.filter(p => p._id !== id))
    } catch (err) {
      console.error('Error deleting project:', err)
    }
  }

  // ================= MEMBER FUNCTIONS =================

  async function addMember(member) {
    try {
      const res = await fetch(`${API_URL}/members`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(member)
      })

      const newMember = await res.json()
      setMembers(prev => [...prev, newMember])
    } catch (err) {
      console.error('Error adding member:', err)
    }
  }

  async function deleteMember(id) {
    try {
      await fetch(`${API_URL}/members/${id}`, {
        method: 'DELETE'
      })

      setMembers(prev => prev.filter(m => m._id !== id))
    } catch (err) {
      console.error('Error deleting member:', err)
    }
  }

  return (
    <div className="home">
      <Sidebar />

      <div className="main">
        <Navbar onCreateTask={() => setShowModal(true)} />

        <div className="content">
          <Outlet
            context={{
              tasks,
              projects,
              members,
              addTask,
              toggleTask,
              updateTask,   // ✅ important
              deleteTask,
              addProject,
              deleteProject,
              addMember,
              deleteMember
            }}
          />
        </div>
      </div>

      {showModal && (
        <TaskModal
          onClose={() => setShowModal(false)}
          onAddTask={addTask}
          members={members}
          projects={projects}
        />
      )}
    </div>
  )
}

export default Home