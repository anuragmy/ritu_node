const mogoose = require("mongoose")

const ContactSchema = new mogoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  contactNumber: {
    type: String,
    required: true,
  }
});

const Contact = mogoose.model("Contacts", ContactSchema)
module.exports = Contact