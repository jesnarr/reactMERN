const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    icon: {
        type: String
    },
    color:{
        type: String
    }
});

// mongoose.pluralize(null); remove plural database
exports.Category = mongoose.model('Category',categorySchema);