const mongoose = require('mongoose');

const ProjectsSchema = new mongoose.Schema({
  name: { type: String },
  description: { type: String },
  status: {
    type: String,
    enum: ['Not Started', 'In Progress', 'Completed'],
  },
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
  },
});

module.exports = mongoose.model('Projects', ProjectsSchema);
