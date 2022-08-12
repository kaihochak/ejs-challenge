//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash")

const homeContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";
const posts = [{
  title: "Test Title",
  content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Scelerisque purus semper eget duis at tellus. Turpis cursus in hac habitasse. Imperdiet sed euismod nisi porta lorem. Vitae purus faucibus ornare suspendisse sed nisi lacus sed viverra. Tincidunt augue interdum velit euismod in pellentesque massa placerat duis. Netus et malesuada fames ac turpis egestas integer eget aliquet. Amet consectetur adipiscing elit ut aliquam purus sit amet. Sed vulputate odio ut enim blandit volutpat maecenas. Sociis natoque penatibus et magnis dis. Tristique magna sit amet purus. Enim ut tellus elementum sagittis vitae. Massa id neque aliquam vestibulum morbi. Mattis rhoncus urna neque viverra justo nec ultrices dui sapien. Ultricies tristique nulla aliquet enim tortor at auctor urna nunc. Turpis tincidunt id aliquet risus feugiat in ante metus dictum. Diam volutpat commodo sed egestas. Cras tincidunt lobortis feugiat vivamus at augue eget arcu dictum."
}];

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res){
  res.render("home", {
    content: homeContent,
    blogPosts: posts
  });
});

app.get("/about", function(req, res){
  res.render("about", {content: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("about", {content: contactContent});
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  const newPost = {
    title: req.body.postTitle,
    content: req.body.postContent
  }

  posts.push(newPost);
  res.redirect("/");
});

app.get("/posts/:topic", function(req, res){
  posts.forEach(function(post){
    if ( _.lowerCase(post.title) === _.lowerCase(req.params.topic) ) {
      res.render("post", {
        title: post.title,
        content: post.content
      });
    }
  });
});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
