const express = require("express");
const mongoose = require("mongoose");
const app = express()
const cors = require("cors")
const ContactModel = require("./model/contact.js")

mongoose.Promise = global.Promise;

app.use(express.json());
app.use(cors())

mongoose.connect(
  "mongodb+srv://12345678pass:12345678pass@cluster0.yqfl0.mongodb.net/contactManagerApp?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
  }
);

app.get("/read", async(req,res) => {
  ContactModel.find({}, (err,result) => {
    if(err)
    {
      res(err)
    }
    res.send(result)
  })
})

app.post("/insert", async(req, res) => {
  const id = req.body.id
  const name =  req.body.name
  const email = req.body.email
  const contactNumber = req.body.contactNumber

  const contact = new ContactModel(
    {
      name: name,
      email: email,
      contactNumber: contactNumber
    }
  );

  try{
    await contact.save();
  }
  catch(err)
  {
    console.log(err);
  }
});

app.put("/update", async(req, res) => {
  const id = req.body.id
  const newName =  req.body.name
  const newEmail = req.body.email
  const newContactNumber = req.body.contactNumber

  try{
    await ContactModel.findById(id, (err, updatedContact)=> {
      updatedContact.name = newName
      updatedContact.email = newEmail
      updatedContact.contactNumber = newContactNumber
      updatedContact.save()
      res.send("update")
    })
  }
  catch(err)
  {
    console.log(err);
  }
});

app.listen(3001, () => {
  console.log("server running on port 3001");
})