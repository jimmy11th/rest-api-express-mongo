var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CartSchema = new Schema({
    owner: String,
    num: Number,
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Product'
    }
})

module.exports = mongoose.model('Cart', CartSchema);