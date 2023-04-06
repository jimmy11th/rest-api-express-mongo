const mongoose = require('mongoose');

const HeroSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    id: {
        required: true,
        type: Number
    },
    level: {
        required: true,
        type: Number,
    }
})

module.exports = mongoose.model('Hero', HeroSchema)