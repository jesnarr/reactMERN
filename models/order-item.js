const mongoose = require('mongoose');

const orderItemSchema = mongoose.Schema({
    quantity:{
        type: Number,
        required: true
    },
    product:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }

});

// add virtual id or copy of _id
// set _id to id
orderItemSchema.virtual('id').get(function ()
{
    return this._id.toHexString();
});

orderItemSchema.set('toJSON', {
    virtuals: true,
});
// end of setting id

exports.OrderItem = mongoose.model('OrderItem',orderItemSchema);
