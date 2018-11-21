const mongoose = require('mongoose')
const Schema = mongoose.Schema
const validate = require('mongoose-validator')

const keys = require('../../.keys/keys')
const AllergySchema = require('./allergy')

// connect to mongodb
const DB = mongoose.createConnection(keys.DB.URI, () => {
    console.log('Connected to MongoDB: Ingredients')
})

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

// model
const IngredientModel = DB.model('ingredient', IngredientSchema)

// export
module.exports = IngredientModel
module.exports = IngredientSchema
