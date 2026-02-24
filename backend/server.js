require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const User = require('./models/User')
const Task = require('./models/Task')
const Project = require('./models/Project')
const Member = require('./models/Member') // ✅ NEW

const app = express()

app.use(cors())
app.use(express.json())

// ================= MONGODB CONNECTION =================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log('Mongo Error:', err))

// ================= AUTH ROUTES =================

// Register
app.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body

    const existing = await User.findOne({ email })
    if (existing)
      return res.status(400).json({ message: 'User exists' })

    const user = await User.create({ email, password })
    res.json(user)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

// Login
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email, password })
    if (!user)
      return res.status(401).json({ message: 'Invalid credentials' })

    res.json({
      token: `demo-token-${user._id}`,
      user
    })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

// ================= TASK ROUTES =================

// Get all tasks
app.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find()
    res.json(tasks)
  } catch (err) {
    res.status(500).json({ message: 'Error fetching tasks' })
  }
})

// Create task
app.post('/tasks', async (req, res) => {
  try {
    const task = await Task.create(req.body)
    res.json(task)
  } catch (err) {
    res.status(500).json({ message: 'Error creating task' })
  }
})

// Update task
app.put('/tasks/:id', async (req, res) => {
  try {
    await Task.findByIdAndUpdate(req.params.id, req.body)
    res.json({ message: 'Task updated' })
  } catch (err) {
    res.status(500).json({ message: 'Error updating task' })
  }
})

// Delete task
app.delete('/tasks/:id', async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id)
    res.json({ message: 'Task deleted' })
  } catch (err) {
    res.status(500).json({ message: 'Error deleting task' })
  }
})

// ================= PROJECT ROUTES =================

// Get all projects
app.get('/projects', async (req, res) => {
  try {
    const projects = await Project.find()
    res.json(projects)
  } catch (err) {
    res.status(500).json({ message: 'Error fetching projects' })
  }
})

// Create project
app.post('/projects', async (req, res) => {
  try {
    const project = await Project.create(req.body)
    res.json(project)
  } catch (err) {
    res.status(500).json({ message: 'Error creating project' })
  }
})

// Delete project
app.delete('/projects/:id', async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id)
    res.json({ message: 'Project deleted' })
  } catch (err) {
    res.status(500).json({ message: 'Error deleting project' })
  }
})

// ================= MEMBER ROUTES =================

// Get all members
app.get('/members', async (req, res) => {
  try {
    const members = await Member.find()
    res.json(members)
  } catch (err) {
    res.status(500).json({ message: 'Error fetching members' })
  }
})

// Create member
app.post('/members', async (req, res) => {
  try {
    const member = await Member.create(req.body)
    res.json(member)
  } catch (err) {
    res.status(500).json({ message: 'Error creating member' })
  }
})

// Delete member
app.delete('/members/:id', async (req, res) => {
  try {
    await Member.findByIdAndDelete(req.params.id)
    res.json({ message: 'Member deleted' })
  } catch (err) {
    res.status(500).json({ message: 'Error deleting member' })
  }
})

// ================= START SERVER =================

app.listen(process.env.PORT, () => {
  console.log(` Server running on port ${process.env.PORT}`)
})