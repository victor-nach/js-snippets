// on the client side we can use the websocket class natively

// takes in two parameters, a url and an optional parameter
websocket = new WebSocket(url, {})
// the url is the url it is suposed to connect to and get a response
// the url should use a ws://.. or wss://..

// the protocal can either be a single protocol or a string of protocols to be used

// If an error occurs while attempting to connect, an error event is sent to the websocket object, and it onerror handler is invoked
// then after that the closeEvent is also sent which also in turn invokes the onclose handler

// example
const exampleSocket = new WebSocket('wss://example.com/socketserver', 'protocolOne')

// SENDING DATA
// 
// once youve opened a connection, to send data we just need to use the send() method on the websocket object

exampleSocket.send('heres some text that we urgently want to send to the server')
// you an send data as a string, blob or an array buffer.

// establishing a connection is asynchronous, there is no guarantee that calling a send immediateley after creating a webSocket would be successful
// we can cater for this by listening on the onopen event before sending any data

exampleSocket.onopen = event => {
    exampleSocket.send('this message gets sent only when a connectino is open');
};

// we can also use JSON to send data, we just have to also stringify it before sending it

// Web sockets is an event-driven API, when messages are received, a message event is sent to the websocket object
// we can handle it by listening for the onmessage event
exampleSocket.onmessage = event => {
    console.log(event.data)
}

// to close the connection we use the .close method
exampleSocket.close();
