let video;
let poseNet;
let poses = [];
let skeletons = [];
let butterfly;
let canvasWidth = 640;
let canvasHeight = 480;

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  video = createCapture(VIDEO);
  video.size(width, height);

  // Create a new poseNet method with a single detection
  poseNet = ml5.poseNet(video, 'single', gotPoses);

  // Hide the video element, and just show the canvas
  video.hide();
  butterfly = new Butterfly({
    width: canvasWidth,
    height: canvasHeight
  });
}

function draw() {
  image(video, 0, 0, width, height);
  drawKeypoints();
}


function drawKeypoints()  {
  for (let i = 0; i < poses.length; i++) {
    for (let j = 0; j < poses[i].pose.keypoints.length; j++) {
      let keypoint = poses[i].pose.keypoints[j];
      if (keypoint.part.includes('nose') && keypoint.score > 0.2) {
        console.log(keypoint);
        butterfly.position.x = keypoint.position.x - 0.5 * canvasWidth;
        butterfly.position.y = 0.5 * canvasHeight - keypoint.position.y;
      }
    }
  }
}

// The callback that gets called every time there's an update from the model
function gotPoses(results) {
  poses = results;
  console.log(poses);
}
