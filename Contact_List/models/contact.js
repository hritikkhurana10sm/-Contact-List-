//here we are setting the basic schema in which data should be stored

//this is the basic schema in which we want to store our data
const mongoose = require('mongoose');

//include the schema in which pattern we want our data
const contactSchema = new mongoose.Schema({

    name: {
        type : String,
        required : true
    },
    phone: {
        type : String ,
        required : true
    } 

});

//this is the step of compiling out schema into a Model
const Contact = mongoose.model('Contact', contactSchema);

//exporting
module.exports = Contact;