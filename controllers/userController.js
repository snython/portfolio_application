const User = require("../models/userModel");

// Create and Save a new User
const create = (req, res) => {
  // Validate request
  if (!req.body.name || !req.body.email || !req.body.password) {
    return res.status(400).send({
      message: "User content can not be empty",
    });
  }

  // Create a User
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  // Save User in the database
  user
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the User.",
      });
    });
};

// Retrieve all Users from the database
const findAll = (req, res) => {
  User.find()
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving users.",
      });
    });
};

// Find a single User with an id
const findOne = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: "User not found with id " + req.params.id,
        });
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "User not found with id " + req.params.id,
        });
      }
      return res.status(500).send({
        message: "Error retrieving user with id " + req.params.id,
      });
    });
};

// Update a User identified by the id in the request
const update = (req, res) => {
  // Validate Request
  if (!req.body.name || !req.body.email || !req.body.password) {
    return res.status(400).send({
      message: "User content can not be empty",
    });
  }

  // Find user and update it with the request body
  User.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      updated: Date.now(),
    },
    { new: true }
  )
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: "User not found with id " + req.params.id,
        });
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "User not found with id " + req.params.id,
        });
      }
      return res.status(500).send({
        message: "Error updating user with id " + req.params.id,
      });
    });
};

// Delete a User with the specified id in the request
const deleteOne = (req, res) => {
  User.findByIdAndRemove(req.params.id)
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: "User not found with id " + req.params.id,
        });
      }
      res.send({ message: "User deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "User not found with id " + req.params.id,
        });
      }
      return res.status(500).send({
        message: "Could not delete user with id " + req.params.id,
      });
    });
};

// Delete all Users from the database
const deleteAll = (req, res) => {
  User.deleteMany({})
    .then(() => {
      res.send({ message: "All users deleted successfully!" });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all users.",
      });
    });
};

module.exports = {
  create,
  findAll,
  findOne,
  update,
  delete: deleteOne,
  deleteAll,
};
