const express = require("express");
const router = express.Router();

const { validateContact, validateFavorite } = require("./validation");
const contactsController = require("../../controllers/contacts");

router.get("/", contactsController.listContacts).post("/", validateContact, contactsController.addContact);

router
  .get("/:contactId", contactsController.getContactById)
  .delete("/:contactId", contactsController.removeContact)
  .patch("/:contactId", validateContact, contactsController.updateContact)
  .patch("/:contactId/favorite", validateFavorite, contactsController.updateStatusContact);

module.exports = router;
