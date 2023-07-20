let daySky, nightSky, dayOcean, nightOcean, daySun, nightMoon;
let currentSky, currentOcean, currentSunMoon;
let transitionDuration = 2000; // 2000 milliseconds = 2 seconds
let transitionStartTime;
let transitionInProgress = false;
let isNight = false;

function setup() {
  createCanvas(500, 500);
  daySky = color(251, 233, 151); // Red
  nightSky = color(0, 38, 77); // Blue

  dayOcean = color(161, 212, 243);
  nightOcean = color(0, 77, 153);

  daySun = color(242, 111, 6);
  nightMoon = color(251, 233, 151);
  stars = color(251, 233, 151, transitionInProgress)

  currentSky = daySky;
  currentOcean = dayOcean;
  currentSunMoon = daySun;
}

function draw() {
  background(255);
  noStroke();

  if (transitionInProgress) {
    dayNightTransition();
  }

  fill(currentSky);
  rect(0, 0, width, height / 2);

  fill(currentOcean);
  rect(0, height / 2, width, height / 2);

  fill(currentSunMoon);
  arc(250, 250, 90, 90, PI, 0);

  if (isNight) {
    nightAnimations();
  }
}

function mousePressed() {
 
  if (isNight) {
    if (!transitionInProgress) {
      transitionStartTime = millis();
      transitionInProgress = true;
    }
  } else if (mouseY < width/4){
    if (!transitionInProgress) {
      transitionStartTime = millis();
      transitionInProgress = true;
    }
  }
}

function dayNightTransition() {

    // Calculate the progress of the transition (0 to 1)
    let elapsedTime = (millis() - transitionStartTime);
    let transitionProgress = constrain(elapsedTime / transitionDuration, 0, 1);

    if (!isNight) { // If day, transition from day to night
      currentSky = lerpColor(daySky, nightSky, transitionProgress);
      currentOcean = lerpColor(dayOcean, nightOcean, transitionProgress);
      currentSunMoon = lerpColor(daySun, nightMoon, transitionProgress);
    } else { // If nightk transtion from night to day
      currentSky = lerpColor(nightSky, daySky, transitionProgress);
      currentOcean = lerpColor(nightOcean, dayOcean, transitionProgress);
      currentSunMoon = lerpColor(nightMoon, daySun, transitionProgress);
    }

    // Check if the transition is complete
    if (transitionProgress === 1) {
      transitionInProgress = false;
      isNight = !isNight;
    }
}

function nightAnimations() {
  
  //
  drawStars();

  // moonRefletion
  sunReflection();

}

function drawStars() {
  fill(stars);
  // draw star
  push();
  translate(width * 0.27, height * 0.2);
  rotate(frameCount / 75.0);
  rect(0, 0, 5, 5);
  pop();

  // draw star
  push();
  translate(width * 0.77, height * 0.42);
  rotate(frameCount / -90.0);
  rect(0, 0, 5, 5);
  pop();

  // draw star
  push();
  translate(width * 0.85, height * 0.1);
  rotate(frameCount / 80.0);
  rect(0, 0, 5, 5);
  pop();

  // draw star
  push();
  translate(width * 0.64, height * 0.24);
  rotate(frameCount / -90.0);
  rect(5, 0, 5, 5);
  pop();

  // draw star
  push();
  translate(width * 0.93, height * 0.3);
  rotate(frameCount / 60.0);
  rect(10, 0, 5, 5);
  pop();

  // draw starsssss
  push();
  translate(width * 0.13, height * 0.42);
  rotate(frameCount / -60.0);
  rect(0, 0, 5, 5);
  pop();

  // draw star
  push();
  translate(width * 0.39, height * 0.35);
  rotate(frameCount / 37.0);
  rect(0, 0, 5, 5);
  pop();

  // draw star
  push();
  translate(width * 0.1, height * 0.12);
  rotate(frameCount / -80.0);
  rect(0, 0, 5, 5);
  pop();

  // draw star
  push();
  translate(width * 0.5, height * 0.1);
  rotate(frameCount / 95.0);
  rect(0, 0, 5, 5);
  pop();
}

function sunReflection() {
  // TODO
  if (!isNight) {

  } else {

  }
}