import { useOutletContext, useNavigate } from 'react-router-dom'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts'
import './Dashboard.css'

function Dashboard() {
  const { tasks, projects } = useOutletContext()
  const navigate = useNavigate()

  // ===== TASK STATS =====
  const totalTasks = tasks.length
  const completedTasks = tasks.filter(t => t.completed).length
  const pendingTasks = tasks.filter(t => !t.completed).length

  const completionRate =
    totalTasks === 0
      ? 0
      : Math.round((completedTasks / totalTasks) * 100)

  // ===== PROJECT STATS =====
  const totalProjects = projects.length
  const activeProjects = projects.filter(p => p.status === 'Active').length
  const completedProjects = projects.filter(p => p.status === 'Completed').length
  const onHoldProjects = projects.filter(p => p.status === 'On Hold').length

  // ===== CHART DATA =====
  const chartData = [
    { name: 'Completed', value: completedTasks },
    { name: 'Pending', value: pendingTasks }
  ]

  return (
    <div className="dashboard">
      <h2>Dashboard Overview</h2>

      {/* ================= TASK STATISTICS ================= */}
      <h3 className="section-title">Task Statistics</h3>

      <div className="stats-grid">
        <div
          className="stat-card clickable"
          onClick={() => navigate('/dashboard/tasks?status=all')}
        >
          <h3>{totalTasks}</h3>
          <p>Total Tasks</p>
        </div>

        <div
          className="stat-card completed clickable"
          onClick={() => navigate('/dashboard/tasks?status=completed')}
        >
          <h3>{completedTasks}</h3>
          <p>Completed</p>
        </div>

        <div
          className="stat-card pending clickable"
          onClick={() => navigate('/dashboard/tasks?status=pending')}
        >
          <h3>{pendingTasks}</h3>
          <p>Pending</p>
        </div>

        <div
          className="stat-card rate clickable"
          onClick={() => navigate('/dashboard/tasks')}
        >
          <h3>{completionRate}%</h3>
          <p>Completion Rate</p>
        </div>
      </div>

      {/* ================= PROJECT STATISTICS ================= */}
      <h3 className="section-title">Project Statistics</h3>

      <div className="stats-grid">
        <div
          className="stat-card clickable"
          onClick={() => navigate('/dashboard/projects?status=all')}
        >
          <h3>{totalProjects}</h3>
          <p>Total Projects</p>
        </div>

        <div
          className="stat-card active clickable"
          onClick={() => navigate('/dashboard/projects?status=Active')}
        >
          <h3>{activeProjects}</h3>
          <p>Active</p>
        </div>

        <div
          className="stat-card completed clickable"
          onClick={() => navigate('/dashboard/projects?status=Completed')}
        >
          <h3>{completedProjects}</h3>
          <p>Completed</p>
        </div>

        <div
          className="stat-card pending clickable"
          onClick={() => navigate('/dashboard/projects?status=On Hold')}
        >
          <h3>{onHoldProjects}</h3>
          <p>On Hold</p>
        </div>
      </div>

      {/* ================= PROJECT PROGRESS ================= */}
      <h3 className="section-title">Project Progress</h3>

      <div className="project-progress-container">
        {projects.length === 0 ? (
          <p>No projects available.</p>
        ) : (
          projects.map(project => {
            const projectTasks = tasks.filter(
              t => t.projectId == project.id
            )

            const completed = projectTasks.filter(
              t => t.completed
            ).length

            const progress =
              projectTasks.length === 0
                ? 0
                : Math.round(
                    (completed / projectTasks.length) * 100
                  )

            return (
              <div key={project.id} className="project-progress-card">
                <div className="project-header">
                  <span>{project.name}</span>
                  <span>{progress}%</span>
                </div>

                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>

                <small>
                  {completed} / {projectTasks.length} tasks completed
                </small>
              </div>
            )
          })
        )}
      </div>

      {/* ================= TASK STATUS CHART ================= */}
      <div className="chart-container">
        <h3>Task Status Chart</h3>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#2563eb" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default Dashboard