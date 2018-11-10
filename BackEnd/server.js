// 21:32

const express = require('express')
const app = express()

// body parser should be used before routes
app.use(express.urlencoded({ extended: false }));
app.use(express.json())

const cors = require('cors')
app.use(cors({
    origin:['http://localhost:4200','http://127.0.0.1:4200'],
    credentials:true
}))

// const passport = require('passport')
const passportSetup = require('./config/passport-setup')

  
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS')
    next();
});


// authenticate routes
const authRoutes = require('./routes/auth-routs')
app.use('/auth', authRoutes)

// recipe routes
const recipeRoutes = require('./routes/recipe-routs')
app.use('/recipe', recipeRoutes)




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

// express server listens for incoming traffic
const port = 3000
const server = app.listen(port, function() {
    console.log('Example app listening at http://%s:%s', server.address().address, server.address().port);
})

app.get('/hello', (req, res) => res.send('Hello World!'))


