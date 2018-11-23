const router = require('express').Router()
const passport = require('passport')
const jwt = require('jsonwebtoken')

const keys = require('../../.keys/keys')


// auth logout
router.get('/logout', (req, res) => {
    // handle with passport
    console.log('Logging out...') // <------------- DEBUG
    return res.status(200).json({message:'Logout Success'})
    // res.send('Logging out')
})

/* LOCAL */

// auth with local
router.post('/localLogin', (req, res, next) => {
    passport.authenticate('local', { failureRedirect: '/login', session: false }, (err, user, info) => {
        // error or no user (wrong password or not in DB)
        if (err || !user) {
            console.log(err)
            return res.status(400).json({
                message: info ? info.message : 'Login failed',
                user   : user,
            });
        }

        req.login(user, {session: false}, (err) => {
            if (err) { res.send(err) }
            // create payload (data) for JWT
            const payload = {
                id: user._id,
                userName: user.gender,
                gender: user.gender,
                loginMethod: user.loginMethod,
            }
            // create JWT which will expire in 1 hour..
            const token = jwt.sign({payload}, keys.JWT.secret, { expiresIn: '1h' });
            // ..send it as response.
            return res.status(200).json({user, token});
        });
    })
    (req, res)

})

/* GOOGLE */

// auth with google
router.get('/google', passport.authenticate('google', {
        scope: ['profile'] // what information take from login provider (eg. Google)
    })
)

// google call back URI
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    console.log(JSON.stringify(req.user, null, 4))
    // res.send("<pre>" + JSON.stringify(req.user, null, 4) + "</pre>")
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
