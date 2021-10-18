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

const postSchema = {
  title: String,
  content: String
}

const Post = mongoose.model('Post', postSchema);

// homepage
app.get("/", function(req, res) {
  Post.find({}, function(err, result){
    res.render("home", {
      posts: result
    })
  })
});

// books
app.get("/books", function(req, res) {
  res.render("books", {});
});

// about
app.get("/about", function(req, res) {
  res.render("about", {});
});

// compose
app.get("/compose", function(req, res) {
  res.render("compose");
});
app.post("/compose", function(req, res) {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
  })
  post.save();
  res.redirect("/");
});

// articles
app.get("/posts/:postName", function(req, res) {
  const requestedTitle = _.lowerCase(req.params.postName);

  posts.forEach(function(post) {
    const storedTitle = _.lowerCase(post.title);

    if (requestedTitle === storedTitle) {
      res.render("post",{
        postTitle: post.title,
        postArticle: post.article
      });}
  });
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
