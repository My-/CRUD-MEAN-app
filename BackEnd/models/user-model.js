const mongoose = require('mongoose')
const Schema = mongoose.Schema
const keys = require('../../.keys/keys')

// connect to mongodb Users
const userDB = mongoose.createConnection(keys.usersDB.URI, () => {
    console.log('Connected to MongoDB: Users')
})

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
const User = userDB.model('user', userSchema)

// export user model
module.exports = User
