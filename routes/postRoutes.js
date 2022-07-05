const express=require("express");
const requiredLogin =require("../middleware/requiredLogin")

const Post=require("../controllers/posts.js")

const Router=express.Router();
Router.delete("/delete/:postId",requiredLogin,Post.deletePost);
Router.get("/",requiredLogin,Post.getPosts);
Router.post("/save",requiredLogin,Post.createPost);
Router.get("/mypost",requiredLogin,Post.myPosts);
Router.put("/like",requiredLogin,Post.likePost);
Router.put("/unlike",requiredLogin,Post.unLikePost);

Router.get("/getsubpost",requiredLogin,Post.userSubPosts);


module.exports=Router;