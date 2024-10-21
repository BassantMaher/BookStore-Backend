const joi = require("joi");

const Book = require('../models/Books');

// const books = [{
//     name: "book1",
//     id: 1
// }, {
//     name: "book2",
//     id: 2
// }]

exports.getBooks = (req, res, next) => {
    Book.find()
        .then(books => {
            if (!books) {
                return res.status(500).json({
                    message: "no books available"
                });
            }
            res.status(200).json({
                books: books
            });
        })
        .catch(err => console.log(err));
};

exports.getBook = (req, res, next) => {
    const bookId = req.params.bookId;
    Book.findById(bookId)
        .then(book => {
            if (!book) {
                return res.status(404).json({
                    message: "book not found"
                })
            }
            return res.status(200).json({
                book: book
            });
        })
        .catch(err => console.log(err));
};

exports.addBook = (req, res, next) => {

    // const schema = joi.object({
    //     title: joi.string().min(3).required()
    // });

    // const {error} = schema.validate(req.body);
    // if(error){
    //     return res.status(400).json({errorMessage: error.details[0].message});
    // }

    const newBook = new Book({
        title: req.body.title,
        author: req.body.author,
        description: req.body.description,
        price: req.body.price,
        cover: req.body.cover,
    });

    newBook.save()
        .then(result => {
            return res.status(201).json({
                books: result,
                message: "book added succesfully"
            });
        })
        .catch(err => console.log(err));
};

exports.updateBook = (req, res, next) => {
    const bookId = req.params.bookId;
    Book.findByIdAndUpdate(bookId,
        {
            $set: {
                title: req.body.title,
                author: req.body.author,
                price: req.body.price,
                description: req.body.description,
                cover: req.body.cover
            }
        },
        { new: true })
        .then(book => {
            if (!book) {
                return res.status(404).json({ message: "book not found" });
            }
            return res.status(200).json({
                books: book,
                message: "book updated successfully!!"
            });
        })
        .catch(err => console.log(err));
};

exports.deleteBook = (req, res, next) => {
    const bookId = req.params.bookId;
    Book.findByIdAndDelete(bookId)
    .then(book => {
        if(!book){
            return res.status(404).json({
                message: "book not found"
            });
        }
        return res.status(200).json({
            books: book,
            message: "book deleted successfully!!"
        });
    })
    .catch(err => console.log(err));
};