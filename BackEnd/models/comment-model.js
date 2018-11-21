const mongoose = require('mongoose')

const keys = require('../../.keys/keys')
const  CommentSchema = require('../schemas/comment-schema')

// connect to mongodb
const DB = mongoose.createConnection(keys.DB.URI, () => {
    console.log('Connected to MongoDB: Comments')
})

// user model
const CommentsModel = DB.model('comment', CommentSchema)

// export user model
module.exports = CommentsModel
