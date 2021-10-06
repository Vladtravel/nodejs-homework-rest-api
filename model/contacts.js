const Contact = require("./schemas/contact");
const listContacts = async () => {
  const results = await Contact.find({});
  return results;
};

const getContactById = async (contactId) => {
  const result = await Contact.findOne({ _id: contactId });
  return result;
};

const removeContact = async (contactId) => {
  const result = await Contact.findByIdAndRemove({
    _id: contactId,
  });
  return result;
};

const addContact = async (body) => {
  // const favoriteDefault = { favorite: false };
  // if (typeof body["favorite"] === "undefined") {
  //   Object.assign(body, favoriteDefault);
  // }
  // const record = { ...body, ...(body.favorite ? {} : { favorite: false }) };
  const result = await Contact.create(record);
  return result;
};

const updateContact = async (contactId, body) => {
  const result = await Contact.findByIdAndUpdate({ _id: contactId }, { ...body }, { new: true });
  return result;
};

const updateStatusContact = async (contactId, favorite) => {
  const result = await Contact.findByIdAndUpdate({ _id: contactId }, { favorite });
  return result;
};
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
