const {SHA256} = require('crypto-js');
const bcrypt= require('bcryptjs');

var password= '123';
bcrypt.genSalt(10,(err,salt)=>{
  bcrypt.hash(password,salt,(err, hash)=>{
    console.log(hash);
  });
});

var hashedPassword='$2a$10$YN95KzBuO0SuJjb8uZ.RG..Op/Xn6lcBSFK45sMyvigLyfKETUoAq';
bcrypt.compare(password,hashedPassword,(err,res)=>{
  console.log(res);
});

// var data= {
//   id: 10
// };
//
// var token= {
//   data,
//   hash: SHA256(JSON.stringify(data)+'some salt').toString()
// };
//
// token.data.id=15;
// token.hash= SHA256(JSON.stringify(data)).toString();
//
// var result= SHA256(JSON.stringify(token.data)+'some salt').toString();
// if(result === token.hash){
//   console.log('Date is correct');
// }
// else{
//   console.log('Data Manipulated ....!!!');
// }
