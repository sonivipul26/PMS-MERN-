const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())


let tasks = []
let projects = []
let members = []



app.get('/tasks', (req, res) => {
  res.json(tasks)
})

app.post('/tasks', (req, res) => {
  const newTask = { id: Date.now(), ...req.body }
  tasks.push(newTask)
  res.json(newTask)
})

app.delete('/tasks/:id', (req, res) => {
  tasks = tasks.filter(t => t.id != req.params.id)
  res.json({ message: 'Task deleted' })
})

app.put('/tasks/:id', (req, res) => {
  tasks = tasks.map(t =>
    t.id == req.params.id ? { ...t, ...req.body } : t
  )
  res.json({ message: 'Task updated' })
})



app.get('/projects', (req, res) => {
  res.json(projects)
})

app.post('/projects', (req, res) => {
  const newProject = { id: Date.now(), ...req.body }
  projects.push(newProject)
  res.json(newProject)
})

app.delete('/projects/:id', (req, res) => {
  projects = projects.filter(p => p.id != req.params.id)
  res.json({ message: 'Project deleted' })
})



app.get('/members', (req, res) => {
  res.json(members)
})

app.post('/members', (req, res) => {
  const newMember = { id: Date.now(), ...req.body }
  members.push(newMember)
  res.json(newMember)
})

app.delete('/members/:id', (req, res) => {
  members = members.filter(m => m.id != req.params.id)
  res.json({ message: 'Member deleted' })
})


app.listen(5000, () => {
  console.log('Server running on port 5000')
})