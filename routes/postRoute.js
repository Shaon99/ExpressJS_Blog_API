const express = require ('express');
const pictureUpload = require('../middleware/pictureUpload');

const router = express.Router();

const Post = require("../models/post");

//getall post
router.get('/', async (req,res) => {
try {
    const posts = await Post.find();
    res.json(posts);
} catch (err) {
    res.json({
        message:err
    });
}
});

// add user
router.post('/',pictureUpload, async function (req, res, next) {
    let newPost
    if (req.files && req.files.length > 0) {
        newPost = new Post({
            ...req.body,
            picture: req.files[0].filename,
        })
    } else {
        newPost = new Post({
            ...req.body,
        })
    }

    // save user or send error
    try {
        const result = await newPost.save()
        res.status(200).json({
            message: "Post was added successfully!"
        })
    } catch (err) {
        res.status(500).json({
            errors: {
                common: {
                    msg: "Unknown error occured!"
                }
            }
        })
    }
});

//specific post
router.get('/:postId',async(req,res)=>{
    try {
        const post= await Post.findById(req.params.postId);
        res.json(post);
    } catch (err) {
        res.json({
            message:err
        });
    }  
});

//delete
router.delete('/:postId',async(req,res)=>{
    try {
        const removePost= await Post.findByIdAndDelete(req.params.postId);
        res.json(removePost);
    } catch (err) {
        res.json({
            message:err
        });
    }  
});

//update a post
router.patch('/:postId',async(req,res)=>{
    try {
        const updatePost= await Post.updateOne({_id:req.params.postId},{$set:req.params.title});
        res.json(updatePost);
    } catch (err) {
        res.json({
            message:err
        });
    }  
});


    
module.exports=router;
    
    
