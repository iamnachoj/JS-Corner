//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');
const mongoose = require("mongoose");
const app = express();

//middleware
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/blogDB", {useNewUrlParser: true}); 
//mongoose.connect("mongodb+srv://Iamnachoj:" + process.env.MONGO_PASS + "@cluster0.slzvx.mongodb.net/blogDB", {useNewUrlParser: true}); 

//Mongoose postSchema
const postSchema = {
  title: String,
  content: String,
  date: Date
}
//Model
const Post = mongoose.model('Post', postSchema);

// homepage get route
app.get("/", function(req, res) {
  res.render("home")
});

// books get route
app.get("/challenges", function(req, res) {
  Post.find({}, function(err, result){
    res.render("challenges", {
      posts: result
    })
  })
});

// about get route
app.get("/about", function(req, res) {
  res.render("about", {});
});

// compose routes. Get and Post
app.get("/compose", function(req, res) {
  res.render("compose"); //render the compose form
});
app.post("/compose", function(req, res) {
  const post = new Post({ //stores a new Post on this constant. it takes the title and content from the form. 
    title: req.body.title,
    content: req.body.content,
    date: req.body.date
  })
  post.save();
  res.redirect("/");
});

// articles
app.get("/posts/:postId", function(req, res) {
  const requestedId = req.params.postId;
  
  Post.findOne({_id: requestedId}, function(err, result){
    res.render("post", {
      postTitle: result.title,
      postArticle: result.content,
      postDate: result.date.toDateString()
    });
  });
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port, console.log("port started at port " + port));