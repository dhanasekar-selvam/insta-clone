const express=require("express");
const requiredLogin =require("../middleware/requiredLogin")

const Story=require("../controllers/story.js")

const Router=express.Router();
Router.get("/",requiredLogin,Story.getStory);
Router.post("/save",requiredLogin,Story.createStory);
Router.get("/mystory/:_id",requiredLogin,Story.myStories);
Router.get("/myfollowers",requiredLogin,Story.subStories);




module.exports=Router;