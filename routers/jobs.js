const { Job } = require('../models/job');
const express = require("express");
const router = express.Router();

//get all jobs
router.get("/", async (req, res) => {
  
       const jobList = await Job.find();
       
       if(!jobList)
       {
           res.status(500).json({
               success: false
           });
       }else{
       res.status(200).send(jobList);
       }

});
//get all popular jobs
router.get("/popular", async (req, res) => {
  
    const jobList = await Job.find().sort({'applied':-1}).limit(5);
    
    if(!jobList)
    {
        res.status(500).json({
            success: false
        });
    }else{
         res.status(200).send(jobList);
    }

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


//get single job
router.get("/:id", async (req, res) => {
  
    const job = await Job.findById(req.params.id);
    
    if(!job)
    {
        res.status(500).json({
            success: false,
            message: 'the Job with given id is not found'
        });
    }else{
        res.status(200).send(job);
    }

});

// get list of posted job
router.get("/all/:id", async (req, res) => {
  

    const jobList = await Job.findOne({user: req.params.id}).populate('user');
    
    if(!jobList)
    {
        res.status(500).json({
            success: false
        });
    }else{
    res.status(200).send(jobList );

    }

});
//update job
router.post('/update', async (req, res) => {

   

    const updatedJob = await Job.findByIdAndUpdate(req.body.id, {
        $set: {
            name: req.body.name,
            description:req.body.description,
            salary: req.body.salary,
            // user: req.body.user,
            status: req.body.status,
            type:req.body.type,
            requirements: req.body.requirements,
             }
        }, 
        {
         new: true
         }
    ); 
    
    if(!updatedJob)
    {
        res.status(500).json({
            success: false,
            message: 'the job with given id is not found'
        });
    }

    res.status(200).send(updatedJob);

});

//add Job
router.post('/', async (req,res) => {

    // create 
    let job = new Job({
            name: req.body.name,
            description:req.body.description,
            salary: req.body.salary,
            user: req.body.user,
            type:req.body.type,
            requirements: req.body.requirements,
    });

    //wait until job is save
    job = await job.save();

    // if no job send error
    if(!job)
    {
        return res.status(404).send('no job');
    }

    res.send(job);

});


//delete job
router.get('/delete/:id',(req,res) => {
    

    Job.findByIdAndRemove(req.params.id)
            .then(job => {
                if(job)
                {
                    return res.status(200).json({
                        success: true,
                        message: 'the job is deleted'
                    });
                }else{
                    return res.status(404).json({
                        success: false,
                        message: 'the job is not found'
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
