// environment colors
let daySky, nightSky, dayOcean, nightOcean, daySun, nightMoon;
let currentSky, currentOcean, currentSunMoon, currentSunMoonReflection;

// showGuidelines
let showGuidelines; 

// scene check
let isNight;
let isSceneTwo;
let isBase;

// transition between day and night
let transitionDuration = 3500; // 1000 milliseconds = 1 seconds
let transitionStartTime;
let transitionInProgress = false;

// reflection variables
let reflectX1, reflectX2, reflectX3, reflectX4;
let sunReflection, moonReflection; // colors
let reflectionHeight1, reflectionHeight2, reflectionHeight3, reflectionHeight4, reflectionSpeed;

function setup() {
  createCanvas(windowWidth, windowHeight);
  daySky = color(251, 233, 151); 
  nightSky = color(0, 38, 77); 

  dayOcean = color(161, 212, 243);
  nightOcean = color(0, 77, 153);

  daySun = color(242, 111, 6);
  nightMoon = color(251, 233, 151);
  stars = color(251, 233, 151, transitionInProgress);

  moonReflection = color(251, 233, 151, 100);
  sunReflection = color(242, 111, 6, 100);
  reflectX1 = width / 4 * 1.5;
  reflectX2 = width / 4 * 1.6;
  reflectX3 = width / 4 * 1.7;
  reflectX4 = width / 4 * 1.8;
  reflectionHeight1 = 0, reflectionHeight2 = 0, reflectionHeight3 = 0, reflectionHeight4 = 0;
  reflectionSpeed = 0.8;

  currentSky = daySky;
  currentOcean = dayOcean;
  currentSunMoon = daySun;
  currentSunMoonReflection = sunReflection;

  isNight = false;
  isSceneTwo = false;
  isBase = true;
  showGuidelines = false;
}

function draw() {
  background(255);
  noStroke();
  rectMode(CORNER);

  fill(currentSky);
  rect(0, 0, width, height / 2);

  fill(currentOcean);
  rect(0, height / 2, width, height / 2);

  fill(currentSunMoon);
  arc(width / 2, height / 2, width / 4, width / 4, PI, 0);

  if (isBase && !showGuidelines) {
    rectMode(CENTER);
    fill(daySun);
    rect(width - 24, 22, 25, 25);
    
    fill(daySky);
    rect(width - 24, 22, 20, 20);

    fill(daySun); // Set the text color to black
    textSize(20); // Set the text size
    // textStyle(BOLD);
    textFont('Helvetica');
    text("?", width - 30, 30);
  }

  
  // guidelines
  if (showGuidelines) {
    stroke(100);
    strokeWeight(2);
    line(0, height/4, width, height/4);
    line(0, height/4 * 3, width, height/4 * 3);
  }

  noStroke();
  // only one scene can be in progress
  if (isNight) {
    nightAnimations();
  } else if (isSceneTwo) {
    sceneTwoAnimations();
  }
}

function mousePressed() {

  if (showGuidelines) { // reset guidelines
    showGuidelines = false;
  } else if (mouseX >= width - 30 // show guidelines
    && mouseX < width
    && mouseY <= 30
    && mouseY > 0) {
    showGuidelines = true;
  } else if (isNight || isSceneTwo) { // reset scene trigger
    resetScene();
    resetReflection();
  } else if (mouseY < height/4 && !isNight) { // night trigger
    isNight = true;
    isBase = false;

    if (!transitionInProgress) { // trigger transition
      transitionStartTime = millis();
      transitionInProgress = true;
    }
  } else if (mouseY > height/4 * 3) { // scene 2 trigger
    isSceneTwo = true;
    isBase = false;
  }
}

function doubleClicked() {
  showGuidelines = -showGuidelines;
}

/* scene triggers */

function resetScene(scene) {
  isNight = false;
  isSceneTwo = false;

  currentSky = lerpColor(currentSky, daySky, 1);
  currentOcean = lerpColor(currentSky, dayOcean, 1);
  currentSunMoon = lerpColor(currentSunMoon, daySun, 1);
  currentSunMoonReflection = lerpColor(currentSunMoonReflection, sunReflection, 1);

  isBase = true;
}

function nightAnimations() {

  if (transitionInProgress) {
    dayNightTransition();
  }

  // draw reflection
  drawReflection();

  // draw starts
  drawStars();

}

function sceneTwoAnimations() {
  drawReflection();
}

/* functional animations */

function dayNightTransition() {

  // Calculate the progress of the transition (0 to 1)
  let elapsedTime = (millis() - transitionStartTime);
  let transitionProgress = constrain(elapsedTime / transitionDuration, 0, 1);

  if (isNight) { // If day, transition from day to night
    currentSky = lerpColor(daySky, nightSky, transitionProgress);
    currentOcean = lerpColor(dayOcean, nightOcean, transitionProgress);
    currentSunMoon = lerpColor(daySun, nightMoon, transitionProgress);
    currentSunMoonReflection = lerpColor(sunReflection, moonReflection, transitionProgress);
  } 

  // Check if the transition is complete
  if (transitionProgress === 1) {
    transitionInProgress = false;
  }
}

function drawReflection() {

  fill(currentSunMoonReflection);

  rect(reflectX1, height / 2, width / 4, reflectionHeight1);
  rect(reflectX2, height / 2 + height / 8, width / 4 * 0.8, reflectionHeight2);
  rect(reflectX3, height / 2 + height / 8 * 2, width / 4 * 0.6, reflectionHeight3);
  rect(reflectX4, height / 2 + height / 8 * 3, width / 4 * 0.4, reflectionHeight4);

  if (reflectionHeight1 < height / 8) {
    reflectionHeight1 += reflectionSpeed;
  }

  if (reflectionHeight1 >= height / 8 && reflectionHeight2 < height / 8) {
    reflectionHeight2 += reflectionSpeed;
  }

  if (reflectionHeight2 >= height / 8 && reflectionHeight3 < height / 8) {
    reflectionHeight3 += reflectionSpeed;
  }

  if (reflectionHeight3 >= height / 8  && reflectionHeight4 < height / 8) {
    reflectionHeight4 += reflectionSpeed;
  }
}

function resetReflection() {
  reflectionHeight1 = 0;
  reflectionHeight2 = 0;
  reflectionHeight3 = 0;
  reflectionHeight4 = 0;
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