import { useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import './Teams.css'

function Teams() {
  const { members, addMember, deleteMember } = useOutletContext()

  const [name, setName] = useState('')
  const [role, setRole] = useState('')

  function handleAddMember() {
    if (!name || !role) return alert('All fields required')

    const newMember = {
      id: Date.now(),
      name,
      role
    }

    addMember(newMember)
    setName('')
    setRole('')
  }

  return (
    <div className="teams">
      <h2>Team Members</h2>

      <div className="add-member">
        <input
          type="text"
          placeholder="Member name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />

        <button onClick={handleAddMember}>Add Member</button>
      </div>

      {members.length === 0 ? (
        <p className="empty">No team members added.</p>
      ) : (
        <ul>
          {members.map(member => (
            <li key={member.id}>
              <div>
                <strong>{member.name}</strong> — {member.role}
              </div>
              <button onClick={() => deleteMember(member.id)}>❌</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Teams