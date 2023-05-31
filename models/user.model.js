const { default: mongoose } = require('mongoose');


const userSchema = new mongoose.Schema({
  email: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  CreateDate: {
    type :Date,
    default: Date.now
  }
})

module.exports = mongoose.model("user", userSchema);