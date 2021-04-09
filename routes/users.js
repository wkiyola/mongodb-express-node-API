const router = require('express').Router();
const User = require('../Models/User');

//GET REQUESTS 

//fetch all users in the database
router.get('/', async (req,res)=>{
    try{
        const allUsers = await User.find();
        res.json(allUsers);
    }catch(error){
        res.status(400).send('An error has occurred....')
    }
});

//fetch a specific user

router.get('/:userId', async (req, res) => {
    try{
        const user = await User.findById(req.params.userId);
        res.json(user);
    }catch(error){
        res.status(400).send('User not found!');
    }
});

//POST REQUESTS

//submits a new single user
router.post('/', async (req, res)=>{

        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            team: req.body.team
        });
        try{
            const savedUser = await user.save();
            res.json(savedUser);
        }catch(error){
            res.status(400).send(error);
        }
});

//DELETE REQUESTS

//delete a specific user
router.delete('/:userId', async (req, res) => {
    try{
        const deletedUser = await User.remove({ _id: req.params.userId});
        res.json(`One user has been deleted...`);
    }catch(error){
        res.status(400).send('Ooops, could not delete the user!')
    }
});

//UPDATE REQUESTS

router.patch('/:userId', async (req, res) => {
    try{
        const updatedUser = await User.updateOne(
            { _id: req.params.userId}, 
            { $set: { 
                username: req.params.username,
                lastUpdated: Date.now 
            }});
            res.json(updatedUser);
    }catch(error){
        res.status(400).send('Update has failed..')
    }
});
module.exports = router;
