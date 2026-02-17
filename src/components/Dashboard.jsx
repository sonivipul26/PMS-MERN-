import { useOutletContext } from 'react-router-dom'
import './Dashboard.css'

function Dashboard() {
  const { tasks, projects } = useOutletContext()

  // Task stats
  const totalTasks = tasks.length
  const completedTasks = tasks.filter(t => t.completed).length
  const pendingTasks = tasks.filter(t => !t.completed).length
  const completionRate =
    totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100)

  // Project stats
  const totalProjects = projects.length
  const activeProjects = projects.filter(p => p.status === 'Active').length
  const completedProjects = projects.filter(p => p.status === 'Completed').length
  const onHoldProjects = projects.filter(p => p.status === 'On Hold').length

  return (
    <div className="dashboard">
      <h2>Dashboard Overview</h2>

      <h3>Task Statistics</h3>
      <div className="stats-grid">
        <div className="stat-card">
          <h3>{totalTasks}</h3>
          <p>Total Tasks</p>
        </div>

        <div className="stat-card completed">
          <h3>{completedTasks}</h3>
          <p>Completed</p>
        </div>

        <div className="stat-card pending">
          <h3>{pendingTasks}</h3>
          <p>Pending</p>
        </div>

        <div className="stat-card rate">
          <h3>{completionRate}%</h3>
          <p>Completion Rate</p>
        </div>
      </div>

      <h3 style={{ marginTop: '30px' }}>Project Statistics</h3>
      <div className="stats-grid">
        <div className="stat-card">
          <h3>{totalProjects}</h3>
          <p>Total Projects</p>
        </div>

        <div className="stat-card completed">
          <h3>{activeProjects}</h3>
          <p>Active</p>
        </div>

        <div className="stat-card rate">
          <h3>{completedProjects}</h3>
          <p>Completed</p>
        </div>

        <div className="stat-card pending">
          <h3>{onHoldProjects}</h3>
          <p>On Hold</p>
        </div>
      </div>
    </div>
  )
}

export default Dashboard