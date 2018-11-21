const mongoose = require('mongoose')

const keys = require('../../.keys/keys')
const IngredientSchema = require('../schemas/ingredient-schema')

// connect to mongodb
const DB = mongoose.createConnection(keys.DB.URI, () => {
    console.log('Connected to MongoDB: Ingredients')
})

// model
const IngredientModel = DB.model('ingredient', IngredientSchema)

// export
module.exports = IngredientModel
