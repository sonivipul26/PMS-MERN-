import './Teams.css'

function Teams() {
  const members = [
    { id: 1, name: 'Amit', role: 'Frontend Developer' },
    { id: 2, name: 'Riya', role: 'UI/UX Designer' },
    { id: 3, name: 'Karan', role: 'Backend Developer' }
  ]

  return (
    <div className="teams">
      <h2>Team Members</h2>

      <ul>
        {members.map(member => (
          <li key={member.id}>
            <strong>{member.name}</strong> — {member.role}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Teams
