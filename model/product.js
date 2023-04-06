const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    id: {
        required: true,
        type: Number
    },
    price: {
        required: true,
        type: Number,
    },
    imgUrl: {
        required: true,
        type: String,
    }
})

module.exports = mongoose.model('Product', ProductSchema)