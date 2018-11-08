const mongoose = require('mongoose')
const Schema = mongoose.Schema

// schema for user model
const userSchema = new Schema({
    userName: String,
    loginMethod: String,
    loginId: Number,
    avatar: String,
    profile: Object,
    created: { type: Date, default: Date.now },
})

// user model
const User = mongoose.model('user', userSchema)

// export user model
module.exports = User
