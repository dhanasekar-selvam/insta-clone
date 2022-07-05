const jwt=require("jsonwebtoken");
const Users=require("../models/userModel")
require('dotenv').config()
module.exports=(req,res,next)=>{
    const {authorization}=req.headers
    if(!authorization)
    {
       return res.status(401).json({error:"you must logged in"})
    }
    const token=authorization.replace("Bearer ", "")
   // console.log(token);
    jwt.verify(token,process.env.jwt_secret,(err,payload)=>{
        if(err){
            return res.status(401).json({error:"you must be logged in"})
        }
        const {_id}=payload
        Users.findById(_id).then((userData)=>{
            req.user=userData;
            next();
        })
    })
}