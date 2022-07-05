const posts = require("../models/postModel.js")
const getPosts = (req, res) => {
    posts.find().populate("postedBy", "_id email fullname")
        .then((Posts) => {

            res.status(200).json({ Posts });

        }).
        catch((error) => {
            res.status(404).json({ message: error.message });
        })
}



const createPost = (req, res) => {

    ////  console.log(req.user);
    //console.log("create post ");
    // console.log(req.body)
    const { title, body, imgUrl } = req.body

    if (!title || !body || !imgUrl) {
        res.status(422).json({ error: "Please add all the fields" })
    }
    req.user.password = undefined;
    const post = new posts({
        title,
        body,
        photo: imgUrl,
        postedBy: req.user
    })

    post.save().then(result => {
        res.json({ post: result })
    })
        .catch((err) => {
            console.log(err)
        })
}
const myPosts = (req, res) => {
    posts.find({ postedBy: req.user._id })
        .populate("postedBy", "_id email fullname")
        .then((myposts) => {
            //console.log(myposts)
            res.json(myposts)
        })
        .catch(err => {
            console.log(err)
        })
}

const userSubPosts = (req, res) => {
    posts.find({ postedBy:{$in: req.user.following} })
        .populate("postedBy", "_id email fullname")
        .then((myposts) => {
            //console.log(myposts)
            res.json(myposts)
        })
        .catch(err => {
            console.log(err)
        })
}

const likePost = (req, res) => {
    posts.findByIdAndUpdate(req.body._id, {
        $push: { likes: req.user._id }
    }
        , { new: true }).populate("postedBy","_id fullname ")
        .exec((err, result) => {
            if (err) {
                return res.status(422).json(err)
            }
            else {
                res.json(result)
            }
        })
}
const unLikePost = (req, res) => {
    posts.findByIdAndUpdate(req.body._id, {
        $pull: { likes: req.user._id }
    }
        , { new: true }).populate("postedBy","_id fullname ")
        .exec((err, result) => {
            if (err) {
                return res.status(422).json(err)
            }
            else {
                res.json(result)
            }
        })
}

const deletePost = (req, res) => {
    posts.findOne({ _id: req.params.postId }).populate("postedBy", "_id")
        .exec((err, post) => {
            if (err || !post) {
                return res.status(422).json({ error: err })
            }
            if (post.postedBy._id.toString() === req.user._id.toString()) {
                post.remove()
                    .then(result => res.json(result))
                    .catch(err => console.log(err))
            }
        }
        )
}

module.exports = { getPosts, createPost, myPosts, likePost, unLikePost, deletePost, userSubPosts };