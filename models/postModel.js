const mongoose = require("mongoose");
const {ObjectId}=mongoose.Schema.Types
const postSchema= mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    photo:{
        type:String,
required:true    },
    postedBy:{
        type:ObjectId,
        ref:"Users"
    },
    likes:[{
        type:ObjectId,
        ref:"Users"
    }]
   

})

const Post=mongoose.model("Post",postSchema);


module.exports=Post;