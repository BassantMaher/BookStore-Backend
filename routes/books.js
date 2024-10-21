const express = require("express");

const router = express.Router();

const booksController = require("../controller/books");

/***
 * @desc   get all books
 * @route  GET /books
 * @access public
 */

router.get("/books", booksController.getBooks);

router.get("/books/:id", booksController.getBook); 


/***
 * @desc   add a book
 * @route  POST /newbook
 * @access public
 */

router.post("/newbook", booksController.addBook);

/***
 * @desc   update a book
 * @route  PUT /books/:id
 * @access public
 */

router.put("/books/:id", booksController.updateBook);

/***
 * @desc   delete a book
 * @route  DELETE /books/:id
 * @access public
 */

router.delete("/books/:id", booksController.deleteBook);

module.exports = router;