const mongoose = require("mongoose");

const jobSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    salary:{
        type: String,
        default: '0'
    },
    status:{
        type: String,
        default: 'Open'
    },
    type:{
        type: String,
        required: true,
    },
    created:{
        type: Date,
        default: Date.now()
        
    },
    applied:{
        type: Number,
        default: 0
    },
    requirements:{
        type: String,
        required: true,
    },
    user:{
        type:  mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    applicants:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: []
    }]

});
// mongoose.pluralize(null); remove plural database
exports.Job = mongoose.model('Job',jobSchema);