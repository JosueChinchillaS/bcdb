const mongoose = require('mongoose');

const InventorySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  condition: { type: String, required: true, unique: false },
  brand: { type: String, required: false, unique: false },
  model: { type: String, required: false, unique: false },
  numberId: { type: String, required: false, unique: false },
  serie: { type: String, required: true, unique: false },
});

module.exports = Inventory = mongoose.model('inventory', InventorySchema);
