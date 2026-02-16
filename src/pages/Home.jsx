import { useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import TaskModal from '../components/TaskModal'
import { Outlet } from 'react-router-dom'
import './Home.css'

function Home() {
  const [showModal, setShowModal] = useState(false)

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tasks')
    return saved ? JSON.parse(saved) : []
  })

  const [members, setMembers] = useState(() => {
    const saved = localStorage.getItem('members')
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  useEffect(() => {
    localStorage.setItem('members', JSON.stringify(members))
  }, [members])

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

  function addMember(member) {
    setMembers(prev => [...prev, member])
  }

  function deleteMember(id) {
    setMembers(prev => prev.filter(member => member.id !== id))
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
        />
      )}
    </div>
  )
}

export default Home