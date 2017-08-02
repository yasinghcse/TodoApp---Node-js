const {MongoClient,ObjectId} = require('mongodb');
MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
  if(err){
    return console.log('Unable to connect to ');
  }
  console.log('Connection created with server');

  db.collection('Todos').find({
  //_id: new ObjectId('59823852d6d2cd662b8f5d5a')
  }).toArray().then((docs)=>{
    console.log('Todos');
    console.log(JSON.stringify(docs, undefined, 2));
  },(err)=>{
    console.log(`Unable to connect : ${err}`);
  });
  // db.collection('Users').find({
  //   name: 'Andriod'
  // }).toArray().then((docs)=>{
  //   console.log('Users');
  //   console.log(JSON.stringify(docs, undefined, 2));
  // },(err)=>{
  //   console.log(`Unable to connect : ${err}`);
  // });

  // db.collection('Todos').find().count().then((count)=>{
  //   console.log(`Todos count : ${count}`);
  // },(err)=>{
  //   console.log(`Unable to connect : ${err}`);
  // });



  db.close();
});
