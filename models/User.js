const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, unique: false },
  firstSurName: { type: String, required: true, trim: true, unique: false },
  secondSurName: { type: String, required: true, trim: true, unique: false },
  email: { type: String, required: true, trim: true, unique: true },
  password: { type: String, required: true, trim: true, unique: false },
  carnet: { type: String, required: true, trim: true, unique: true },
  state: { type: String, required: false, trim: true, unique: false },
  grade: { type: String, required: false, trim: true, unique: false },
  phone: { type: String, required: true, trim: true, unique: false },
  rol: { type: String, required: true, trim: true, unique: false },
  instrument: { type: String, required: false, trim: true, unique: false },
  avatar: { type: String },
  carnet: { type: String, required: true, trim: true, unique: true },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = User = mongoose.model('user', UserSchema);
