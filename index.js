const express = require("express");
const mongoose = require("mongoose");
const Contact = require("./Models/Contact");

require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 5000;

mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Data Base Connected");
    })
    .catch((e) => {
        console.log("Error", e);
    });
 // Add new Contact
const addContact = async (name, age, favoriteFoods) => {
    const contact = await Contact.create({ name, age, favoriteFoods });
 };


// Add Contact
 
// addContact("rania",10,"sandwitch")
// addContact("sarra",30,"salade")
// addContact("mariem",16,"pizza")


//Find all Contact
const FindContact = async () => {
    const contact = await Contact.find({});
    console.log(contact);
};
//FindContact()
//show me All contact

//Find Contact

const FindContact = async (fav) => {
    const contact = await Contact.find({ FavoriteFoods: fav });
    console.log(contact);
};
//FindContact("pizza")
 

//Find contact By ID
const FindbyID = async (id) => {
    const contact = await Contact.findById(id).exec();
    console.log(contact);
};
//FindbyID("6219f4d3b85f4e14772ef126")

// Update Contact
 
const Update = async () => {
    const contact = await Contact.findOneAndUpdate(
        { name: "mariem", age: 16 },
        { name: "mariem2", age: 23 },
        { new: true }
    );

 };
//Update();

// Delete One Persone By ID 

const DeleteContact = async (id) => {
    const contact = await Contact.findByIdAndDelete(id);
 };

//DeleteContact("6219f4d3b85f4e14772ef126")

//Delete Many Contacts

const DeleteContacts = async () => {
    const contacts = await Contact.deleteMany({ Name: "mariem" })
      
};
//DeleteContacts("mariem2")

//Search with FavoriteFood

const FindFood = async (food) => {
    const contact = await Contact.find({ FavoriteFoods: food })
        .limit(2)
        .sort({ Name: 1 })
        .select({ Age: false })
        .exec((err, Data) => {
            console.log("CONTACT FOOD");
            if (err) {
                console.log(err);
            } else console.log(Data);
        });
    console.log(contact);
};
FindFood("burritos");

app.listen(PORT, () => console.log(`SERVER STARTED ON PORT ${PORT}`));
