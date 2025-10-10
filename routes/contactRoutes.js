// server/routes/contact.routes.js

const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contactController");

// GET all contacts
router.get("/", contactController.getAllContacts);

// GET contact by id
router.get("/:id", contactController.getContactById);

// POST add new contact
router.post("/", contactController.createContact);

// PUT update contact by id
router.put("/:id", contactController.updateContactById);

// DELETE remove contact by id
router.delete("/:id", contactController.deleteContactById);

// DELETE remove all contacts
router.delete("/", contactController.deleteAllContacts);

module.exports = router;
