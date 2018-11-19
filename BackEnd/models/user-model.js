const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs');

const keys = require('../../.keys/keys')
const LoginMethods = require('../routes/loginMethods').LoginMethods

// connect to mongodb Users
const userDB = mongoose.createConnection(keys.usersDB.URI, () => {
    console.log('Connected to MongoDB: Users')
})

// schema for user model
const userSchema = new Schema({
    userName: {
        type: String,
        unique: true,
        required: true
    },
    loginMethod: {
        type: String,
        required: () => !this.password,
        default: LoginMethods.LOCAL,
    },
    password: {
        type: String,
        required: () => this.loginMethod === LoginMethods.LOCAL,
    },
    avatar: String,
    gender: {
        type: String,
        default: 'other',
    },
    profile: Object,
    created: { type: Date, default: Date.now },
})

userSchema.statics.hashPassword = function hashPassword(password){
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    // Store hash in your password DB.
    return hash;
}

userSchema.methods.isValid = function(hashedpassword){
    return bcrypt.compareSync(hashedpassword, this.password);
}

userSchema.methods.verifyPassword = function(password){
    // Load hash from your password DB.
    const hash = this.password
    return bcrypt.compareSync(password, hash)
}

// user model
const User = userDB.model('user', userSchema)

// export user model
module.exports = User
