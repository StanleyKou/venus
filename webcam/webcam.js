
var constraints = {video: true};

var captureVideoButton = document.querySelector('#capture-button');
var screenshotButton = document.querySelector('#screenshot-button');
var stopButton = document.querySelector('#stop-button');
var downloadButton = document.querySelector('#btn-download');
var img = document.querySelector('#screenshot img');
var video = document.querySelector('#screenshot video');
var canvas = document.createElement('canvas');

captureVideoButton.onclick = function() {
    navigator.mediaDevices.getUserMedia(constraints).
    then(handleSuccess).catch(handleError);
};

screenshotButton.onclick = video.onclick = function() {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0);

    // Other browsers will fall back to image/png
    img.src = canvas.toDataURL('image/webp');
};

stopButton.onclick = function() {
    video.pause();
};

downloadButton.onclick = function() {
    downloadButton.href = canvas.toDataURL();
    downloadButton.download = "mypainting.png";
};

function handleSuccess(stream) {
    stopButton.disabled = false;
    screenshotButton.disabled = false;
    video.srcObject = stream;
}

function handleError(error) {
    console.error('navigator.getUserMedia error: ', error);
}