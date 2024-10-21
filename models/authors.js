const mongoose = require('mongoose');

const AuthorShema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    }
}, { // for created date and updates date
    timestamps: true,
});

module.exports = mongoose.model('Author', AuthorShema);

