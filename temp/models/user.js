var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserrSchema = new Schema({
    id:String,
    name: String
})

module.exports = mongoose.model('User', UserrSchema);