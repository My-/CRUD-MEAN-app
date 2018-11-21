const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId
const validate = require('mongoose-validator')



const UserSchema = require('./user-schema')
const RecipeSchema = require('./recipe-schema')

// schema
const CommentSchema = new Schema({
    user: {
        type: ObjectId,
        ref: "UserSchema",
        required: true,
    },
    recipe: {
        type: ObjectId,
        ref: "RecipeSchema",
        required: true,
    },
    text: {
        type: String,
        required: true,
        validate: validate({
            validator: 'isLength',
            arguments: [5, 1000],
            message: 'Name should be between {ARGS[0]} and {ARGS[1]} characters',
        })
    },
    responds: [this],
    created: { type: Date, default: Date.now },
    edited: { type: Date },
})

module.exports = CommentSchema
