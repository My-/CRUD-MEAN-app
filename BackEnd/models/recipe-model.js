import { Ingredient } from "../../src/app/model/ingredient"

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const keys = require('../../.keys/keys')

// connect to mongodb Recipes
const recipeDB = mongoose.createConnection(keys.usersDB.URI, () => {
    console.log('Connected to MongoDB: Recipes')
})

// schema for user model
const recipeSchema = new Schema({
    userID: Number,
    title: String,
    allergies: [{allergy: String}],
    takesTime: Number,
    pictures: [{uri: String}],
    ingredients: [{ingredient: Object}],    // Ingredient object
    recipe: String,
    created: { type: Date, default: Date.now },
})

// user model
const Recipe = recipeDB.model('recipe', recipeSchema)

// export user model
module.exports = Recipe
