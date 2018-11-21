const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs');

const keys = require('../../.keys/keys')
const LoginMethods = require('../routes/loginMethods').LoginMethods
const RecipeSchema = require('./recipe-model')
const CommentSchema = require('./comment-model')

// connect to mongodb Users
const userDB = mongoose.createConnection(keys.DB.URI, () => {
    console.log('Connected to MongoDB: Users')
})

// schema for user model
const UserSchema = new Schema({
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
        default: null,
    },
    recipes: {
        like: [RecipeSchema],
        own: [RecipeSchema],
        saved: [RecipeSchema],
    },
    comments: [CommentSchema],
    profile: Object,
    created: { type: Date, default: Date.now },
})


UserSchema.statics.hashPassword = function hashPassword(password){
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    // Store hash in your password DB.
    return hash;
}

UserSchema.methods.isValid = function(hashedpassword){
    return bcrypt.compareSync(hashedpassword, this.password);
}

UserSchema.methods.verifyPassword = function(password){
    // Load hash from your password DB.
    const hash = this.password
    return bcrypt.compareSync(password, hash)
}

// user model
const UserModel = userDB.model('user', UserSchema)

// export user model
module.exports = UserModel
module.exports = UserSchema
