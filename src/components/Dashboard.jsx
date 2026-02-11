import './Dashboard.css'

function Dashboard() {
  return (
    <div className="dashboard">
      <h2>Dashboard Overview</h2>
      <p>Here is a quick summary of your work.</p>

      <ul>
        <li>Total Projects: <strong>8</strong></li>
        <li>Total Tasks: <strong>24</strong></li>
        <li>Completed Tasks: <strong>16</strong></li>
        <li>Pending Tasks: <strong>8</strong></li>
      </ul>
    </div>
  )
}

export default Dashboard
