var express = require('express');
var app = express();
 
app.use(express.static('public'));
 
//Routes
app.use(require('./routes'));  
 
var server = app.listen(8000, function () {
  console.log("Router app listening at http://localhost:8000")
})