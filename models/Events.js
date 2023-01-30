const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  location: { type: String, required: true, unique: false },
  date: { type: Date, required: false, unique: false },
  time: { type: String, required: true, unique: false },
  departure: { type: String, required: true, unique: false },
  arrival: { type: String, required: true, unique: false },
  description: { type: String, required: true, unique: false },
});

module.exports = Events = mongoose.model('events', EventSchema);
