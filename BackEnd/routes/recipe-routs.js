const router = require('express').Router()
const request = require('request');

const ExtractJwt = require('passport-jwt').ExtractJwt
const jwt = require('jsonwebtoken')

const keys = require('../../.keys/keys')
const Recipe = require('../models/recipe-model')



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
        .then(data => ExtractJwt.fromAuthHeaderAsBearerToken()(data))
        .then(jwtToken => jwt.verify(jwtToken, keys.JWT.secret))
        .then(tokenData => tokenData.payload.id)
        .catch(() =>  null )
        // userID === null  -> anonymous user
        // userID !== null  -> verified user
        .then(userID => createRecipe({userID, recipe: req.body}))
        .then(recipe => recipe.save())
        .then(newRecipe => res.json(200, newRecipe))
        .catch(err => res.json(400, {err}))


    /**
     * Creates recipe from request
     * @param userID - id of the user who creates recipe
     * @param recipe - recipe data
     */
    function createRecipe({userID, recipe}) {
        return new Recipe({
            userID,
            title: recipe.title,
            allergies: recipe.allergies,
            takesTime: recipe.takesTime,
            pictures: recipe.pictures,
            ingredients: recipe.ingredients,    // Ingredient object
            recipe: recipe.recipe,
        })
    }

})

// get recipe from DataBase by recipe id (parameter: recipeID)
router.get('/', (req, res) => {
    Recipe.findById(req.query.recipeID)
        .then(recipe => res.json(200, {recipe}))
        .catch(err => res.json(400, {err}))
})

module.exports = router
