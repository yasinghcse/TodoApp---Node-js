const {MongoClient,ObjectId} = require('mongodb');
MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
  if(err){
    return console.log('Unable to connect to ');
  }
  console.log('Connection created with server');

  // db.collection('Todos').deleteMany({
  //   text : 'Walking'
  // }).then((result)=>{
  //   console.log(result);
  // });

  // db.collection('Todos').deleteOne({
  //   completed : true
  // }).then((result)=>{
  //   console.log(result);
  // });

  db.collection('Todos').findOneAndDelete({
    _id: new ObjectId("5982466cd6d2cd662b8f5e97")
  }).then((result)=>{
    console.log(result);
  });

  db.close();
});
