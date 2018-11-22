const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId
const bcrypt = require('bcryptjs');
const validate = require('mongoose-validator')


const LoginMethods = require('../routes/loginMethods').LoginMethods
const RecipeSchema = require('./recipe-schema')
const CommentSchema = require('./comment-schema')


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
    recipes: [{
        type: ObjectId,
        // ref: "RecipeSchema",
        ref: "Recipe",
    }],
    comments: [{
        type: ObjectId,
        ref: "Comment",
    }],
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

mongoose.model('User', UserSchema)
// export
module.exports = UserSchema
