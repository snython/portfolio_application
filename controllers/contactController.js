// server/controllers/contact.controller.js

const Contact = require("../models/contactModel");

// Get all contacts
exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching contacts",
      error: error.message,
    });
  }
};

// Get contact by id
exports.getContactById = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact not found",
      });
    }

    res.status(200).json({
      success: true,
      data: contact,
    });
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(400).json({
        success: false,
        message: "Invalid contact ID format",
      });
    }
    res.status(500).json({
      success: false,
      message: "Error fetching contact",
      error: error.message,
    });
  }
};

// Add new contact
exports.createContact = async (req, res) => {
  try {
    const { firstname, lastname, email } = req.body;

    // Check if contact with email already exists
    const existingContact = await Contact.findOne({ email });
    if (existingContact) {
      return res.status(400).json({
        success: false,
        message: "Contact with this email already exists",
      });
    }

    const contact = new Contact({
      firstname,
      lastname,
      email,
    });

    const savedContact = await contact.save();

    res.status(201).json({
      success: true,
      message: "Contact created successfully",
      data: savedContact,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        error: error.message,
      });
    }
    res.status(500).json({
      success: false,
      message: "Error creating contact",
      error: error.message,
    });
  }
};

// Update contact by id
exports.updateContactById = async (req, res) => {
  try {
    const { firstname, lastname, email } = req.body;

    // Check if email is being changed and if new email already exists
    if (email) {
      const existingContact = await Contact.findOne({
        email,
        _id: { $ne: req.params.id },
      });
      if (existingContact) {
        return res.status(400).json({
          success: false,
          message: "Another contact with this email already exists",
        });
      }
    }

    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { firstname, lastname, email },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Contact updated successfully",
      data: contact,
    });
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(400).json({
        success: false,
        message: "Invalid contact ID format",
      });
    }
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        error: error.message,
      });
    }
    res.status(500).json({
      success: false,
      message: "Error updating contact",
      error: error.message,
    });
  }
};

// Remove contact by id
exports.deleteContactById = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Contact deleted successfully",
      data: contact,
    });
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(400).json({
        success: false,
        message: "Invalid contact ID format",
      });
    }
    res.status(500).json({
      success: false,
      message: "Error deleting contact",
      error: error.message,
    });
  }
};

// Remove all contacts
exports.deleteAllContacts = async (req, res) => {
  try {
    const result = await Contact.deleteMany({});

    res.status(200).json({
      success: true,
      message: `${result.deletedCount} contacts deleted successfully`,
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting all contacts",
      error: error.message,
    });
  }
};
