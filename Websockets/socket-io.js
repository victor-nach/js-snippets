// socket.io is a library that enables real-time, bi-directional and event based communication between the browser and the serber
// it consists of a node.js server and a javascript client side library for the browser

// it relies on engine.io which first establishes a long-polling connection, this tries to upgrade to better transports like websocket
// it ships with auto reconnection support except otherwise specified
// disconnection detcetion allows us know when a client or server is no more available

// room support
// this feature allows us send noticifications to a group of users in a room
// sockets can either join or leave the room

// socket.io is not a websocket implementation
// although it uses websocket transportation when possible, a websocket client would not be able to connect to a socket.io server and vice-versa
const client = io.('ws://...') // for example would not work because you are trying to connect to a websocket server

// INSTALLING
// npm install --save socket.io

// a standalone build for the client is exposed by default by the server at /socket.io/socket.io.js
// we can server this from a cdn or usr it from node.js and then use a bundler like webpack or browserify
// npm install --save socket.io-client


// Node,js server
var app = require('http').createServer(handler)
// we pass a server (app) to io
var io = require('socket.io')(app);
var fs = require('fs');

app.listen(80);

function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

// when a client connects to the socket.io we get a socket representing that client
io.on('connection', function (socket) {

  // we can send events that contain data to that client using the emit method
  socket.emit('news', { hello: 'world' });

  // we can also listen to custom events sent from that client
  socket.on('my other event', function (data) {
    console.log(data);
  });
});


// client side

// you can use the cdn, check - https://socket.io/blog/socket-io-2-0-1-2-0-2-and-2-0-3/
// using a cdn
<script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.0.3/socket.io.js"></script>
// get the socket-io library as served from the server
<script src="/socket.io/socket.io.js"></script>
<script>
  var socket = io('http://localhost');
  // we can listn for the 'news' event emmited from the server
  socket.on('news', function (data) {
    console.log(data);
    socket.emit('my other event', { my: 'data' });
  });
</script>

// Namespaces
// you can restrict yourself to namespaces to restrict communications

// Sending volatile messages
// messages that if not sent (maybe because the client is not ready), the app wont suffer
// we use the volatile method before the emit method 
socket.volatile.emit('asdad', adsd)




// SERVER SIDE
// to get a hanldler for a socket.io server we first request the library, then pass a server to it 

// you can do this on one line or seperate lines, it's also not compulsory to bind a server
const io = require('socket.io')();

const server = require('socket-io');

// you can create a server with the http.createServer or use an express server 
cosnt httpServer = http.createServer();
const io = server(httpServer)

// you can also pass an optional options object
const io = server(httpServer, options);
options = {
  // things you can pass inlcude
  weEngine,
  transports, ['polling', 'websocket'],
  pingTimeout,
  .......,
};



// NAMESPAVCES AND ROOMS

// NAMESPACES
// to set up a custom namespace, you have the 'of' function on the server side
// This returns a socket.io server
const nsp = io.of('/my-namespace');

nsp.on('connection', socket => {
  console.log('someone connected');
  nsp.emit('some-event', theData);
});

// on the client-side we just have to add this to the url
const socket = io('/localhost:5000/my-namespace');

// ROOMS 
// Within each namespace, you can also define arbitrary channels that sockets can join
// sockets can join and/or leave rooms, you can call the socket.join method on the socket object returned on the server
// if the room doesn't exist, it is created
io.on('connection', socket => {
  socket.join('some-room')
});

// the individual sockets or the websocket server can emit and broadcast messages to that room using the "to" or "in" methods
io.to('room-name').emit('some-event', theData);

// DEFAULT ROOM
// each socket is identified by a random, unique identifier, and each socket automatically joins a room identified by this id 
// which means that you can send a message directly to this id
io.on
