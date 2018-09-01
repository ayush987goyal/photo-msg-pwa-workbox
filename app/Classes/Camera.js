class Camera {
  constructor(video_node) {
    // Camera stream DOM node
    this.video_node = video_node;
  }

  switch_on() {
    // Get camera media stream and set on player <video>
    navigator.mediaDevices
      .getUserMedia({
        video: { width: 600, height: 600 },
        audio: false
      })
      .then(stream => {
        this.video_node.srcObject = this.stream = stream;
      });
  }

  switch_off() {
    // Pause video node
    this.video_node.pause();
    // Stop media stream
    this.stream.getTracks()[0].stop();
  }

  take_photo() {
    // Create <canvas> elemnet to render the photo
    let canvas = document.createElement('canvas');

    canvas.setAttribute('width', 600);
    canvas.setAttribute('height', 600);

    let context = canvas.getContext('2d');

    context.drawImage(this.video_node, 0, 0, canvas.width, canvas.height);

    // Get the canvas image as data uri
    this.photo = context.canvas.toDataURL();

    context = null;
    canvas = null;

    return this.photo;
  }
}
