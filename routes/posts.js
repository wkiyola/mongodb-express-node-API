const router = require('express').Router();
const Post = require('../Models/Post');

//GET REQUESTS 

//fetch all posts
router.get('/', async (req,res)=>{
    try{
        const allPosts = await Post.find();
        res.json(allPosts);
    }catch(error){
        res.status(400).send('An error has occurred....')
    }
});

//fetch a specific post

router.get('/:postId', async (req, res) => {
    try{
        const post = await Post.findById(req.params.postId);
        res.json(post);
    }catch(error){
        res.status(400).send('Post not found!');
    }
});

//POST REQUESTS

//submits a new single post
router.post('/', async (req, res)=>{

        const post = new Post({
            title: req.body.title,
            message: req.body.message
        });
        try{
            const savedPost = await post.save();
            res.json(savedPost);
        }catch(error){
            res.status(400).send(error);
        }
});

//DELETE REQUESTS

//delete all posts
router.delete('/', async (req, res) => {
    try{
        const deletedPosts = await Post.remove();
        res.json(`All posts have been deleted!`);
    }catch(error){
        res.status(400).send('Operation failed!')
    }
});

//delete a specific post
router.delete('/:postId', async (req, res) => {
    try{
        const deletedPost = await Post.remove({ _id: req.params.postId})
        res.json(`A post has been deleted...`)
    }catch(error){
        res.status(400).send('Ooops, could not delete the post!')
    }
});

//UPDATE REQUESTS

//update a specific post
router.patch('/:postId', async (req, res) => {
    try{
        const updatedPost = await Post.updateOne(
            { _id: req.params.postId}, 
            { $set: { 
                title: req.params.title,
                message: req.params.message,
                lastUpdated: Date.now 
            }});
            res.json(updatedPost);
    }catch(error){
        res.status(400).send('Update has failed..')
    }
});
module.exports = router;
