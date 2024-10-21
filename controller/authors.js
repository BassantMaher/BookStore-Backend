const joi = require("joi");

const Author = require('../models/authors');

// const users = [{
//     name: "ahmed",
//     id: 1,
//     age:10
// }, {
//     name: "ali",
//     id: 2,
//     age:26
// }]

exports.getUsers = (req, res, next) => {
    Author.find()
    .sort({firstName: 1})
    .then(users => {
        if(!users){
            return res.status(500).json({
                message: "no users found in DB"
            });
        }
        return res.status(200).json({
            users: users
        });
    })
    .catch(err => console.log(err));
    
};

exports.getUser = (req, res, next) => {
    const UserId = req.params.id;
    Author.findById(UserId)
    .then(user => {
        if (!user) {
            return res.status(404).json({
                message: "user not found"
            })
        }
        return res.status(200).json(user);
    })
    .catch(err => console.log(err));
    
};

exports.addUser = (req, res, next) => {

    const schema = joi.object({
        firstName: joi.string().min(3).required(),
        lastName: joi.string().min(3).required()
    });

    const {error} = schema.validate(req.body);
    if(error){
        return res.status(400).json({errorMessage: error.details[0].message});
    }

    const author = new Author({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    });
    author.save()
    .then(result => {
        res.status(201).json({
            authors: result,
            message: "user added succesfully"
        });
    })
    .catch(err => console.log(err)); 
};

exports.UpdateUser = (req, res, next) => {
    const UserId = req.params.id;

    const schema = joi.object({
        firstName: joi.string().min(3).required(),
        lastName: joi.string().min(3).required()
    });
    const {error} = schema.validate(req.body);
    if(error) {
        return res.status(400).json({errorMessage: error.details[0].message});
    }

    Author.findByIdAndUpdate(UserId, {$set: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        image: req.body.image
    }}, {new: true}) // wel new di 3ashan el response yraga3ly el updated mesh el adim
    .then(user => {
        if(!user){
            return res.status(404).json({message: "user not found"});
        }
        return res.status(200).json({
            author: user,
            message: "user updated successfully!!"
        });
    })
    .catch(err => console.log(err));
};

exports.deleteUser = (req, res, next) => {
    const UserId = req.params.id;
    Author.findByIdAndDelete(UserId)
    .then(user => {
        if(!user){
            return res.status(404).json({message: "user not found"});
        }
    })
    .then(result => {
        return res.status(200).json({
            authors: result,
            message: "user deleted successfully!!"
        });
    })
    .catch(err => console.log(err));
};
