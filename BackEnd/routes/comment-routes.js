const router = require('express').Router()
const passport = require('passport')

const UserModel = require('../models/user-model')
const CommentModel = require('../models/comment-model')
const RecipeModel = require('../models/recipe-model')
// require('../config/passport-setup')


// Create comment
router.post('/', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    // Create promise
    new Promise((resolve, reject) => {
        // check for any missing parameters
        let msg; // error message string
        if( !req.user._id ){ msg = 'userID' }
        if( !req.body.recipeID && !req.body.commentID ){
            msg = msg ? msg +', recipeID or commentID' : 'parent'
        }
        if( !req.body.text ){ msg = msg ? msg +', text' : 'text' }
        if( msg ){ reject(`Missing parameter: ${msg}.`)}  // if any data missing -> reject
        else{
            let comment = {
                User: req.user._id,
                text: req.body.text,

            }
            if( req.body.recipeID ){
                comment.parentType = 'Recipe'
                comment.Parent = req.body.recipeID
            }
            else if( req.body.commentID ){
                comment.parentType = 'Comment'
                comment.Parent = req.body.commentID
            }

            resolve(new CommentModel(comment))
        }
    })
        .then(commentModel => commentModel.save())
        .then(comment => recordToParent({comment}))
        .then(comment => recordToOwner({comment}))
        .then(comment => res.status(400).json(comment))
        .catch(err => res.status(200).json({err}))

    /**
     * Records comment to Recipe or Comment document.
     * depends on 'parentType' parameter.
     * @param comment
     * @return {*}
     */
    function recordToParent({comment}){
        switch( comment.parentType ){
            case 'Recipe':  return recordToRecipe({comment})
            case 'Comment': return recordToComment({comment})
            default:
                return Promise.reject(`Unknown parentType: ${comment.parentType}.`)
        }
    }

    /**
     * Records comment id to Recipe document.
     * Comment on recipe.
     * @param comment
     * @return {Promise}
     */
    function recordToRecipe({comment}){
        return RecipeModel.findByIdAndUpdate(
                comment.Parent,
                {$push: {"comments": {_id: comment._id}}},
                {safe: true, new : true},).then(() => comment)
    }

    /**
     * Records comment id to comment document.
     * Response to comment.
     * @param comment
     * @return {Promise}
     */
    function recordToComment({comment}){
        return CommentModel.findByIdAndUpdate(
                comment.Parent,
                {$push: {"comments": {_id: comment._id}}},
                {safe: true, new : true},).then(() => comment)
    }

    /**
     * Records comment id to users document.
     * User can track his comments.
     * @param comment
     * @return {Promise}
     */
    function recordToOwner({comment}){
        return UserModel.findByIdAndUpdate(
                comment.User,
                {$push: {"comments": {_id: comment._id}}},
                {safe: true, new : true},).then(() => comment)
    }
})

// Read (get) comment by it's id
router.get('/', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    new Promise((resolve, reject) => {
        if( !req.query.commentID ){ reject('Missing commentID parameter.') }
        else{ resolve( CommentModel.findById(req.query.commentID) )}
    })
        .then(val => res.status(200).json(val))
        .catch(err => res.status(400).json({err}))
})

// Update comment
router.put('/', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    new Promise((resolve, reject) => {
        if( !req.query.commentID ){ reject('Missing commentID parameter.')}
        else if( !req.user._id ){ reject('Missing user._id parameter.')}
        else{ resolve( UserModel.findById(req.user._id, [`comments`]).then(it => it) )}         // find user and get his comments...
    })
        // .. in comments look for "updatable" comment id
        .then(user => user.comments.find(comment => comment._id+'' === req.query.commentID))
        // use that id to find comment, and update it
        .then(comment => {
            if( !comment ){
                throw `User: ${req.user}(${req.user._id}) don't have permission to edit comment: ${req.query.commentID}`
            }
            return comment
        })
        .then(comment => CommentModel.findByIdAndUpdate(comment._id, {text: req.body.text}, {safe: true, new : true}))
        .then(updatedComment => res.status(200).json(updatedComment))
        .catch(err => res.json({err}))
})

// delete comment
// TODO: fix delete comment
router.delete('/', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    User.findById(req.user._id, ['comments'])
        .then(user => {
            let updatedArr = user.comments.filter(comment => comment._id !== req.body.commentID)
            User.findByIdAndUpdate(req.user._id, ['comments'], updatedArr)
            return req.body.commentID
        })
        .then(it => {
            console.log(it)
            return it
        })
        .then(comment => Comments.findByIdAndRemove(comment))
        .then(comment => res.status(200).json({message: 'Deleted! ', comment}))
        .catch(err => res.status(400).json({err}))
})

module.exports = router
