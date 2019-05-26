const mongoose = require('mongoose')

const movieSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    poster: {
        type: String,
        required: true
    },
    rating: {
        type: String,
        required: true
    },
    introduction: {
        type: String,
        required: true
    },
    meta: {
        createdAt: {
            type: Date,
            default: Date.now()
        },
        updatedAt: {
            type: Date,
            default: Date.now()
        }
    }
})
module.exports = mongoose.model('Movie', movieSchema, 'Movie')