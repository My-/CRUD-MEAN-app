const express = require('express');
const router = require('express').Router()
const passport = require('passport')
const jwt = require('jsonwebtoken')

const UserModel = require('../models/user-model')
const keys = require('../../.keys/keys')
require('../config/passport-setup')


// get user comments
router.get('/comments', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    UserModel.findById(req.user.id, ['comments'])
        .populate('comments')
        .then(user => {
            if( !user ){
                throw 'Fatal Error! Here is no user with your token'
            }
            return user
        })
        .then(user => user.comments)
        .then(val => res.status(200).json(val))
        .catch(err => res.status(400).json({err}))
})

// get user recipes
router.get('/recipes', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    // Find user using JWT data
    UserModel.findById(req.user.id)
        .populate('recipes')    // populate recipes (document instead of reference)
        .then(user => {
            if( !user ){
                throw 'Fatal Error! Here is no user with your token'
            }
            return user
        })
        .then(val => res.status(201).json(val.recipes))
        .catch(err => res.status(400).json({err}))
})

// get user details
router.get('/', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    console.log('GET: /user')
    console.log(req.user)
    UserModel.findById(req.user._id)
        .then(user => {
            if( !user ){
                throw 'Fatal Error! Here is no user with your token'
            }
            return user
        })
        .then(user => res.status(201).json(user))
        .catch(err => res.status(400).json({err}))
})

// get user by his id (no auth)
router.get('/user', (req, res) => {
    console.log(`GET: /user/user?userID=${req.query.userID}`)

    UserModel.findById(req.query.userID)
        .populate(['comments', 'recipes'])
        .then(user => {
            if( !user ){
                throw 'Fatal Error! Here is no user with your token'
            }
            return user
        })
        .then(user => res.status(201).json(user))
        .catch(err => res.status(400).json({err}))
})

// update user details JWT protected
router.put('/', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    console.log('user put got:')
    console.log(req.body)
    const resObj = {}   // response object
    // update user and build response object
    UserModel.findByIdAndUpdate(req.user.id, req.body,)// {safe: true, new : true})
        // write before update user to response object
        .then(user => {
            resObj.message = 'Update OK!'
            resObj.before = user
        })
        // If was some error write to response obj
        .catch(err => resObj.errBeffore = err)
        // write after update user to response object
        .then(() =>
            UserModel.findById(req.user.id)
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
    UserModel.findByIdAndRemove(req.user._id)
        .then(user => res.json({message: 'Deleted! ', user}))
        .catch(err => console.log(err))
})

// Create new user
router.post('/', (req, res, next) => {

    new Promise((resolve, reject) => {
        if( !req.body.userName ){ reject('body.userName is required.') }
        else if( !req.body.password ){ reject('body.password is required.') }
        else{
            UserModel.findOne({ userName: req.body.userName })
                .then(userExist => {
                    if( userExist ){
                        reject({message: `User: ${req.body.userName} already exist!`})
                    }
                    else{ resolve() }
                })
        }
    })
        // create user
        .then(() => new UserModel({
            userName: req.body.userName,
            password: UserModel.hashPassword(req.body.password),
            gender: req.body.gender,
            avatar: req.body.avatar,
        }))
        // Save user to DB
        .then(newUser => newUser.save())
        // send response
        .then(savedUser => res.status(201).json(savedUser))
        .catch(err => res.status(400).json({err}))
})


module.exports = router
