const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId
const validate = require('mongoose-validator')


const CommentSchema = require('./comment-schema')
const UserSchema = require('./user-schema')

// schema for user model
const RecipeSchema = new Schema({
    User: {
        type: ObjectId,
        ref: "UserSchema",
        default: null,
    },
    title: String,
    takesTime: Number,
    pictures: [String],
    ingredients: [{
        name: String,
        amount: Number
    }],
    instructions: {
        type: String,
        required: true,
    },
    comments: [{
        type: ObjectId,
        ref: "CommentSchema",
    }],
    created: { type: Date, default: Date.now },
})

module.exports = RecipeSchema
