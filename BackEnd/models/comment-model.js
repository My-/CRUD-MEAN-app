const mongoose = require('mongoose')
const Schema = mongoose.Schema
const validate = require('mongoose-validator')

const keys = require('../../.keys/keys')

// connect to mongodb
const DB = mongoose.createConnection(keys.usersDB.URI, () => {
    console.log('Connected to MongoDB: Comments')
})

// schema for comment model
const commentSchema = new Schema({
    userID: {
        type: String,
        required: true,
    },
    recipeID: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
        validate: validate({
            validator: 'isLength',
            arguments: [10, 1000],
            message: 'Name should be between {ARGS[0]} and {ARGS[1]} characters',
        })
    },
    responds: [{commentID: String}],
    created: { type: Date, default: Date.now },
    edited: { type: Date },
})

// user model
const Comments = DB.model('user', commentSchema)

// export user model
module.exports = Comments
