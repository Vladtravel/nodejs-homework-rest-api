const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const contactsScheme = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    phone: {
      type: String,
      required: [true, "Phone is required"],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret._id;
        return ret;
      },
    },
  }
);

contactsScheme.virtual("status").get(function () {
  if (this.favorite) {
    return "favorite contact";
  }

  return "not favorite contact";
});

const Contact = model("contact", contactsScheme);
module.exports = Contact;
