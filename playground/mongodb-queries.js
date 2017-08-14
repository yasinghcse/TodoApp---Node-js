const {mongoose}= require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');

var id='598413d4f3ac69c92ac47afc';

Todo.find().then((todos)=>{
  console.log('todos', JSON.stringify(todos,undefined,2));
});

Todo.find({
  _id: id
}).then((todos)=>{
  console.log('todos', JSON.stringify(todos,undefined,2));
});

Todo.findOne({
  _id:id
}).then((todo)=>{
  console.log('todo', JSON.stringify(todo,undefined,2));
});

Todo.findById(id).then((todo)=>{
  if(!todo){
    return console.log('ID not found');
  }
  console.log('todo by Id ', JSON.stringify(todo,undefined,2));
}).catch((e)=>{
console.log('********Errror ******',e);});
