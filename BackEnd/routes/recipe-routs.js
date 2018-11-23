const passport = require('passport')
const router = require('express').Router()
const request = require('request');

const ExtractJwt = require('passport-jwt').ExtractJwt
const jwt = require('jsonwebtoken')

const keys = require('../../.keys/keys')
const RecipeModel = require('../models/recipe-model')
const IngredientModel = require('../models/ingredient-model')
const UserModel = require('../models/user-model')



// Create. add recipe
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

// Read. get recipe from DataBase by recipe id (parameter: recipeID)
router.get('/', (req, res) => {
    RecipeModel.findById(req.query.recipeID)
        .then(recipe => {
            if( !recipe ){ throw `Recipe do not exist (${req.query.recipeID})` }
            return recipe
        })
        .then(recipe => res.json(200, {recipe}))
        .catch(err => res.json(400, {err}))
})

// Update.
router.put('/', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    userRecipe({userID: req.user.id, recipeID: req.query.recipeID})
        .then(recipeID => updateRecipe({recipeID, body: req.body}))
        .then(it => res.status(200).json({res: it}))
        .catch(err => res.status(400).json({err}))

    /**
     * Updates recipe with given id with given body parameters
     * @param recipeID
     * @param body
     * @return {Query}
     */
    function updateRecipe({recipeID, body}){
        return RecipeModel.findByIdAndUpdate(
            recipeID,
            body,
            {safe: true, new : true})
    }

})

// Delete.
router.delete('/', passport.authenticate('jwt', {session: false}), (req, res, next) => {

    userRecipe({userID: req.user.id, recipeID: req.query.recipeID})
        .then(recipe => deleteRecipe({recipeID: recipe._id}))
        .then(deletedRecipe => deleteRecipeFromUser({userID: deletedRecipe.User, recipeID: deletedRecipe._id}))
        .then(recipe => res.status(200).json({message: 'Deleted! ', recipe}))
        .catch(err => res.status(400).json({err}))

    /**
     * Deletes recipe from DB
     * @param recipeID
     * @return {Query}
     */
    function deleteRecipe({recipeID}){
        return RecipeModel.findByIdAndRemove(recipeID)
    }

    /**
     * Delete recipe from users recipe collection
     * @param userID
     * @param recipeID
     * @return {Query}
     */
    function deleteRecipeFromUser({userID, recipeID}){
        // https://stackoverflow.com/questions/15641492/mongodb-remove-object-from-array
        return UserModel.findByIdAndUpdate(userID, {$pull: {recipes: recipeID}}, {safe: true, new : true, multi: true})
    }
})

/**
 * Verifies what recipe is belongs to user.
 * @param userID
 * @param recipeID
 * @return {Promise} - recipe with given id or error if not users recipe
 */
function userRecipe({userID, recipeID}){
    if( !recipeID ){ return Promise.reject('Missing recipe id parameter.')}

    return RecipeModel.findById(recipeID)
        .then( recipe => {
            if( !recipe ){ throw `Recipe with id ${recipeID} do not exist.` }
            return recipe
        })
        .then(recipe => {
            if( recipe.User === userID ){ throw 'User can update only his recipes.' }
            return recipe
        })
}

module.exports = router
