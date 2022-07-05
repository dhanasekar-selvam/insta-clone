const express=require("express");

const User=require("../controllers/user.js")
const requiredLogin = require("../middleware/requiredLogin")




const Router=express.Router();

Router.get("/",User.getUser);
Router.post("/signup",User.saveUser);
Router.get("/test",requiredLogin,User.test);
Router.get("/:email",User.findUser);
Router.get("/profile/:id",User.user);
Router.put("/follow",requiredLogin,User.follow)
Router.put("/unfollow",requiredLogin,User.unfollow)

Router.post("/signin",User.signIn);

module.exports=Router;