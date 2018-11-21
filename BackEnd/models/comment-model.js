const mongoose = require('mongoose')
const Schema = mongoose.Schema
const validate = require('mongoose-validator')

const keys = require('../../.keys/keys')
const UserSchema = require('./user-model')
const RecipeSchema = require('./recipe-model')

// connect to mongodb
const DB = mongoose.createConnection(keys.DB.URI, () => {
    console.log('Connected to MongoDB: Comments')
})

// schema for comment model
const CommentSchema = new Schema({
    userID: {
        type: UserSchema,
        required: true,
    },
    recipeID: {
        // type: String,
        type: RecipeSchema,
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

// user model
const CommentsModel = DB.model('comment', CommentSchema)

// export user model
module.exports = CommentsModel
module.exports = CommentSchema
