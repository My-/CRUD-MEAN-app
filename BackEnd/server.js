// 21:32

const express = require('express')
const app = express()
const port = 3000

// const passport = require('passport')
const passportSetup = require('./config/passport-setup')


// import routes from auth-routs.js file
const authRoutes = require('./routes/auth-routs')
// use routes from auth-routs.js file
app.use('/auth', authRoutes)

// import mongoose
const mongoose = require('mongoose')
const keys = require('../.keys/keys')

console.log(`DB URI: ${keys.usersDB.URI}`)


// connect to mongodb
mongoose.connect(keys.usersDB.URI, () => {
    console.log('Connected to MongoDB')
})


// // Express and Passport Session
// const session = require('express-session')
// app.use(session({secret: "-- ENTER CUSTOM SESSION SECRET --"}));
// app.use(passport.initialize());
// app.use(passport.session());

// we will call this to start the GitHub Login process
// app.get('/auth/github', passport.authenticate('github'));

// GitHub will call this URL
// app.get('/auth/github/callback', passport.authenticate('github', {failureRedirect: '/'}),
//     function(req, res) {
//     res.redirect('/');
// });


// main menu route
app.get('/', function(req, res) {
    let html = "<ul>\
    <li><a href='/auth/github'>GitHub</a></li>\
    <li><a href='/auth/google'>Google</a></li>\
    <li><a href='/auth/logout'>logout</a></li>\
  </ul>"

    // dump the user for debugging
    if( req.isAuthenticated() ){
        html += "<p>authenticated as user:</p>"
        html += "<pre>" + JSON.stringify(req.user, null, 4) + "</pre>";
    }

    res.send(html);


});


// app.get('/logout', function(req, res) {
//     console.log('logging out');
//     req.logout();
//     res.redirect('/');
// });


const server = app.listen(port, function() {
    console.log('Example app listening at http://%s:%s', server.address().address, server.address().port);
})

app.get('/hello', (req, res) => res.send('Hello World!'))


// app.get('/', function(req, res){
//     res.send("home")
// });


// app.listen(port, () => console.log(`Example app listening on port ${port}!`))
