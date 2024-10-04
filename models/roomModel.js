const mongoose = require('mongoose');
const { igUserSchema } = require('./igUserModel');

const roomSchema = new mongoose.Schema({
  users: {
    type: [igUserSchema],
  },
});
