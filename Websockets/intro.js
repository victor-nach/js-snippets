// Websockets are a way to comunicate between a client and a server
// the flow of communication is bi-directional and the web sockets are always open which allows for real-time data flow 

// when we open a chat application, we open a web socket channel from the browser to the server
// and all the browsers conected all have their own websocket connection to the server as well
// which means data can flow in real time because the sockets are always open

// the requests are happening in real time, we do not need any ajax or any additional request mechanism to make the requests

// For http requests, when you send a request, a connection is opened up, and once a response is received, the connection is closed
// http is bi-directional, while http is unidirectional the sending of data is oneway
// websockets use ws://... or wss://....

// for a websocket connection
// there is an initial handshake, between the client and the server
// once the connection is opened it is left open until it is no more needed and then closed
