const router = require('express').Router()
const request = require('request');

const ExtractJwt = require('passport-jwt').ExtractJwt
const jwt = require('jsonwebtoken')

const keys = require('../../.keys/keys')
const RecipeModel = require('../models/recipe-model')
const IngredientModel = require('../models/ingredient-model')
const UserModel = require('../models/user-model')



// add recipe route
router.post('/', (req, res) => {
    /**
     * 1. Validate JWT
     *      true  -> set userID to id from JWT users id
     *      false -> set userID to null
     * 2. Create recipe from request body with validated userID
     * 3. Save to DB
     * 4. Send back response.
     */
    Promise.resolve(req)
        // validate JWT
        .then(data => ExtractJwt.fromAuthHeaderAsBearerToken()(data))
        .then(jwtToken => jwt.verify(jwtToken, keys.JWT.secret))
        .then(tokenData => tokenData.payload.id)
        .catch(() =>  null )
        // userID === null  -> anonymous user
        // userID !== null  -> verified user
        .then(userID => createRecipe({userID, recipe: req.body}))
        .then(recipe => recipe.save())
        .then(newRecipe => userAddRecipe({recipe: newRecipe}))
        .then(user => res.status(200).json(user))
        .catch(err => res.status(400).json({err}))


    /**
     * Creates recipe from request
     * @param userID - id of the user who creates recipe
     * @param recipe - recipe data
     * @return new RecipeModel
     */
    function createRecipe({userID, recipe}) {
        console.log('creating recipe')
        return new RecipeModel({
            User: userID,
            title: recipe.title,
            allergies: recipe.allergies,
            takesTime: recipe.takesTime,
            pictures: recipe.pictures,
            ingredients: recipe.ingredients,    // Ingredient object
            instructions: recipe.instructions,
        })
    }

    /**
     * Adds created recipe ref ID to users recipe array
     * @param recipe
     * @return {*}
     */
    function userAddRecipe({recipe}){
        console.log('adding to user')
        if( !recipe.User ){
            console.log('anonymous recipe')
            return new Promise(resolve => resolve({userName: 'Anonymous', recipe:[recipe._id]}))
        }

        return UserModel.findByIdAndUpdate(
            recipe.User,
            {$push: {recipes: recipe._id}},
            {safe: true, new : true},
        )
            .then(user => {console.log(`Recipe recorded. ${user.userName} recipes: ${user.recipes} `); return user})
    }

})

// get recipe from DataBase by recipe id (parameter: recipeID)
router.get('/', (req, res) => {
    Recipe.findById(req.query.recipeID)
        .then(recipe => res.json(200, {recipe}))
        .catch(err => res.json(400, {err}))
})

module.exports = router
