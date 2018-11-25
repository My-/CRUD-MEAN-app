const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId
const validate = require('mongoose-validator')


const CommentSchema = require('./comment-schema')
const UserSchema = require('./user-schema')

// schema for user model
const RecipeSchema = new Schema({
    User: {
        type: ObjectId,
        ref: "UserSchema",
        default: null,
    },
    title: {
        type: String,
        required: true
    },
    takesTime: Number,
    pictures: [String],
    ingredients: [{
        name: String,
        amount: Number
    }],
    instructions: {
        type: String,
        required: true,
    },
    comments: [{
        type: ObjectId,
        ref: "Comment",
    }],
    created: { type: Date, default: Date.now },
})

// // https://stackoverflow.com/a/11905116/5322506
// RecipeSchema.pre('remove', function(next){
//     console.log(`Deleting from user ${this.User} instructions ${this._id}`)
//     // Remove all the assignment docs that reference the removed person.
//     this.model('User').update({_id: this.User}, {$pull: {recipes:  this._id }}, next);
// });

mongoose.model('Recipe', RecipeSchema)
module.exports = RecipeSchema
