const mongoose = require('mongoose')

const keys = require('../../.keys/keys')
const RecipeSchema = require('../schemas/recipe-schema')

// connect to mongodb
const DB = mongoose.createConnection(keys.DB.URI, () => {
    console.log('Connected to MongoDB: Recipes')
})

// user model
const RecipeModel = DB.model('recipe', RecipeSchema)

// export user model
module.exports = RecipeModel
