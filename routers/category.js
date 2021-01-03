const { Category } = require('../models/category');
const express = require("express");
const router = express.Router();

//get all category
router.get("/", async (req, res) => {
  
       const categoryList = await Category.find();
       
       if(!categoryList)
       {
           res.status(500).json({
               success: false
           });
       }
       res.status(200).send(categoryList);

});

//get single category
router.get("/:id", async (req, res) => {
  
    const category = await Category.findById(req.params.id);
    
    if(!category)
    {
        res.status(500).json({
            success: false,
            message: 'the category with given id is not found'
        });
    }
    res.status(200).send(category);

});

//update category
router.put('/:id', async (req, res) => {

    

    const updatedCategory = await Category.findByIdAndUpdate(req.params.id, {
        $set: {
            name: req.body.name,
            icon: req.body.icon,
            color: req.body.color
        }
    }, {
         new: true
         }
    ); 
    
    if(!updatedCategory)
    {
        res.status(500).json({
            success: false,
            message: 'the category with given id is not found'
        });
    }

    res.status(200).send(updatedCategory);

});

//add category
router.post('/', async (req,res) => {

    // create 
    let category = new Category({
        name:req.body.name,
        icon:req.body.icon,
        color:req.body.color
    });

    //wait until category is save
    category = await category.save();

    // if no category send error
    if(!category)
    {
        return res.status(404).send('no category');
    }

    res.send(category);

});

//delete category
router.delete('/:id',(req,res) => {

    Category.findByIdAndRemove(req.params.id)
            .then(category => {
                if(category)
                {
                    return res.status(200).json({
                        success: true,
                        message: 'the category is deleted'
                    });
                }else{
                    return res.status(404).json({
                        success: false,
                        message: 'the category is not found'
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
