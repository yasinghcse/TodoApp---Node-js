const MongoClient = require('mongodb').MongoClient;
MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
  if(err){
    return console.log('Unable to connect to ');
  }
  console.log('Connection created with server');

  db.collection('Todos').insertOne({
    text: 'Something',
    completed: false
  },(err, result)=>{
    if(err){
      return console.log('Unable to insert to Todos',err);
    }
    console.log(JSON.stringify(result.ops,undefined, 2));
  });

  db.collection('Users').insertOne({
    name: 'Andriod',
    age: 25,
    location: 'Windsor'
  }, (err, result)=>{
    if(err){
      return console.log('Unable to insert to Users',err);
    }
    console.log(result.ops);
  });

  db.close();
});
