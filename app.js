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
  Post.find({}, function(err, result){
    res.render("home", {
      posts: result
    })
  })
});

// books get route
app.get("/books", function(req, res) {
  res.render("books", {});
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
      postDate: result.date
    });
  });
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
