const mongoose = require('mongoose');

const userSchema = mongoose.Schema({

  firstname:{
    type: String,
    required: true
  },
  lastname:{
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true,
    unique: true
  },
  password:{
    type: String,
    required: true,
    minlength: 8
  },
  usertype:{
    type: String,
    enum: ['guest', 'host'],
    required: true
  },
  favourites: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Home',
  }]  
});

module.exports = mongoose.model('User', userSchema);