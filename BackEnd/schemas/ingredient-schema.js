const mongoose = require('mongoose')
const Schema = mongoose.Schema
const validate = require('mongoose-validator')


const AllergySchema = require('./allergy-schema')

// schema
const IngredientSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    calories: Number,
    fat: Number,
    carbs: Number,
    protein: Number,
    sodium: Number,
    cholesterol: Number,
    allergies: [AllergySchema]
})

module.exports = IngredientSchema
