const {SHA256} = require('crypto-js');

var data= {
  id: 10
};

var token= {
  data,
  hash: SHA256(JSON.stringify(data)+'some salt').toString()
};

token.data.id=15;
token.hash= SHA256(JSON.stringify(data)).toString();

var result= SHA256(JSON.stringify(token.data)+'some salt').toString();
if(result === token.hash){
  console.log('Date is correct');
}
else{
  console.log('Data Manipulated ....!!!');
}
