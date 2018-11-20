const mongoose = require('mongoose')
const Schema = mongoose.Schema
const keys = require('../../.keys/keys')

// connect to mongodb Recipes
const recipeDB = mongoose.createConnection(keys.usersDB.URI, () => {
    console.log('Connected to MongoDB: Recipes')
})

// schema for user model
const recipeSchema = new Schema({
    userID: String,
    title: String,
    allergies: [{name: String, uri: String}],
    takesTime: Number,
    pictures: [String],
    ingredients: [{
        name: String,
        amount: Number
    }],    // Ingredient object
    recipe: {
        type: String,
        required: true,
    },
    comments: [{id: Number}],
    created: { type: Date, default: Date.now },
})

// user model
const Recipe = recipeDB.model('recipe', recipeSchema)

// export user model
module.exports = Recipe
