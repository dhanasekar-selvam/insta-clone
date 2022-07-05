const stories = require("../models/storyModel.js")
const getStory = (req, res) => {
    stories.find().populate("postedBy", "_id email fullname")
        .then((Stories) => {

            res.status(200).json({ Stories });

        }).
        catch((error) => {
            res.status(404).json({ message: error.message });
        })
}



const createStory = (req, res) => {

    ////  console.log(req.user);
    console.log("create story ");
    // console.log(req.body)
    const { title, body, imgUrl } = req.body

    if (!title || !body || !imgUrl) {
        res.status(422).json({ error: "Please add all the fields" })
    }
    req.user.password = undefined;
    const story = new stories({
        title,
        body,
        photo: imgUrl,
        postedBy: req.user
    })

    story.save().then(result => {
        res.json({ story: result })
    })
        .catch((err) => {
            console.log(err)
        })
}
const myStories = (req, res) => {
    stories.find({ postedBy: req.params._id })
        .populate("postedBy", "_id email fullname")
        .then((mystories) => {
          //  console.log(mystories)
            res.json(mystories)
        })
        .catch(err => {
            console.log(err)
        })
}



const subStories = (req, res) => {
    stories.find({ postedBy:{$in: req.user.following} })
        .populate("postedBy", "_id email fullname")
        .then((subStories) => {
            //console.log(subStories)
            res.json(subStories)
        })
        .catch(err => {
            console.log(err)
        })
}
module.exports = { getStory, createStory, myStories,subStories };