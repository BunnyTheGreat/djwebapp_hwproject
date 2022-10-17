rightwristX = 0;
rightwristY = 0;
leftwristX = 0;
leftwristY = 0;
song = "";
song1 = "";
song2 = "";
song1_status = "";
song2_status = "";
scoreleftwrist = 0;
function preload() {
song1 = loadSound("music.mp3");
song2 = loadSound("music2.mp3")
}

function setup() {
    canvas = createCanvas(480,380);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}


function modelLoaded() {
    console.log("poseNet is initialized");
}

function gotPoses(results) {

    if (results.length > 0) {

        console.log(results);
        scoreleftwrist = results[0].pose.keypoints[9].score;
        scorerightwrist = results[0].pose.keypoints[10].score;
        console.log("Score of left wrist is " + scoreleftwrist);
        leftwristX = results[0].pose.leftWrist.x;
        leftwristY = results[0].pose.leftWrist.y;
        console.log("Score of right wrist is " + scorerightwrist);

        console.log("left wrist coordinates x= " + leftwristX + " y = " + leftwristY);
        rightwristX = results[0].pose.rightWrist.x;
        rightwristY = results[0].pose.rightWrist.y;
        console.log("right wrist coordinates x= " + rightwristX + " y = " + rightwristY);
    }

}

function draw() {
    image(video,0,0,480,380);

    stroke("red");
    fill("red");

    song1_status = song1.isPlaying();
    song2_status = song2.isPlaying();

    if (scoreleftwrist > 0.2) { 
        circle(leftwristX, leftwristY, 20);
        song1.stop();
        if (song2_status == false) {
            song2.play();
            song = song2;
            document.getElementById("song_name").innerHTML = "Playing Peter Pan Theme Song";
        }
    }
    if (scorerightwrist > 0.2) { 
        circle(rightwristX, rightwristY, 20);
        song2.stop();
        if (song1_status == false) {
            song1.play();
            song = song1;
            document.getElementById("song_name").innerHTML = "Playing Harry Potter Theme Song";
        }
    }
}



function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}




