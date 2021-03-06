var app = require('express')();
var express = require('express')
var http = require('http').Server(app);
var io = require('socket.io')(http);


app.use(express.static(__dirname, '/'));

app.get('/', function(req, res){
  res.sendFile('index.html');
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg, user){
    console.log('message: ' + msg);
    message = 'said by ' + user + ': '+ msg
    socket.broadcast.emit('chat message', message);
  });
});

io.on('connection', function(socket){
  console.log('a user connected');
  io.emit('user connect');
});



http.listen(3000, function(){
  console.log('listening on *:3000');
});


