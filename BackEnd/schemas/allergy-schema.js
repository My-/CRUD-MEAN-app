const mongoose = require('mongoose')
const Schema = mongoose.Schema
const validate = require('mongoose-validator')


// schema
const AllergySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    URI: String,
})

module.exports = AllergySchema
