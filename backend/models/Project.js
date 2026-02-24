const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({
  name: String,
  status: {
    type: String,
    enum: ['Active', 'Completed', 'On Hold'],
    default: 'Active'
  }
})

module.exports = mongoose.model('Project', projectSchema)