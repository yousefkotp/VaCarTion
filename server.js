const express = require("express");
const path = require('path');
const port ="3000" || process.env.PORT
const mysql= require("mysql");
const app = express();

app.use(express.urlencoded({extended:true}));
//app.use(express.static(path.join(__dirname +'/public')));

var dp = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'password',
    database : 'registration',
  });

dp.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });



app.listen(port,()=>{
    console.log("Started server on port: "+port)
});