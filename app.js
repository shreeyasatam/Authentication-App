const express = require ("express");
const app = express()
const bodyParser = require ("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs")
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');

mongoose.connect("mongodb://localhost:27017/userDbB", {useNewUrlParser: true});

const userSchema = {
    email: String,
    password: String
}

const User = new mongoose.model("User", userSchema);



app.get("/", function(req, res){
    res.render("home")
});
app.get("/login", function(req, res){
    res.render("login")
});
app.get("/register", function(req, res){
    res.render("register")
});

app.post("/register", function(req, res){
    const newUser = new User({
        email: req.body.username,
        password: req.body.password
    });

    newUser.save(function(err){
        if(err){
            console.log(err)
        }else{
            res.send("secrets");
        }
    })
});

app.post("/login", function(req, res){
    const username = req.body.username;
    const password = req.body.password;
    User.findOne({email: username}, function(err, foundUser){
        if(foundUser){
            if(foundUser.password === password){
                res.send("secrets")
            }else{
                res.send("incorrect password")
            }
        }else
        {
            res.send("incorrect email")
        }
    })
})









app.listen(3000, function(){
    console.log("server started on port 3000");
})