const { ref, required } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookShema = new Schema({
    title: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 255
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Author'
    },
    description: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 255
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    cover: {
        type: String,
        required: true,
        enum: ["soft cover", "hard cover"]
    }
});

module.exports = mongoose.model('Book',bookShema);