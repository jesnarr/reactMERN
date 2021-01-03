const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({

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
    isAdmin: {
        type: Boolean,
        default: false
    },
    street: {
        type: String,
        default: ''
    },
    apartment: {
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
    }
});


// add virtual id or copy of _id
// set _id to id
userSchema.virtual('id').get(function ()
{
    return this._id.toHexString();
});

userSchema.set('toJSON', {
    virtuals: true,
});
// end of setting id
// User table
exports.User = mongoose.model('Users',userSchema);