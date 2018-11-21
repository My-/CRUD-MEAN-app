const mongoose = require('mongoose')
const Schema = mongoose.Schema
const validate = require('mongoose-validator')

const keys = require('../../.keys/keys')

// connect to mongodb
const DB = mongoose.createConnection(keys.DB.URI, () => {
    console.log('Connected to MongoDB: Allergy')
})

// schema
const AllergySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    URI: String,
})


// model
const AllergyModel = DB.model('allergy', AllergySchema)

// export
module.exports = AllergyModel
module.exports = AllergySchema
