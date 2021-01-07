const mongoose = require("mongoose");


const companySchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required:true,
    },
    passwordHash: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    street: {
        type: String,
        default: ''
    },
    zip: {
        type: String,
        default: ''
    },
    city: {
        type: String,
        default: ''
    },
    country: {
        type: String,
        default: ''
    },
    image:{
        type:String,
        
    }
    

});


// add virtual id or copy of _id
// set _id to id
companySchema.virtual('id').get(function ()
{
    return this._id.toHexString();
});

companySchema.set('toJSON', {
    virtuals: true,
});
// end of setting id
// Company table
exports.Company = mongoose.model('Company',companySchema);