const mongoose = require('mongoose');

const movieModel = require('../models/movie');
const user = require('../models/user');
const userModel = require('../models/user');

// var mm = [
//     {
//         id: 0,
//         title: "Movie #1",
//         release: 2000,
//         genre:"action",
//     },
//     {
//         id: 1,
//         title: "Movie #2",
//         genre:"romantic",
//         release: 2020,
//     },

// ];

exports.getHome = async (req,res,next)=>{
    console.log("Get Home");
    console.log("ALL Users:\n")
    const allUsers = await userModel.find({})
    console.log(allUsers)

    res.render("home",{titlePage: "Home"});
};
//-----------------------//
exports.getSignup = async (req,res,next)=>{
    console.log("Get Sign Up");
    const userss = await userModel.find({})

    res.render("signUp",{titlePage: "Users", userss});
};
exports.postSignup = async (req,res,next)=>{
    const newUser = new userModel(req.body)
    const exists = await userModel.find({username:{$exists: true}})
    // let exists = await userModel.exists({username: newUser.username})

    if(exists){
        console.log("Exists")
        // res.render("userSignedUpBefore",{titlePage: "The user Signed Up Before", userss});
    }
    else{
        console.log("New user signed up")
        await newUser.save()
        // res.render("login",{titlePage: "Sign In", userss});
    }

    console.log("ALL Users:\n")
    const allUsers = await userModel.find({})
    console.log(allUsers)
    
};
//---------//
exports.getLogin = async (req,res,next)=>{
    console.log("Get Log In");
    const userss = await userModel.find({})

    res.render("login",{titlePage: "Log In", userss});
};
exports.postLogin = async (req,res,next)=>{
    console.log("POST Log In");
    const loginUser = new userModel(req.body)
    let exists = await userModel.exists({username: loginUser.username})

    if(exists){
        let checkPass = await userModel.exists({password: loginUser.password})
        if(checkPass){
            const moviess = await movieModel.find({})
            res.render("movies",{titlePage: "Movies", moviess});
        }
        else{
            console.log("Wrong Password")
            res.render("wrongPassword",{titlePage: "Wrong Password"});

        }
    }
    else{
        console.log("User Undefined")
        res.render("userUndefined",{titlePage: "User Undefined"});
    }
};

exports.getMovies = async (req,res,next)=>{
    console.log("Get Movies");
    const moviess = await movieModel.find({})
    console.log(moviess)
    console.log('All Movies Here')

    res.render("movies",{titlePage: "Movies", moviess});
};

exports.getSingleMovie = async (req,res,next)=>{
    console.log("Get single movie");
    const theID = req.params.id;
    const movie = await movieModel.findById(theID)
    
    console.log(`theID: ${theID}\nthe movies:\n${movie}`);
    res.render("singleMovie",{titlePage: "Single Movie",movie});
};

exports.editSingleMovie = async (req,res,next)=>{
    console.log("Get Edit single movie");
    const theID = req.params.id;
    const movie = await movieModel.findById(theID)
    
    console.log(`theID: ${theID}\nthe movies:\n${movie}`);
    res.render("editMovie",{titlePage: "Edit Movie", movie});
};

exports.putSingleMovie = async (req,res,next)=>{
    console.log('PUT!!!!!!!');
    const theID = req.params.id;
    const movie = await movieModel.findByIdAndUpdate(theID, req.body, {runValidators: true , new: true});
    res.redirect(`/movies/${movie._id}`)
};


exports.deleteSingleMovie = async (req,res,next)=>{
    console.log('DELETE!!!!!!!');
    const theID = req.params.id;
    const movie = await movieModel.findByIdAndDelete(theID);
    res.redirect(`/movies`)
};

exports.getNewMovies = async (req,res,next)=>{
    // const lastIndex = mm.length;
    const moviess = await movieModel.find({})
    console.log("Get Add new movies");
    res.render("newMovies",{titlePage: "Add new movies", moviess});
    
    // console.log(`Last Index ${lastIndex}`);
};

exports.postNewMovies = async (req,res,next) =>{
    console.log("Post Add new movies"+req.body);

    const newMovie = new movieModel(req.body)
    await newMovie.save()
    
    res.redirect("/movies");
};

exports.getAllOtherReq = (req,res,next) =>{
    console.log("Get All other requests");
    res.render("other",{titlePage: "404"});
};