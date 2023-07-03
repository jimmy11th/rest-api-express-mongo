const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs')
const accountSchema = new mongoose.Schema({
    username: {
        required: true,
        type: String,
        unique: true
    },
    password: {
        required: true,
        type: String,
        set(val) {
            return bcrypt.hashSync(val, 10)
        }
    }
})

module.exports = mongoose.model('Account', accountSchema)