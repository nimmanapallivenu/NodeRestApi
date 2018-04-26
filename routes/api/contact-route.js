const express = require('express');
const Contact = require('../../lib/models/contact');


const contactRouter = express.Router();

// GET Method retrive datta constacts
contactRouter.get('/contacts', (req, res, next) => {
    Contact.find(function (error, contacts) {
        res.json(contacts);
    })
});

// POST Method add contacts
contactRouter.post('/contact', (req, res, next) => {
    let newContact = new Contact({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        phone: req.body.phone,

    });
    newContact.save((error, contact) => {
        if (error) {
            res.json({ msg: 'Faild to add Contact' });
        } else {
            res.json({ msg: 'Contact added successfully' });
        }
    });

});

// Delete Method delete contact
contactRouter.delete('/contact/:id', (req, res, next) => {
    Contact.remove({ _id: req.params.id }, function (error, result) {
        if (error) {
            res.json(error);
        } else {
            res.json(result);
        }
    });
});

 module.exports = contactRouter;