import { useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import TaskModal from '../components/TaskModal'
import { Outlet } from 'react-router-dom'
import './Home.css'

function Home() {
  const [showModal, setShowModal] = useState(false)

  const [tasks, setTasks] = useState([])
  const [projects, setProjects] = useState([])
  const [members, setMembers] = useState([])

  

  useEffect(() => {
    fetch('http://localhost:5000/tasks')
      .then(res => res.json())
      .then(data => setTasks(data))

    fetch('http://localhost:5000/projects')
      .then(res => res.json())
      .then(data => setProjects(data))

    fetch('http://localhost:5000/members')
      .then(res => res.json())
      .then(data => setMembers(data))
  }, [])

  

  function addTask(task) {
    fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task)
    })
      .then(res => res.json())
      .then(newTask => setTasks(prev => [...prev, newTask]))
  }

  function toggleTask(id) {
    const task = tasks.find(t => t.id === id)

    fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: !task.completed })
    }).then(() => {
      setTasks(prev =>
        prev.map(t =>
          t.id === id ? { ...t, completed: !t.completed } : t
        )
      )
    })
  }

  function deleteTask(id) {
    fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE'
    }).then(() => {
      setTasks(prev => prev.filter(t => t.id !== id))
    })
  }

 

  function addProject(project) {
    fetch('http://localhost:5000/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(project)
    })
      .then(res => res.json())
      .then(newProject =>
        setProjects(prev => [...prev, newProject])
      )
  }

  function deleteProject(id) {
    fetch(`http://localhost:5000/projects/${id}`, {
      method: 'DELETE'
    }).then(() => {
      setProjects(prev => prev.filter(p => p.id !== id))
    })
  }

  

  function addMember(member) {
    fetch('http://localhost:5000/members', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(member)
    })
      .then(res => res.json())
      .then(newMember =>
        setMembers(prev => [...prev, newMember])
      )
  }

  function deleteMember(id) {
    fetch(`http://localhost:5000/members/${id}`, {
      method: 'DELETE'
    }).then(() => {
      setMembers(prev => prev.filter(m => m.id !== id))
    })
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
              toggleTask,
              deleteTask,
              projects,
              addProject,
              deleteProject,
              members,
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