const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const userSchema = new Schema({
  email: String,
  identificacion: String,
  name: String,
  password: String,
  roll: String
}, 
{
  timestamps: true
})

module.exports = mongoose.model('User', userSchema);
