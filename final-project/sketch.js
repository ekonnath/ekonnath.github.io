let daySky, nightSky, dayOcean, nightOcean, daySun, nightMoon;
let currentSky, currentOcean, currentSunMoon;
let transitionDuration = 2000; // 2000 milliseconds = 2 seconds
let transitionStartTime;
let transitionInProgress = false;
let isDay = true;

function setup() {
  createCanvas(500, 500);
  daySky = color(251, 233, 151); // Red
  nightSky = color(0, 38, 77); // Blue

  dayOcean = color(161, 212, 243);
  nightOcean = color(0, 77, 153);

  daySun = color(242, 111, 6);
  nightMoon = color(230, 230, 97);

  currentSky = daySky;
  currentOcean = dayOcean;
  currentSunMoon = daySun;
}

function draw() {
  background(255);
  noStroke();

  if (transitionInProgress) {
    // Calculate the progress of the transition (0 to 1)
    let elapsedTime = (millis() - transitionStartTime);
    let transitionProgress = constrain(elapsedTime / transitionDuration, 0, 1);

    // Interpolate the current color based on the progress
    if (isDay) {
      currentSky = lerpColor(daySky, nightSky, transitionProgress);
      currentOcean = lerpColor(dayOcean, nightOcean, transitionProgress);
      currentSunMoon = lerpColor(daySun, nightMoon, transitionProgress);
    } else {
      currentSky = lerpColor(nightSky, daySky, transitionProgress);
      currentOcean = lerpColor(nightOcean, dayOcean, transitionProgress);
      currentSunMoon = lerpColor(nightMoon, daySun, transitionProgress);
    }

    // Check if the transition is complete
    if (transitionProgress === 1) {
      transitionInProgress = false;
      isDay = !isDay;
    }
  }

  fill(currentSky);
  rect(0, 0, width, height / 2);

  fill(currentOcean);
  rect(0, height / 2, width, height / 2);

  fill(currentSunMoon);
  arc(250, 250, 90, 90, PI, 0);
}

function mousePressed() {
  if (!transitionInProgress) {
    transitionStartTime = millis();
    transitionInProgress = true;
  }
}
