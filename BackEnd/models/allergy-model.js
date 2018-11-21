const mongoose = require('mongoose')

const keys = require('../../.keys/keys')
const AllergySchema = require('../schemas/allergy-schema')

// connect to mongodb
const DB = mongoose.createConnection(keys.DB.URI, () => {
    console.log('Connected to MongoDB: Allergy')
})

// model
const AllergyModel = DB.model('allergy', AllergySchema)

// export
module.exports = AllergyModel
