const express = require("express");
const logger = require('./middleware/logger');
const { notFound, errorHandler } = require('./middleware/errors');

const dotenv = require("dotenv");

dotenv.config();

const app = express();

const booksRoute = require("./routes/books"); 
const userRoute = require("./routes/authors");

const mongoose = require("mongoose");



// connect to the DB server
mongoose.connect(process.env.MONGO_URI)
.then(result => {
    // run the server
    app.listen(process.env.PORT || 3000 , () => console.log("server is running on port 3000"));
})
.catch(err => console.error(err));

// use json middleware
app.use(express.json());
app.use(logger);

app.use(errorHandler);
app.use(notFound);

app.use(booksRoute);
app.use(userRoute);

// run the server
// app.listen(3000, () => console.log("server is running on port 3000"));