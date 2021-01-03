const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    orderItems:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'OrderItem',
        required:true
    }],
    shippingAddress1:{
        type: String,
        required: true
    },
    shippingAddress2:{
        type: String
    },
    city:{
        type: String,
        required: true
    },
    zip:{
        type: String,
        required: true

    },
    country:{
        type: String,
        required: true

    },
    phone: {
        type: String,
        required: true

    },
    status:{
        type: String,
        required: true,
        default: 'Pending'
    },
    totalPrice:{
        type: Number
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    dateOrdered:{
        type: Date,
        default: Date.now
    }

});

// add virtual id or copy of _id
// set _id to id
orderSchema.virtual('id').get(function ()
{
    return this._id.toHexString();
});

orderSchema.set('toJSON', {
    virtuals: true,
});
// end of setting id

exports.Order = mongoose.model('Order',orderSchema);