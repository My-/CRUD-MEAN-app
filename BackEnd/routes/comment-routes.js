const router = require('express').Router()
const passport = require('passport')

const Comments = require('../models/comment-model')
const User = require('../models/user-model')
// require('../config/passport-setup')


// Create comment
router.post('/', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    // Create promise
    new Promise((resolve, reject) => {
        // check for any missing data
        let msg;
        if( !req.user._id ){ msg = 'userID' }
        if( !req.body.recipeID ){ msg = msg ? msg +', recipeID' : 'recipeID' }
        if( !req.body.text ){ msg = msg ? msg +', text' : 'text' }
        if( msg ){ reject(`Missing: ${msg} parameter.`)}  // if any data missing -> reject
        else{ resolve(
            new Comments({                      // else -> create new comment and resolve
                userID: req.user._id,
                recipeID: req.body.recipeID,
                text: req.body.text,
            })
        )}
    })
        .then(commentModel => commentModel.save())
        .then(newComment =>
                User.findByIdAndUpdate(
                        newComment.userID,
                        {$push: {"comments": {_id: newComment._id}}},    // push new comment id to users comment array
                        {safe: true, new : true},
                )
                    .then(updatedUser => { return {
                        userComments: updatedUser.comments,
                        newComment,
                    }})
        )
        .then(newComment => res.json(200, newComment))
        .catch(err => res.json({err}))
})

// Read (get) comment by it's id
router.get('/', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    new Promise((resolve, reject) => {
        if( !req.query.commentID ){ reject('Missing commentID parameter.') }
        else{ resolve( Comments.findById(req.query.commentID) )}
    })
        .then(val => res.status(200).json(val))
        .catch(err => res.status(400).json({err}))
})

// Update comment
router.put('/', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    new Promise((resolve, reject) => {
        if( !req.body.commentID ){ reject('Missing commentID parameter.')}
        else if( !req.user._id ){ reject('Missing user._id parameter.')}
        else{ resolve( User.findById(req.user._id, [`comments`]) )}         // find user and get his comments...
    })
        // .. in comments look for "updatable" comments id
        .then(user => user.comments.find(comment => comment._id === req.body.commentID))
        // use that id to find comment, and update it
        .then(comment => Comments.findByIdAndUpdate(comment._id, {text: req.body.text}, {safe: true, new : true}))
        .then(updatedComment => res.status(200).json(updatedComment))
        .catch(err => res.status(400).json({err}))
})

// delete comment
// TODO: fix delete comment in user.comments array
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
