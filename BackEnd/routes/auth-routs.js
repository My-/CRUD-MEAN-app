const router = require('express').Router()
const passport = require('passport')


// auth login
router.get('/login', (req, res) => {
    res.render('login') // redirect to login page
})

// auth logout
router.get('/logout', (req, res) => {
    // handle with passport
    console.log('Logging out...') // <------------- DEBUG
    return res.status(200).json({message:'Logout Success'})
    // res.send('Logging out')
})

/* GOOGLE */

// auth with google
router.get('/google', passport.authenticate('google', {
        scope: ['profile'] // what information take from login provider (eg. Google)
    })
)

// google call back URI
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    res.send("<pre>" + JSON.stringify(req.user, null, 4) + "</pre>")
})

/* GITHUB */

// auth with github
router.get('/github', passport.authenticate('github', {
    scope: ['user']
}), (req, res) => {
    // handle with passport
    return res.status(200).json({message:'Logging in with GinHub'})
})

// github call back URI
router.get('/github/callback', passport.authenticate('github'), (req, res) => {
    console.log(JSON.stringify(req.user, null, 4))
    // res.send("<pre>" + JSON.stringify(req.user, null, 4) + "</pre>")
})

module.exports = router
