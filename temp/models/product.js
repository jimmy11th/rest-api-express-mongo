var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductSchema = new Schema({
    name: String,
    level: String,
    price: String,
    description: String,
    image: String
})

module.exports = mongoose.model('Product', ProductSchema);