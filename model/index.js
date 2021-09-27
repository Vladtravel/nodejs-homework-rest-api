const fs = require("fs/promises");
const path = require("path");
const contactsPath = path.join(__dirname, "./contacts.json");

async function parsedContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    return console.error(error.message);
  }
}

const listContacts = async () => {
  const contacts = await parsedContacts();
  console.log("List of contacts: ");
  console.table(contacts);

  return contacts;
};

const getContactById = async (contactId) => {
  const contacts = await parsedContacts();
  const contact = contacts.find(({ id }) => id.toString() === contactId);
  console.table(contact);

  return contact;
};

const removeContact = async (contactId) => {
  const contacts = await parsedContacts();
  const contact = contacts.find(({ id }) => id.toString() === contactId);
  if (!contact) return;
  const newContacts = contacts.filter(({ id }) => id.toString() !== contactId);
  await fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 2), "utf8");

  console.table(newContacts);

  return newContacts;
};

const addContact = async (body) => {
  const contacts = await parsedContacts();

  const id = contacts.length + 1;
  const newContact = { id, ...body };
  const newContacts = [...contacts, newContact];
  await fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 2), "utf8");

  console.table(newContacts);

  return newContacts;
};

const updateContact = async (contactId, body) => {
  if (Object.keys(body).length === 0) {
    return;
  }

  const contacts = await parsedContacts();
  const index = contacts.findIndex(({ id }) => id.toString() === contactId);
  if (index === -1) return;
  contacts[index] = { ...contacts[index], ...body };
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2), "utf8");

  return contacts[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
