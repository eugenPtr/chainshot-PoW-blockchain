const jayson = require('jayson');
const {PORT} = require("../config");

const minerAddress = "042a1efdfe871b7f08548f9d406e61d3b4f32352373d8444d894747b6d8bbb3c56c9415eb2eef856cad3973903afb7a20b3a91dc0c2eb47fcff3fc9c6d24468bf6"

const client = jayson.Client.http({
  port: PORT
});

client.request('getBalance', [minerAddress], function(err, response) {
  if(err) throw err;
  console.log(response.result); 
});