// environment colors
let daySky, nightSky, dayOcean, nightOcean, daySun, nightMoon;
let currentSky, currentOcean, currentSunMoon, currentSunMoonReflection;

// environment check
let isNight = false;

// transition between day and night
let transitionDuration = 2000; // 2000 milliseconds = 2 seconds
let transitionStartTime;
let transitionInProgress = false;

// reflection variables
let reflectX1, reflectX2, reflectX3, reflectX4;
let sunReflection, moonReflection;
let reflectionHeight, reflectionSpeed;

function setup() {
  createCanvas(windowWidth, windowHeight);
  daySky = color(251, 233, 151); // Red
  nightSky = color(0, 38, 77); // Blue

  dayOcean = color(161, 212, 243);
  nightOcean = color(0, 77, 153);

  daySun = color(242, 111, 6);
  nightMoon = color(251, 233, 151);
  stars = color(251, 233, 151, transitionInProgress);

  moonReflection = color(251, 233, 151, 100);
  sunReflection = color(242, 111, 6, 100);
  reflectionHeight = 0;
  reflectionSpeed = 0.8;

  currentSky = daySky;
  currentOcean = dayOcean;
  currentSunMoon = daySun;
  currentSunMoonReflection = sunReflection;

  reflectX1 = width/4*1.5;
  reflectX2 = width/4*1.6;
  reflectX3 = width/4*1.7;
  reflectX4 = width/4*1.8;

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
  arc(width/2, height/2, width/4, width/4, PI, 0);

  if (isNight) {
    nightAnimations();
  }

}

function mousePressed() {

  if (!isNight && mouseY < width/4){
    if (!transitionInProgress) {
      transitionStartTime = millis();
      transitionInProgress = true;
    }
  }
 
  if (isNight) {
    if (!transitionInProgress) {
      transitionStartTime = millis();
      transitionInProgress = true;
      reflectionHeight = 0;
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
      currentSunMoonReflection = lerpColor(sunReflection, moonReflection, transitionProgress);
    } else { // If nightk transtion from night to day
      currentSky = lerpColor(nightSky, daySky, 1);
      currentOcean = lerpColor(nightOcean, dayOcean, 1);
      currentSunMoon = lerpColor(nightMoon, daySun, 1);
      currentSunMoonReflection = lerpColor(moonReflection, sunReflection, 1);
    }

    // Check if the transition is complete
    if (transitionProgress === 1) {
      transitionInProgress = false;
      isNight = !isNight;
    }
}

function nightAnimations() {
  // draw starts
  drawStars();

  // draw reflection in water
  drawReflection();
  reflectionMovement();

}

function drawReflection() {

  fill(currentSunMoonReflection);
  
  rect(reflectX1, height/2, width/4, reflectionHeight);
  rect(reflectX2, height/2+height/8, width/4*0.8, reflectionHeight);
  rect(reflectX3, height/2+height/8*2, width/4*0.6, reflectionHeight);
  rect(reflectX4, height/2+height/8*3, width/4*0.4, reflectionHeight);

  if (reflectionHeight < height/8 && !transitionInProgress) {
    reflectionHeight += reflectionSpeed;
  } 
}

function reflectionMovement() {
  // TODO
}

function drawStars() {
  fill(stars);
  noStroke();
  // draw star
  push();
  translate(width * 0.28, height * 0.07);
  rotate(frameCount / 75.0);
  rect(10, 0, 5, 5);
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
  translate(width * 0.32, height * 0.32);
  rotate(frameCount / 37.0);
  rect(0, 0, 5, 5);
  pop();

  // draw star
  push();
  translate(width * 0.1, height * 0.17);
  rotate(frameCount / -80.0);
  rect(10, 0, 5, 5);
  pop();

  // draw star
  push();
  translate(width * 0.48, height * 0.1);
  rotate(frameCount / 95.0);
  rect(10, 0, 5, 5);
  pop();
}