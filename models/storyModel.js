const mongoose = require("mongoose");
const {ObjectId}=mongoose.Schema.Types
const storySchema= mongoose.Schema({
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
    

})

const Story=mongoose.model("Story",storySchema);


module.exports=Story;