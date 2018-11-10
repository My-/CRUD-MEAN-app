const router = require('express').Router()
const Recipe = require('../models/recipe-model')


// app.use(express.urlencoded({ extended: false }));
// app.use(express.json())

// add recipe route
router.post('/save', (req, res) => {
    console.log("post successful");
    // console.log(req.headers)
    console.log(req.body)

    new Recipe({
        userID: req.body.userID,
        title: req.body.title,
        allergies: req.body.allergies,
        takesTime: req.body.takesTime,
        pictures: req.body.pictures,
        ingredients: req.body.ingredients,    // Ingredient object
        recipe: req.body.recipe,
    }).save().then(newRecipe => {
        console.log(`
        Created recipe: ${newRecipe}`)
        return res.status(200).json(newRecipe)
    })
})

module.exports = router
