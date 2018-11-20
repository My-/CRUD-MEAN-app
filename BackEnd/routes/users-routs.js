const express = require('express');
const router = require('express').Router()
const passport = require('passport')
const jwt = require('jsonwebtoken')

const User = require('../models/user-model')
const keys = require('../../.keys/keys')
require('../config/passport-setup')


// get user owning, liked, saved comments
router.get('/comments', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    User.findById(req.user.id, [`comments`])
        .then(val => res.status(200).json(val))
        .catch(err => res.status(400).json({err}))
})

// get user owning, liked, saved recipes
router.get('/recipes', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    switch( req.query.type ){
        case 'saved':
        case 'own':
        case 'like': break;
        default:
            return res.status(404).json({message: `Not allowed parameter(s): [${req.query.type}]`})
    }

    User.findById(req.user.id, [`recipes.${req.query.type}`])
        .then(val => res.status(200).json(val.recipes))
        .catch(err => res.status(400).json({err}))
})

// update user details JWT protected
router.put('/', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    const resObj = {}   // response object
    // update user and build response object
    User.findByIdAndUpdate(req.user.id, req.body)
        // write before update user to response object
        .then(user => {
            resObj.message = 'Update OK!'
            resObj.before = user
        })
        // If was some error write to response obj
        .catch(err => resObj.errBeffore = err)
        // write after update user to response object
        .then(() =>
            User.findById(req.user.id)
                .then(user => resObj.after = user)
                .catch(err => console.log(err))
        )
        // write error to response object
        .catch(err => resObj.errAfter = err)
        // send response object as response
        .then(() => res.json(resObj))
})

// delete (kill) user. JWT protected.
router.delete('/', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    User.findByIdAndRemove(req.user._id)
        .then(user => res.json({message: 'Deleted! ', user}))
        .catch(err => console.log(err))
})

// register user route
router.post('/register', (req, res, next) => {
    console.log(req.body.userName)

    User.findOne({ userName: req.body.userName })
        // Check if user exist in db
        .then(val => {
            console.log('userCheck:')
            console.log(val)
            console.log(req.body)
            // User exist. https://stackoverflow.com/a/3826024/5322506
            if( val ){
                throw res.status(409).json({message: `User ("${req.body.userName}") already exist!`})
            }
        })
        // User name do NOT exist. Create one.
        .then(() => new User({
                userName: req.body.userName,
                password: User.hashPassword(req.body.password),
                gender: req.body.gender,
                avatar: req.body.avatar,
        }))
        // Save user to DB
        .then(newUser => newUser.save())
        // show saved user to console
        .then(newUser => { console.log(`Saved user: ${newUser}`); return newUser; } )
        // get users info for JWT token
        .then(savedUser => {return {
            id: savedUser._id,
            userName: savedUser.userName,
            gender: savedUser.gender,
            avatar: savedUser.avatar,
        }})
        // create JWT token
        .then(userInfo => {
            res.status(200).json({
                user: userInfo,
                JWT: jwt.sign({userInfo}, keys.JWT.secret, { expiresIn: '1h' }, ),
            })
        })
        .catch(err => console.log(err))
})


module.exports = router
