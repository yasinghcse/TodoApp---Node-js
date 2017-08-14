var express = require('express');
var bodyParser= require('body-parser');
var {mongoose}= require('./db/mongoose');
var {ObjectID}= require('mongodb');
var {Todo}= require('./models/todo');
var {User}= require('./models/user');

var app= express();
app.use(bodyParser.json());

//creating a todo Doc
app.post('/todos',(req,res)=>{
  var todo = new Todo({
    text: req.body.text
  });
  todo.save().then((doc)=>{
    res.send(doc);
  },(e)=>{
    res.status(400).send(e);
  });
});

//fetching all todos docs
app.get('/todos',(req,res)=>{
  Todo.find().then((todos)=>{
    res.send({todos});
  },(e)=>{
    res.status(400).send(e);
  });
});

//fetch one todo by id
app.get('/todos/:id',(req,res)=>{
  var id=req.params.id;
  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }
  Todo.findById(id).then((todo)=>{
    if(!todo){
        return res.status(404).send();
    }
      return res.send({todo});
  }).catch((e)=>{
    return res.status(404).send();
  });
});

app.listen(3000,()=>{
  console.log('Listing at port 3000');
});

module.exports={app};
