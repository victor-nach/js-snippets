// The internet is a peer to peer system, every computer has an IP address and can use the internet to send packets to any other computer on the web
// However the world wide web  (the most popular service on the web) isn't peer to peer at all, 
// instead the would be peers (clients) connect to a special peer called a server

// For WebRTC to create a peer to peer connection between two computers on the web, the computers first need to establish a connection
// This is why we need a server to act as a broker for the initial pairing

// WebRTC need help from the broker to perform 3 tasks
// 1. Pair twoo peers and repare them to connect to each other using offers and answers
// 2. make sure both of them are using the same connection options via a session description
// 3. Figure out how to connect the peers via the ICE protocol


// STARTING THE PROCESS (OFFERS AND ANSWERS)
const broker = myConnectToBroker();

// Both the caller and the callee need a RTCPeerConnection object
var caller = new RTCPeerConnection();

// the caller starts the calling by calling createOffer on its RTCPeerConnection and sending the resulting desc object to the calle through the broker
caller.createOffer(desc => {
    broker.sendOffer(desc);
})

// when the callee receives the message from the broker it creates it own answer to the caller's offer
const broker = myConnectToBroker();
const callee = new RTCPeerConnection();
callee.createAnswer(desc => {});


// SYNCHRONIZING SESSION
// WebRTC uses the RTCSessionDescription object to describe a connection's real-time streaming capabilities
// The desc object passed into the offer/answer callbacks is of type RTCSessionDescription
// Each RTCpeerConnection knows two session descriptions, the local and the remote
// during conenction webrtc requires your app to set both, this is done by calling setLocalDescription and setRemoteDescription, both of which are of the same type

// setLocalDescription(desc, successCallBck, errCallBck);
// the function takes the desc as the first parameter and also a two call back function that would be called on success or error

// during the offer/answer process, both peers must set the local and remote session descriptions on their respective RTCPeerConnection
// the callee's remote description must match the callers local description

// 99% of the time the RTCSession description produced by createOffer or createAnser is acceptable as-is, in this case the app just needs to do two things
// - set the local description using setlocalDescription(desc)
// - send the desc to the other peer which would now also set theri remote description using setRemoteDescription() during answer
caller.createOffer(desc => {
    caller.setLocalDescription(
        desc, 
        () => {
            // send offer using the broker if the local description was succesfully set
            broker.sendOffer(desc)
        }, 
        (err) => {}
    );
});

// when the other pc anwers we get the desc object they sent in their own createAnswer callback
broker.onanswer = (desc) => {

    // we then set that desc sent as our own remoteDescription object
    caller.setRemoteDescription(
        desc,
        ()=>{},
        (err) => {} 
    );
}

// on the callee's side we listen for when an offer is made
broker.onoffer = (desc) => {

    // we also set our remote desc to what was sent in the createOffer
    callee.setRemoteDescription(
        desc,
        // if that was successfull we create our answer
        () => {
            // we create answer using create answer and also get a session description
            caller.createAnswer(desc => {
                // we then set this as our own local description
                callee.setLocalDescription(
                    desc,
                    // on success we send our new local session description as answer via the broker
                    (desc) => { broker.sendAnswer(desc)},
                    (err) => {},
                 );

            })
        },
        (err) => {}
    );
}

// To recap
// 1. The caller call createOffer and receives a desc RTCSessionDescription object
// 2. the caller sets this as it's local description using setLocalDescription
// 3. if this is successful the caller also sends this desc object via the broker as the offer

// 4. the calle receives the desc object via the broker
// 5. the callee sets this as it's remote description using setRemoteDescription(desc)
// 6. the caller then call createAnswer and also receives a desc object
// 7. the callee sets this as it's local description
// 8. the callee also sends this description via the broker as it's answer

// 9. the caller receives this via the broker
// 10. the caller then sets this desc object it received as it's remote description using setLocalDescription

// The callee/caller session descriptions are now completely synchronized


// CHOSING THE CONNECTION METHOD
// After the session descriptions have been synced, webrtc uses the ICE protocol to determine how to establish the connection betweent the peers
// this is part of the setup required to workaround the NAT limitations

// For the ICE contract
// the onicecandidate event of RTCpeerConnection creates an ICE candidate
// The caller/calee then sends this candidate to the other peer via the broker
// Whenever the caller/callee receives a candidate from the broker it adds this candidate to RTCPeerconnection locally by calling RTCPeerConnection.addIceCandidate

// handle the onicecandidate event
caller.onicecandidate = (event) => {
    if(event.candidate) {
        // send the ice candidate to the other peer
        broker.sendIce(event.candidate)
    }
}

broker.onice = (candidate) => {
    // when an ice candidate is received, we add this to the rtcpeerconnection
    caller.addIceCandidate(candidate)
}

// once this negotiation is complete, webrtc automatically connects to the peer using the decided upon connection mechanism


// The BROKER
// the broker object implements a websocket connection to broker server



// using the connection
// with the session description and ICE exchange steps OfflineAudioCompletionEvent, the session is up and ready 
// we can now leverage the conenction for audio, voice and/or data streaming
// one peer creates the stream using its RTCPeerConnection addStream() method for audio/video streams, or createDataChannel() for data streams

// the other peer receives the matching stream via an event from it's rtcpeerconnection onaddstream/ondatachannel event

// since the streams are part of the session description, your app must have called addStream()/createDataChannel() before createOffer() otherwise the stream won't be part of the connection description and the onaddstream/ondatachannel event wont get called on the other peer

