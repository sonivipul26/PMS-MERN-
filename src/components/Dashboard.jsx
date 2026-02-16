import { useOutletContext } from 'react-router-dom'
import './Dashboard.css'

function Dashboard() {
  const { tasks } = useOutletContext()

  const total = tasks.length
  const completed = tasks.filter(task => task.completed).length
  const pending = tasks.filter(task => !task.completed).length
  const completionRate = total === 0 ? 0 : Math.round((completed / total) * 100)

  return (
    <div className="dashboard">
      <h2>Dashboard Overview</h2>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>{total}</h3>
          <p>Total Tasks</p>
        </div>

        <div className="stat-card completed">
          <h3>{completed}</h3>
          <p>Completed</p>
        </div>

        <div className="stat-card pending">
          <h3>{pending}</h3>
          <p>Pending</p>
        </div>

        <div className="stat-card rate">
          <h3>{completionRate}%</h3>
          <p>Completion Rate</p>
        </div>
      </div>
    </div>
  )
}

export default Dashboard