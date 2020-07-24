//need to install ejs   'npm install ejs'
//npm to install body-parser

// 545  node app.js
// 546  npm install --save xml-js
// 547  npm install node-fetch --save
// 548  node app.js
// 549  npm install express --save
// 550  node app.js
// 551  npm install ejs --save
// 552  node app.js


let express = require("express");
let app = express(); //executes all the express files whenever the variable app is called
let bodyParser = require("body-parser");

const fetch = require('node-fetch');
const convert = require('xml-js')
function sendRss(url, channelName){
fetch(url).then(response => response.text()).then(str => {
    dataAsJson = JSON.parse(convert.xml2json(str));
    console.log(dataAsJson.elements[0].elements[3].elements[0].text)
    // console.log(dataAsJson.elements[0].elements[4])
    // console.log(dataAsJson.elements[0].elements[5].elements)
    console.log(dataAsJson.elements[0].elements[7].elements[3].elements[0].text) //Channel's name
    console.log(dataAsJson.elements[0].elements[7].elements[4].attributes.href) //Last Video
    console.log(dataAsJson.elements[0].elements[7].elements[6].elements[0].text) //Upload date

   data.push(dataAsJson.elements[0].elements[7].elements[3].elements[0].text);
   console.log("----------")
   console.log(data[0]);
})
}


var data = [];


sendRss('https://www.youtube.com/feeds/videos.xml?channel_id=UCqJ-Xo29CKyLTjn6z2XwYAw', 'Game Makers Toolkit')
sendRss('https://www.youtube.com/feeds/videos.xml?channel_id=UCddiUEpeqJcYeBxX1IVBKvQ', 'The Verge');
sendRss('https://www.youtube.com/feeds/videos.xml?channel_id=UCrqAGUPPMOdo0jfQ6grikZw', 'Colt Steele');
sendRss('https://www.youtube.com/feeds/videos.xml?channel_id=UC0fDG3byEcMtbOqPMymDNbw', 'No Clip');


app.use(bodyParser.urlencoded({extended: true}));

//this will express to look at files in the public folder
app.use(express.static("public"));

//this means it work all the get and post scopes
let posts2 = [ "Harry Potter", "Star Wars"];
//Order of routes are important
//define a route
app.get("/", function(req, res){
    //res.send("Hi There!");
    let name = dataAsJson.elements[0].elements[7].elements[6].elements[0].text;
    let name2 = dataAsJson.elements[0].elements[7].elements[4].attributes.href;
    res.render("home.ejs", {posts2 : data});
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