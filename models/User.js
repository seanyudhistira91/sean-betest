// models/User.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  userName: {
    type: String,
    required: true
  },
  accountNumber: {
   type: String,
   required: true
 },
 emailAddress: {
   type: String,
   required: true
 },
 identityNumber: {
   type: String,
   required: true
 }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
