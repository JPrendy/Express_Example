//need to install ejs   'npm install ejs'
//npm to install body-parser

let express = require("express");
let app = express(); //executes all the express files whenever the variable app is called
let bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));

//this will express to look at files in the public folder
app.use(express.static("public"));

//this means it work all the get and post scopes
let posts2 = [ "Harry Potter", "Star Wars"];
//Order of routes are important
//define a route
app.get("/", function(req, res){
    //res.send("Hi There!");
    let name = "James";
    res.render("home.ejs", {nameVar : name});
});

app.get("/post", function(req, res){
    //res.send("Hi There!");
    //  let posts = [
    //      { title : "Harry Potter"},
    //      { title : "Star Wars"}
    //   ]
    res.render("posts.ejs", {posts2 : posts2});
});

app.post("/addPost", function(req, res){
    console.log(req.body.newPost);
    let newPost = req.body.newPost;
    posts2.push(newPost);
    console.log(posts2);
    res.redirect("/post");
});

app.get("/bye", function(req, res){
    res.send("Goodbye!!");
});

app.get("/dog", function(req, res){
    //console.log(res);
    res.send("MEOW");
});

// the : allows whatever value we put after /r/ to work so  /r/cat  or /r/dog    would work
app.get("/r/:variable", function(req, res){
    //console.log(res);
    //this retrieve whatever we define as :variable
    var variable =  req.params.variable;
    res.send("Special Variable address, the address name is " + variable);
});



//This should always be the last route
//called when the other get requests are not called
app.get("*", function(req, res){
    //console.log(res);
    res.send("Sorry. Page not found.");
});

//gives a port for express to listen to
app.listen(3000, function(){
    console.log("server has started");
});

//If this is not on the localhost
// app.listen(process.env.PORT, process.env.IP, function(){
//     console.log("server has started");
// });