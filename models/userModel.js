const mongoose = require("mongoose");
const {ObjectId}=mongoose.Schema.Types;
const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
     password: {
        type: String,
        required: true
    },
     fullname: {
        type: String,
        required: true
    },
    followers:[{
        type:ObjectId,ref:"Users"
    }],
    following:[
        {
            type:ObjectId,ref:"Users"
        }
    ]


})

const Users = mongoose.model("Users", userSchema);

module.exports = Users;

