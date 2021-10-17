//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');
const mongoose = require("mongoose");
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

let posts = [];

// homepage
app.get("/", function(req, res) {
  res.render("home", {
    posts: posts
  });
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
  const post = {
    title: req.body.postTitle,
    article: req.body.postArticle,
  }
  posts.push(post);
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
