var express = require('express');
var mongoose = require('mongoose')
var bodyparser= require('body-parser')
var cors = require('cors')
var path =require('path')


var app =express();

// port number
const port =3000;
// hostname
const hastname ='localhost';

// connect mongo db
mongoose.connect('mongodb://localhost:27017/restapi');

// Mongo DB connected
mongoose.connection.on('connected',()=>{
console.log('Mongo DB connected port @27017');
});

// Mongo DB got any error
mongoose.connection.on('error',(error)=>{
    if(error) console.log('Mongo DB got an error',error);
 });

const contactRouter =require('./routes/api/contact-route');
const userRouter =require('./routes/api/user-route');

// cors enable
app.use(cors());

// body parser enable
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false}));

// routes
app.use('/api/v1/',contactRouter,userRouter);


// catch 404 and forward to error handler
  app.use(function (req, res, next) {
    res.status(404).json("Sorry can't find that!");
  });
 
 // error handlers
 // Internal server
  app.use(function(err, req, res, next) {
    res.status(500).json(err);
  });

  // Bad Request
  app.use(function(err, req, res, next){
    res.status(400).json(err);
  });
  

// app server configurations
app.listen(port,hastname,()=>{
    console.log('Server started At: '+port);
})
