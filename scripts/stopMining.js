const jayson = require('jayson');
const {PORT} = require("../config");

const client = jayson.Client.http({
  port: PORT
});

client.request('stopMining', [], function(err, response) {
  if(err) throw err;
  console.log(response.result); 
});