const express=require("express");
const bodyParser=require("body-parser");
const cors=require("cors");
const mongoose=require("mongoose");
const postRoutes=require("./routes/postRoutes")
const userRoutes=require("./routes/userRoute");
const storyRoutes=require("./routes/storyRoute");
const app=express();
app.use(bodyParser.json({limit:"30mb" ,extended:true}))
app.use(cors());
app.use("/posts",postRoutes);
app.use("/user",userRoutes);
app.use("/story",storyRoutes);


//mongodb connections
const CONNECTION_URL="mongodb+srv://dhana:ticker@cluster0.hnia1.mongodb.net/test"

const port=process.env.port|| 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>app.listen(port,()=>console.log(`Listening on port ${port}`)))
.catch((err)=>console.log(err));
