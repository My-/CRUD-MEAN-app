const mongoose = require('mongoose')

const keys = require('../../.keys/keys')
const UserSchema = require('../schemas/user-schema')

// connect to mongodb Users
const userDB = mongoose.createConnection(keys.DB.URI, () => {
    console.log('Connected to MongoDB: Users')
})

// user model
const UserModel = userDB.model('user', UserSchema)

// export user model
module.exports = UserModel
