const { User } = require('../models/user');
const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.get("/", async (req, res) => {
                                             //display only selected fields
       const userList = await User.find().select('name phone email address');
       
       if(!userList)
       {
           res.status(500).json({
               success: false
           });
       }
      return res.send(userList);

});


//add add admin
router.post('/', async (req,res) => {

    // create 
    let user = new User({
       name: req.body.name,
       email: req.body.email,
       passwordHash: bcrypt.hashSync(req.body.password,10), //encrypt password
       phone: req.body.phone,
       isAdmin: req.body.isAdmin,
       apartment: req.body.apartment,
       zip: req.body.zip,
       city: req.body.city,
       country: req.body.country,
    });

    //wait until category is save
    user = await user.save();

    // if no category send error
    if(!user)
    {
        return res.status(404).send('the user cannot be created');
    }

    return res.send(user);

});
//add user
router.post('/register', async (req,res) => {

    // create 
    let user = '';
    const userType = req.body.isAdmin;
    if(userType)
    {
        user = new User({
       name: req.body.name,
       email: req.body.email,
       passwordHash: bcrypt.hashSync(req.body.password,10), //encrypt password
       phone: req.body.phone,
       isAdmin: req.body.isAdmin,
       address: req.body.address,
    });
    }
    else{
        user = new User({
       name: req.body.name,
       email: req.body.email,
       passwordHash: bcrypt.hashSync(req.body.password,10), //encrypt password
       phone: req.body.phone,
    });
    }

    //wait until category is save
    user = await user.save();

    // if no category send error
    if(!user)
    {
        return res.status(404).send('the user cannot be created');
    }

   return res.send(user);

});

//get single user
router.get("/:id", async (req, res) => {
                                                //select - remove passwordHash column
    const user = await User.findById(req.params.id).select('-passwordHash');
    
    if(!user)
    {
        res.status(500).json({
            success: false,
            message: 'the user with given id is not found'
        });
    }
    return res.status(200).send(user);

});

router.post('/login', async (req, res) => {

    // check if email is existing
    const user = await User.findOne({email: req.body.email});
    const secret = process.env.secret;


    if(!user)
    {
        return res.status(400).json({message: 'cannot find user'})
    }else{
    // check if email and password is correct
    if(user && bcrypt.compareSync(req.body.password, user.passwordHash)){
        const token = jwt.sign(
            { 
                userId: user.id,
                isAdmin: user.isAdmin
            },
            secret, //secret parameter
            {
                expiresIn: '1d' //1 day //1w - 1 week 1m - 1 month
            } 
            )
       return res.status(200).send({user: user.email, token:token, isAdmin: user.isAdmin, id:user._id});
    }else{
         return res.status(400).json({message: 'Password is incorrect'});
    }
    }

    

});

router.get('/get/count', async (req, res) => {
    const userCount = await User.countDocuments((count) => count);
    
    if(!userCount)
    {
        res.status(500).json({
            success:false
        });
    }
    res.send({
        userCount
    })
});



 //delete user
 router.delete('/:id',(req,res) => {

    User.findByIdAndRemove(req.params.id)
            .then(user => {
                if(user)
                {
                    return res.status(200).json({
                        success: true,
                        message: 'the user is deleted'
                    });
                }else{
                    return res.status(404).json({
                        success: false,
                        message: 'the user is not found'
                    });
                }
            })
            .catch(err => {
                return res.status(400).json({
                    success: false,
                    error: err
                })
            })

});


//get all keywords
router.get("/search/:name", async (req, res) => {


        let query = {};
        if (req.params.name !== undefined) {
            query = {
                name: new RegExp(req.params.name, 'i')
            };
        }
       const jobList = await Job.find(query);
       
       if(!jobList)
       {
           res.status(500).json({
               success: false
           });
       }else{
       res.status(200).send(jobList);
       }

});

module.exports = router;
