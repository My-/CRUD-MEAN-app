const mongoose = require('mongoose')
const Schema = mongoose.Schema

const keys = require('../../.keys/keys')
const CommentSchema = require('./comment-model')
const UserSchema = require('./user-model')
const IngredientSchema = require('./ingredient')

// connect to mongodb
const DB = mongoose.createConnection(keys.DB.URI, () => {
    console.log('Connected to MongoDB: Recipes')
})

// schema for user model
const RecipeSchema = new Schema({
    user: UserSchema,
    title: String,
    takesTime: Number,
    pictures: [String],
    ingredients: [IngredientSchema],
    recipe: {
        type: String,
        required: true,
    },
    comments: [CommentSchema],
    created: { type: Date, default: Date.now },
})

// user model
const RecipeModel = DB.model('recipe', RecipeSchema)

// export user model
module.exports = RecipeModel
module.exports = RecipeSchema
