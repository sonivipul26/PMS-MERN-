const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  completed: { type: Boolean, default: false },
  priority: String,
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project'
  }
})

module.exports = mongoose.model('Task', taskSchema)