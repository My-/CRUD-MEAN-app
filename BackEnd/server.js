// 21:32

const express = require('express')
const app = express()
const port = 3000

const passport = require('passport')
const GithubStrategy = require('passport-github').Strategy

const keys = require('../keys/keys')


passport.use(new GithubStrategy({
    clientID: keys.GitHub.clientID,
    clientSecret: keys.GitHub.clientSecret,
    callbackURL: keys.GitHub.callbackURL
}, function(accessToken, refreshToken, profile, done) {
    return done(null, profile);
}))


// Express and Passport Session
const session = require('express-session')
app.use(session({secret: "-- ENTER CUSTOM SESSION SECRET --"}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
    // placeholder for custom user serialization
    // null is for errors
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    // placeholder for custom user deserialization.
    // maybe you are going to get the user from mongo by id?
    // null is for errors
    done(null, user);
});

// we will call this to start the GitHub Login process
app.get('/auth/github', passport.authenticate('github'));

// GitHub will call this URL
app.get('/auth/github/callback', passport.authenticate('github', {failureRedirect: '/'}),
    function(req, res) {
    res.redirect('/');
});


// main menu route
app.get('/', function(req, res) {
    let html = "<ul>\
    <li><a href='/auth/github'>GitHub</a></li>\
    <li><a href='/logout'>logout</a></li>\
  </ul>"

    // dump the user for debugging
    if( req.isAuthenticated() ){
        html += "<p>authenticated as user:</p>"
        html += "<pre>" + JSON.stringify(req.user, null, 4) + "</pre>";
    }

    res.send(html);


});


app.get('/logout', function(req, res) {
    console.log('logging out');
    req.logout();
    res.redirect('/');
});


const server = app.listen(port, function() {
    console.log('Example app listening at http://%s:%s', server.address().address, server.address().port);
})

app.get('/hello', (req, res) => res.send('Hello World!'))


// app.get('/', function(req, res){
//     res.send("home")
// });


// app.listen(port, () => console.log(`Example app listening on port ${port}!`))
