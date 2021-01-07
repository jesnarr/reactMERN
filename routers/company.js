const { Company } = require('../models/user');
const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.get("/", async (req, res) => {
                                             //display only selected fields
       const companyList = await Company.find().select('name phone email address');
       
       if(!companyList)
       {
           res.status(500).json({
               success: false
           });
       }
      return res.send(companyList);

});


//add add admin
// router.post('/', async (req,res) => {

//     // create 
//     let user = new Company({
//        name: req.body.name,
//        email: req.body.email,
//        passwordHash: bcrypt.hashSync(req.body.password,10), //encrypt password
//        phone: req.body.phone,
//        isAdmin: req.body.isAdmin,
//        apartment: req.body.apartment,
//        zip: req.body.zip,
//        city: req.body.city,
//        country: req.body.country,
//     });

//     //wait until category is save
//     user = await user.save();

//     // if no category send error
//     if(!user)
//     {
//         return res.status(404).send('the user cannot be created');
//     }

//     return res.send(user);

// });
//add user
router.post('/register', async (req,res) => {

    // create 
    let company = new Company({
       name: req.body.name,
       email: req.body.email,
       passwordHash: bcrypt.hashSync(req.body.password,10), //encrypt password
       phone: req.body.phone,
       address: req.body.address,
    });

    //wait until company is save
    company = await company.save();

    // if no company send error
    if(!company)
    {
        return res.status(404).send('the company cannot be created');
    }

   return res.send(company);

});

//get single user
router.get("/:id", async (req, res) => {
                                                //select - remove passwordHash column
    const company = await Company.findById(req.params.id).select('-passwordHash');
    
    if(!company)
    {
        res.status(500).json({
            success: false,
            message: 'the company with given id is not found'
        });
    }
    return res.status(200).send(company);

});

router.post('/login', async (req, res) => {

    // check if email is existing
    const company = await Company.findOne({email: req.body.email});
    const secret = process.env.secret;


    if(!company)
    {
        return res.status(400).json({message: 'cannot find company user'})
    }else{
    // check if email and password is correct
    if(company && bcrypt.compareSync(req.body.password, user.passwordHash)){
        const token = jwt.sign(
            { 
                userId: company.id
            },
            secret, //secret parameter
            {
                expiresIn: '1d' //1 day //1w - 1 week 1m - 1 month
            } 
            )
       return res.status(200).send({company: company.email, token:token});
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



module.exports = router;

