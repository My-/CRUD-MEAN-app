const keys = require('../../.keys/keys')

const passport = require('passport')
const GithubStrategy = require('passport-github').Strategy
const GoogleStrategy = require('passport-google-oauth20').Strategy

const User = require('../models/user-models')


passport.use(
    new GithubStrategy({
        clientID: keys.GitHub.clientID,
        clientSecret: keys.GitHub.clientSecret,
        callbackURL: keys.GitHub.callbackURL
    }, (accessToken, refreshToken, profile, done) => {
        // accessToken - user token we receive from provider(github)
        // refreshToken - used then access token expires???
        // profile - user profile information we received from provider
        // done - is a done() wich should be caled then we done with information
        console.log(profile)
        new User({
            userName: profile.displayName,
            loginMethod: profile.provider,
            loginId: profile.id,
            avatar: profile.photos[0].value,
            profile: profile,
        }).save().then((newUser) => { console.log(`Created user: ${newUser}`)})
        // return done(null, profile)
    })
)

passport.use(
    new GoogleStrategy({
        clientID: keys.Google.clientID,
        clientSecret: keys.Google.clientSecret,
        callbackURL: keys.Google.callbackURL
    }, (accessToken, refreshToken, profile, done) => {
        console.log(profile)
        new User({
            userName: profile.displayName,
            loginMethod: profile.provider,
            loginId: profile.id,
            avatar: profile.photos[0].value,
            profile: profile,
        }).save()
            .then((newUser) => console.log(`Created user: ${newUser}`) )
        // return done(null, profile)
    })
)

passport.serializeUser(function(user, done) {
    // placeholder for custom user serialization
    // null is for errors
    done(null, user)
})

passport.deserializeUser(function(user, done) {
    // placeholder for custom user deserialization.
    // maybe you are going to get the user from mongo by id?
    // null is for errors
    done(null, user)
})
