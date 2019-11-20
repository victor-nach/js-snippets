// This method prompts the user for permission to use a media input which produces a media stream
// the stream can contain various tracks based on what has been requested for
// it returns a promise that resolves to a mediaStream object
getUserMedia()
// if the user rejects a { NotAllowedError } is returned
// if no matching device is found a { NotFoundError } is returned
// if the user ignores the request, the promise is left hanging and does not resolve or reject

// syntax:
var promise = navigator.mediaDevices.getUserMedia(constraints)
// constraints
// it takes in one parameter which is a mediaStreamConstraints object
// this object contains two properties: video and audio that describe the media types requested 
constraints = { audio: true, video: true }
// at least one of them must be specified
// if bothe are specified and for any reason one can't be included an error would be returned
// if the browser cannot find all the media types (hardware) that support all the media requested for an { NotFoundError } is returned 

// you can't get information about a user's camera, but you can specify preferences
constraints = {
    audio: true,
    video: { width: 1280, height: 720 } // the browser would try to honour this, but may return other resolutions if an exact match isn't found
}

// you can demand for a specific size range using min, max and exact
// if the camera resolution is lower than 1280 by 720, the promise would reject with { OverconstrainedError }
constraints = {
    audio: true,
    video: {
        width: { min: 1280 }, 
        height: { max: 720 } 
    }
}

