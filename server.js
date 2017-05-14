var path = require('path');
var http = require('http');
var express = require('express');

var app = new express();

app.use(express.static(__dirname + '/build'));
app.get('*', function response(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(3031, () => {
  console.log('Server is listening on 3031 port');
}); 