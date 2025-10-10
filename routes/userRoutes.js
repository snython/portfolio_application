const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Create a new User
router.post("/", userController.create);

// Retrieve all Users
router.get("/", userController.findAll);

// Retrieve a single User with id
router.get("/:id", userController.findOne);

// Update a User with id
router.put("/:id", userController.update);

// Delete a User with id
router.delete("/:id", userController.delete);

// Delete all Users
router.delete("/", userController.deleteAll);

module.exports = router;
