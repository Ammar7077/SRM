const express = require("express");
const mongoose = require('mongoose');
const methodOverride = require('method-override')
const movieModel = require('../models/movie');
const userModel = require('../models/user');

const moviesController = require("../controllers/movies"); // To get all the functions in Controller

const router = express.Router(); // To create GET/POST using Router

//--------------------//
const m = [
    {
        title:'Movie 1',
        release:1999,
        genre:'AAA'
    },
    {
        title:'Movie 2',
        release:1959,
        genre:'BBB'
    },
    {
        title:'Movie 3',
        release:1997,
        genre:'CCC'
    },
]


const u = [
    {
        username:'User 1',
        password:"1",
        age:1,
        favoriteGenre:"fg1"
    },
    {
        username:'User 2',
        password:"2",
        age:2,
        favoriteGenre:"fg2"
    },
]

// movieModel.insertMany(m)
// .then( m => {
//     console.log(m);
// })
// .catch( e => {
//     console.log(`Error:  ${e}`);
// })


// userModel.insertMany(u).then( u => {
//     console.log(u);
// })
// .catch( e => {
//     console.log(`Error:  ${e}`);
// })

// --------------------- //
router.get("/",moviesController.getHome);

router.get("/signup",moviesController.getSignup);
router.post("/signup",moviesController.postSignup);

router.get("/login",moviesController.getLogin);
router.post("/login",moviesController.postLogin);


router.get("/movies",moviesController.getMovies);

router.get("/movies/new",moviesController.getNewMovies);

// router.post("/movies/new",moviesController.postNewMovies);

router.post("/movies",moviesController.postNewMovies);


router.get("/movies/:id",moviesController.getSingleMovie);

router.get("/movies/:id/edit",moviesController.editSingleMovie);

router.put("/movies/:id",moviesController.putSingleMovie);

router.delete("/movies/:id",moviesController.deleteSingleMovie);

router.get("*",moviesController.getAllOtherReq);

module.exports = router;