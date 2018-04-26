const express = require('express');
const User = require('../../lib/models/user');


const userRouter = express.Router();

// GET  retrive user list
userRouter.get('/users', (req, res, next) => {
    User.find(function (error, users) {
        res.json(users);
    })
});

// POST  add user
userRouter.post('/user', (req, res, next) => {
    let newUser = new User({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        phone: req.body.phone,
        email: req.body.email,
        password: req.body.password

    });
    newUser.save((error, user) => {
        if (error) {
            res.json({ msg: 'Faild to add User' });
        } else {
            res.json({ msg: 'User added successfully' });
        }
    });

});

// Delete User 
userRouter.delete('/user/:id', (req, res, next) => {
    User.remove({ _id: req.params.id }, function (error, result) {
        if (error) {
            res.json(error);
        } else {
            res.json(result);
        }
    });
});

 module.exports = userRouter;