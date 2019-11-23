navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
    console.log('user accepted')
    let mediaRecorder = new MediaRecorder(stream);
    console.log(mediaRecorder.state)
    mediaRecorder.start()
    console.log(mediaRecorder.state)



    // when receiving stream, it's till you stop it that the data becomes available
    setTimeout( () => { mediaRecorder.stop() }, 3000)

    var chunks = [];
    mediaRecorder.ondataavailable = e => {
        console.log(e.data)
        chunks.push(e.data);
        console.log('data is available');
    }

    mediaRecorder.onstop = e => {
        console.log('recording stop')
        // var clipName = prompt("enter clip name")
        // save the chunks inside a blob 
        // the chunk is a blob itself, so now we have an array of a single blob
        var blob = new Blob(chunks, { 'type' : 'audio/ogg; codecs=opus' });

        //empty the chunks 
        chunks = []
        
        let downloadUrl = window.URL.createObjectURL(blob);
        document.write(downloadUrl);
    }

}).catch(err => {
    console.log('err:', err )
});