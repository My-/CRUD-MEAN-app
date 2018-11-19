const express = require('express');
const router = require('express').Router()
const jwt = require('jsonwebtoken')
const User = require('../models/user-model')
const keys = require('../../.keys/keys')

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
