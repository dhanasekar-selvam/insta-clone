const Users = require("../models/userModel")
const posts = require("../models/postModel.js")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config()


const user=(req,res)=>{
    Users.findOne({_id:req.params.id})
    .select("-password")
    .then(user=>{
         posts.find({postedBy:req.params.id})
         .populate("postedBy","_id fullname")
         .exec((err,posts)=>{
             if(err){
                 return res.status(422).json({error:err})
             }
             res.json({user,posts})
         })
    }).catch(err=>{
        return res.status(404).json({error:"User not found"})
    })
}


const getUser = (req, res) => {
    Users.find().then((users) => {
        res.status(200).json(users)
    }).catch((err) => res.status(404).json({ msg: err }))

}

const saveUser = (req, res) => {
    const saltRounds = 10;
   // console.log(req.body);
    const { username, email, password, fullname } = req.body;

    if (!username || !email || !password || !fullname) {
        res.status(404).json({ msg: "please fill all the fields" })
    }

    //check user avail
    Users.findOne({ email: email })
        .then((isfound) => {
            if (isfound) { return res.status(422).json({ msg: "user already found" }) }
            bcrypt.hash(password, saltRounds).then(function (hash) {
                const user = new Users({
                    username,
                    email,
                    password: hash,
                    fullname
                })
                user.save()
                    .then(user => {
                        res.json({ msg: "saved successfully", user: user })
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            });




        }
        )
}
function find(email) {
    const data = Users.findOne({ email: email }).then((response) => {
       // console.log(response);
        return response
    }).catch(err => { return err })

    return data;
}
const findUser = async (req, res) => {
   // console.log("finduser");
    const email = req.params.email;

    const result = await find(email);
    console.log(result);

    if (result != null) {
        res.status(200).json(result);
    } else {
        res.status(404).json({ msg: "user not found!" })
    }
}

const signIn = async (req, res) => {
    const { email, password } = req.body;


    const user = await find(email)

    const hashPassword = user.password;

    if (user != null) {
        bcrypt.compare(password, hashPassword).then(function (result) {
            if (result == true) {
                // res.status(200).json(user);

                const token = jwt.sign({ _id: user._id }, process.env.jwt_secret);
                const {_id,username,email,following,followers}=user
                res.json({token,user:{_id,username,email,following,followers}});
            }
            else {
                res.status(404).json({ msg: "invalid user" })
            }

        });
    }
    else {
        res.status(404).json({ msg: "user not found" })
    }
}

const test = (req, res) => {
    console.log("test");
    res.send('vald')
    //res.send("valid user") 
}

const follow=(req,res)=>{
    Users.findByIdAndUpdate(req.body.followId,{
        $push:{followers:req.user._id}
    },{
        new:true
    },(err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }
      Users.findByIdAndUpdate(req.user._id,{
          $push:{following:req.body.followId}
          
      },{new:true}).select("-password").then(result=>{
          res.json(result)
      }).catch(err=>{
          return res.status(422).json({error:err})
      })

    }
    )
}
const unfollow=(req,res)=>{
    Users.findByIdAndUpdate(req.body.unfollowId,{
        $pull:{followers:req.user._id}
    },{
        new:true
    },(err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }
      Users.findByIdAndUpdate(req.user._id,{
          $pull:{following:req.body.unfollowId}
          
      },{new:true}).select("-password").then(result=>{
          res.json(result)
      }).catch(err=>{
          return res.status(422).json({error:err})
      })

    }
    )
}



module.exports = { getUser, saveUser, findUser, signIn, test, user ,follow,unfollow};