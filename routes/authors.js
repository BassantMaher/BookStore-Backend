const express = require("express");

const router = express.Router();

const userController = require("../controller/authors");

router.get("/users", userController.getUsers);

router.get("/users/:id", userController.getUser); 


/***
 * @desc   add a user
 * @route  POST /newuser
 * @access public
 */

router.post("/newuser", userController.addUser);

/***
 * @desc   update a user
 * @route  PUT /users/:id
 * @access public
 */

router.put("/users/:id", userController.UpdateUser);

/***
 * @desc   delete a user
 * @route  DELETE /users/:id
 * @access public
 */

router.delete("/users/:id", userController.deleteUser);


module.exports = router;