// Provides access to connected media input devices like cameras and microphones, as well as screen sharing.
// It gives you access to any source of hardware media data
MediaDevices

// the devicechange event is fired whenever a media input device is attached or removed
ondevicechange

// used for display
// prompts the user to select a { display } or portion of a display to capture and pass as a media stream
// for sharing or recording purposes. returns a promise that resolves to a media stream
getDisplayMedia()

// used for media like video from a camera or sound from a microphone
// turns on the devices after user give permission
// provides a media stream, containing a video and/or audio track with the input
getUserMedia()