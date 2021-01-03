const { Product } = require('../models/product');
const { Category } = require('../models/category');
const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');



const FILE_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg'
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const isValid = FILE_TYPE_MAP[file.mimetype];
        let uploadError = new Error('invalid image type');

        if(isValid) {
            uploadError = null
        }
      cb(uploadError, 'public/uploads')
    },
    filename: function (req, file, cb) {
        
      const fileName = file.originalname.split(' ').join('-');
      const extension = FILE_TYPE_MAP[file.mimetype];
      cb(null, `${fileName}-${Date.now()}.${extension}`)
    }
  })
  
const uploadOptions = multer({ storage: storage })


router.get('/', async (req, res) => {

    let filter = {};
    if(req.query.categories)
    {
         filter = {category: req.query.categories.split(',')};
    }
    // select all fields
    const productList = await Product.find(filter).populate('categories');
    // add select() to select fields - remove id
    // const productColumns = await Product.find().select('name image rating -_id');


    if(!productList){
        res.status(500).json({
            success: false
        });
    }else{
    res.send(productList);
    }
 });
 
 
// get single
router.get('/:id', async (req, res) => {
    // populate - if product is connected to other db
    const product = await Product.findById(req.params.id);
    if(!product){
        res.status(500).json({
            success: false
        });
    }else{
    res.send(product);
    }
 });


 //update product
router.put('/:id', async (req, res) => {
    // check if update id is valid
    if(!mongoose.isValidObjectId(req.params.id)){
        res.status(400).send('Invalid Product ID');
    }

    const category = await Category.findById(req.body.category)
    if(!category) 
        return res.status(400).send('Invalid Category');

    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {
        $set: {
            name: req.body.name,
            description: req.body.description,
            richDescription: req.body.richDescription,
            image:req.body.image,
            brand: req.body.brand,
            price: req.body.price,
            category: req.body.category,
            countInStock: req.body.countInStock,
            rating: req.body.rating,
            numReviews: req.body.numReviews,
            isFeatured: req.body.isFeatured
        }
    }, {
         new: true
         }
    ); 
    
    if(!updatedProduct)
    {
        res.status(500).json({
            success: false,
            message: 'the category with given id is not found'
        });
    }

    res.status(200).send(updatedProduct);

});
 
//add category
 router.post('/', uploadOptions.single('image'), async (req, res) => {
     
    const category = await Category.findById(req.body.category)
    if(!category) 
        return res.status(400).send('Invalid Category');

        //validation if there is image uploaded
    const file = req.file;
    if(!file)
        return res.status(400).send('there is no file');

    const fileName = req.file.filename; 
    const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;
                    //https://localhost:3000/public/upload/

     const product = new Product({
         name: req.body.name,
         description: req.body.description,
         richDescription: req.body.richDescription,
         image: `${basePath}${fileName}`,
         brand: req.body.brand,
         price: req.body.price,
         category: req.body.category,
         countInStock: req.body.countInStock,
         rating: req.body.rating,
         numReviews: req.body.numReviews,
         isFeatured: req.body.isFeatured
     });
     
    const productResult = await product.save();

     if(!productResult)
        return res.status(500).send('The product cannot be created');

     res.send(product);
   
 });

 //delete products
router.delete('/:id',(req,res) => {

    Product.findByIdAndRemove(req.params.id)
            .then(product => {
                if(product)
                {
                    return res.status(200).json({
                        success: true,
                        message: 'the product is deleted'
                    });
                }else{
                    return res.status(404).json({
                        success: false,
                        message: 'the product is not found'
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

// select count(id) as count from products
router.get('/get/count', async (req, res) => {
        const productCount = await Product.countDocuments((count) => count);
        
        if(!productCount)
        {
            res.status(500).json({
                success:false
            });
        }
        res.send({
            productCount
        })
});



// featured api 
router.get('/get/featured/:count', async (req, res) => {
    const count = req.params.count ? req.params.count: 0;
    // get data with featured true 
    // limit featured to count 
    // add + to change it to number
    const products = await Product.find({isFeatured: true}).limit(+count);
    
    if(!products)
    {
        res.status(500).json({
            success:false
        });
    }
    res.send(products)
})
                                                                
    router.put(
    '/gallery-images/:id', 
    uploadOptions.array('images', 10), //10 files
    async (req, res)=> {
    if(!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).send('Invalid Product Id')
        }
        const files = req.files
        let imagesPaths = [];
        const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;

        if(files) {
        files.map(file =>{
            imagesPaths.push(`${basePath}${file.filename}`);
        })
        }

        const product = await Product.findByIdAndUpdate(
        req.params.id,
        {
            images: imagesPaths
        },
        { new: true}
    )

    if(!product)
        return res.status(500).send('the gallery cannot be updated!')

    res.send(product);
    }
    )

 module.exports = router;