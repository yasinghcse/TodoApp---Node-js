const {MongoClient,ObjectId} = require('mongodb');
MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
  if(err){
    return console.log('Unable to connect to ');
  }
  console.log('Connection created with server');

  // db.collection('Todos').findOneAndUpdate({
  //   _id: new ObjectId("5982458cd6d2cd662b8f5e51")
  // },{
  //   $set: {
  //     completed: true
  //   }
  // },{
  //   returnOriginal : false
  // }).then((res)=>{
  //   console.log(res);
  // });

  db.collection('Users').findOneAndUpdate({
    _id: new ObjectId("59823963d6d2cd662b8f5d95")
  },{
    $inc:{
      age:1
    }
  },{
    returnOriginal: false
  }).then((res)=>{
    console.log(res);
  });
  db.close();
});
