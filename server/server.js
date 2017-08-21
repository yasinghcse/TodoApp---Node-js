require('./config/config');

var express = require('express');
var bodyParser= require('body-parser');
var {mongoose}= require('./db/mongoose');
const _ = require('lodash');
var {ObjectID}= require('mongodb');
var {Todo}= require('./models/todo');
var {User}= require('./models/user');

var app= express();
app.use(bodyParser.json());
const port = process.env.PORT;

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

//delete todo note
app.delete('/todos/:id',(req,res)=>{
  var id=req.params.id;

  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }

  console.log(id);
  Todo.findByIdAndRemove(id).then((todo)=>{
    if(!todo){
      return res.status(404).send();
    }
    return res.send({todo});
  }).catch((e)=>{
    return res.status(404).send(e);
  });
});

//update the todo list
app.patch('/todos/:id',(req,res)=>{
  var id=req.params.id;
  var body = _.pick(req.body,['text','completed']);

  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }

  //console.log(`----${JSON.stringify(req.body,undefined,2)} ----`);
  //console.log(`----${_.isBoolean(body.completed)} &&  ${body.completed}----`);
  if(_.isBoolean(body.completed)&& body.completed){
    body.completedAt= new Date().getTime();
  }
  else{
    body.completedAt=null;
    body.completed=false;
  }

  Todo.findByIdAndUpdate(id,{ $set: body},{new: true}).then((todo)=>{
    if(!todo){
      return res.status(404).send();
    }
    return res.send({todo});
  }).catch((e)=>{
    return res.status(404).send();
  });
});

//post request for user save
app.post('/user',(req,res)=>{
  var body = _.pick(req.body,['email','password']);
  var user = new User(body);

  user.save({body}).then(()=>{
    return user.generateAuthToken();
  }).then((token)=>{
    res.header('x-auth',token).send(user);
  }).catch((e)=>{
    res.status(404).send(e);
  })
});

app.listen(port,()=>{
  console.log(`Listing at port ${port}`);
});

module.exports={app};
