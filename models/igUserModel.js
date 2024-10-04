const mongoose = require('mongoose');

exports.igUserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  role: {
    type: String,
    required: [true, 'Player must have a role.'],
    default: 'villager',
  },
});

const IgUser = mongoose.model('IgUser', igUserSchema);

module.exports = IgUser;
