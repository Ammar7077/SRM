const express = require("express");
const mongoose = require('mongoose');
const path = require("path");
const methodOverride = require('method-override')
const app = express();
// const movieModel = require("./models/movie"); // To use the Routes
const movieRoutes = require("./routes/movies"); // To use the Routes



app.set("view engine","ejs");
app.set("views",'views');

//---------//
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public")));
app.use(methodOverride('_method'))
app.use(movieRoutes); // Using the Routes
//---------//

mongoose.connect(
    "mongodb+srv://Ammar:0192852123@cluster0.kfwry.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then((result) => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
});

const db = mongoose.connection;

db.on('error',console.error.bind(console,'Error Connection'));
db.once('open',()=>{
    console.log("Connection Open");
});


