require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const Task=require("./model/task");

// express app
const app = express();

// connect to mongodb & listen for requests
const dbURI=process.env.dbURI;

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result =>app.listen(3000))
  .catch(err => console.log(err));

// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));


// routes

//create
app.get("/create",(req,res)=>{
const task=new Task({
description:"HEllo WOrld3",
completed: false
});
task.save()
.then(result=>{
    res.send(result)
})
.catch(err=>{
    console.log(err);
});
});

//read
app.get("/read",(req,res)=>{
   Task.find({completed:false})
    .then(result=>{
        res.send(result)
        console.log(result);
    })
    .catch(err=>{
        console.log(err);
    });
    });

// update
app.get("/update",(req,res)=>{
    Task.updateMany({completed:true})
     .then(result=>{
         res.send(result)
     })
     .catch(err=>{
         console.log(err);
     });
     });

// delete
app.get("/delete",(req,res)=>{
    
    Task.deleteOne({id:"61655cfbac38be0bd0cc9304"})
     .then(result=>{
         res.send(result) 
     })
     .catch(err=>{
         console.log(err);
     });
     });