// environment colors
let currentSky, currentOcean, currentSunMoon, currentReflection;

let daySky, nightSky, dayOcean, nightOcean, daySun, nightMoon;
let cloudySky, cloudyOcean, cloudySun, cloudyReflection;
let discoSky, discoOcean, discoSun;
let setSky, setOcean, setSun, setReflection;
let roseSky, roseOcean, roseSun;

// showGuidelines
let showGuidelines;

// scene check
let isBase;
let isNight;
let isSceneTwo;
let isSceneThree;
let isSceneFour;
let isSceneFive;
let isSceneSix;

// transition between day and night
let transitionDuration = 3500; // 1000 milliseconds = 1 seconds
let transitionStartTime;
let transitionInProgress = false;

// reflection variables
let reflectX1, reflectX2, reflectX3, reflectX4;
let dayReflection, nightReflection; // colors
let reflectionHeight1, reflectionHeight2, reflectionHeight3, reflectionHeight4, reflectionSpeed;

let star1, star2, star3, star4, star5, star6, star7, star8, star9;

let drops = [];
let numberOfDrops = 500;

let bird1, bird2, bird3, bird4;

let boat1, boat2;

// fireworks
var fireworks = [];
var gravity;
var sparkColor;

var lateNight, palisades, poke, popThieves, retro, sober;

function preload() {
  three005 = loadSound('assets/3005.wav');
  lateNight = loadSound('assets/late_night_in_kauai.wav');
  palisades = loadSound('assets/palisades.wav');
  poke = loadSound('assets/poke.wav');
  popThieves = loadSound('assets/pop_thieves.wav');
  retro = loadSound('assets/retro.wav');
  sober = loadSound('assets/sober.wav');
}

function setup() {

  createCanvas(windowWidth, windowHeight);
  pixelDensity(10);
  daySky = color(251, 233, 151);
  dayOcean = color(161, 212, 243);
  daySun = color(242, 111, 6);
  dayReflection = color(242, 111, 6, 100);

  nightSky = color(0, 38, 77);
  nightOcean = color(0, 77, 153);
  nightMoon = color(251, 233, 151);
  nightReflection = color(251, 233, 151, 100);
  stars = color(251, 233, 151);

  cloudySky = color(217, 215, 208);
  cloudyOcean = color(118, 147, 166);
  cloudySun = color(255, 246, 201);

  discoSky = color(0, 0, 0);
  discoOcean = color(154, 71, 255);
  discoSun = color(164, 243, 245);

  setSun = color(247, 199, 94);
  setOcean = color(83, 104, 176);
  setSky = color(247, 146, 124);
  setReflection = (207, 9, 2, 100);

  roseSky = color(247, 193, 212);
  roseOcean = color(189, 203, 217);
  roseSun = color(235, 229, 144);

  reflectX1 = width / 4 * 1.5;
  reflectX2 = width / 4 * 1.6;
  reflectX3 = width / 4 * 1.7;
  reflectX4 = width / 4 * 1.8;
  reflectionHeight1 = 0, reflectionHeight2 = 0, reflectionHeight3 = 0, reflectionHeight4 = 0;
  reflectionSpeed = 0.8;

  currentSky = daySky;
  currentOcean = dayOcean;
  currentSunMoon = daySun;
  currentReflection = dayReflection;

  showGuidelines = false;
  isBase = true;
  isNight = false;
  isSceneTwo = false;
  isSceneThree = false;
  isSceneFour = false;
  isSceneFive = false;
  isSceneSix = false;

  star1 = new Star(0.28, 0.07, 75, 10, 0, 5, 5);
  star2 = new Star(0.77, 0.42, -90, 0, 0, 5, 5);
  star3 = new Star(0.85, 0.1, 80, 0, 0, 5, 5);
  star4 = new Star(0.64, 0.24, -90, 5, 0, 5, 5);
  star5 = new Star(0.93, 0.3, 60, 10, 0, 5, 5);
  star6 = new Star(0.13, 0.42, -60, 0, 0, 5, 5);
  star7 = new Star(0.32, 0.32, 37, 0, 0, 5, 5);
  star8 = new Star(0.1, 0.17, -80, 10, 0, 5, 5);
  star9 = new Star(0.48, 0.1, 95, 10, 0, 5, 5);

  for (let i = 0; i < numberOfDrops; i++) {
    drops.push(new Raindrop());
  }

  gravity = createVector(0, 0.15);

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
    rect(width - 24, 22, 21, 21);

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
    line(0, height / 4, width, height / 4);

    line(width / 2 - width / 8, height / 4, width / 2 - width / 8, height / 2);
    line(width / 2 + width / 8, height / 4, width / 2 + width / 8, height / 2);

    line(0, height / 2, width, height / 2);
    line(width / 2, height / 2, width / 2, height);

  }

  noStroke();
  // only one scene can be in progress
  if (isNight) {
    nightAnimations();
  } else if (isSceneTwo) {
    sceneTwoAnimations();
  } else if (isSceneThree) {
    sceneThreeAnimations();
  } else if (isSceneFour) {
    sceneFourAnimations();
  } else if (isSceneFive) {
    sceneFiveAnimations();
  } else if (isSceneSix) {
    sceneSixAnimations();
  }

}

function mousePressed() {

  if (showGuidelines) { // reset guidelines
    showGuidelines = false;

  } else if (mouseX >= width * 0.9 // show guidelines
    && mouseX < width
    && mouseY <= height * 0.03
    && mouseY > 0
    && isBase) {
    showGuidelines = true;

  } else if ((isNight || isSceneTwo || isSceneThree
    || isSceneFour || isSceneFive || isSceneSix) && !transitionInProgress) { // reset scene trigger
    resetScene();

  } else if (mouseY < height / 4 && isBase) { // night trigger
    isNight = true;
    isBase = false;

    if (!transitionInProgress) { // trigger transition
      transitionStartTime = millis();
      transitionInProgress = true;
    }

    lateNight.loop();
    
  } else if ((mouseY > height / 4 && mouseY < height / 2
    && mouseX > width / 3 && mouseX < width / 3 * 2)
    && isBase) { // scene 2 trigger
    isSceneTwo = true;
    isBase = false;

    sober.loop();

    bird1 = new Bird(-100, height * 0.1, random(10, 40));
    bird2 = new Bird(-100, height * 0.2, random(10, 40));
    bird3 = new Bird(-100, height * 0.3, random(10, 40));
    bird4 = new Bird(-100, height * 0.4, random(10, 40));

    if (!transitionInProgress) { // trigger transition
      transitionStartTime = millis();
      transitionInProgress = true;
    }

  } else if ((mouseX < width / 2 - width / 8 && mouseX > 0
    && mouseY < height / 2 && mouseY > height / 4)
    && isBase) { // scene 3 trigger
    isSceneThree = true;
    isBase = false;

    retro.loop();

    if (!transitionInProgress) { // trigger transition
      transitionStartTime = millis();
      transitionInProgress = true;
    }
  } else if ((mouseX < width && mouseX > width / 2 + width / 8
    && mouseY < height / 2 && mouseY > height / 4) && isBase) { // scene 4 trigger
    isSceneFour = true;
    isBase = false;

    popThieves.loop();

    if (!transitionInProgress) { // trigger transition
      transitionStartTime = millis();
      transitionInProgress = true;
    }
  } else if ((mouseX > 0 && mouseX < width / 2
    && mouseY > height / 2) && isBase) {
    // scene 5
    isSceneFive = true;
    isBase = false;

    palisades.loop();

    boat1 = new Boat(0 - height*0.05, height*0.5, height*0.05, true);
    boat2 = new Boat(width + height*0.01, height*0.6, height*0.15, false);
    boat3 = new Boat(0 - height*0.45, height*0.8, height*0.45, true);

    if (!transitionInProgress) { // trigger transition
      transitionStartTime = millis();
      transitionInProgress = true;
    }
  } else if ((mouseX < width && mouseX > width / 2
    && mouseY > height / 2) && isBase) {
    // scene 6
    isSceneSix = true;
    isBase = false;

    poke.loop();

    if (!transitionInProgress) { // trigger transition
      transitionStartTime = millis();
      transitionInProgress = true;
    }
  } 
}

function keyPressed() {
  if (key == 's') {
    saveCanvas('kauai_interactive', 'jpg');
  } 
}

/* scene triggers */
function nightAnimations() {

  if (transitionInProgress) {
    colorTransition(nightSky, nightOcean, nightMoon, nightReflection);
    //colorTransition(nightSky, nightOcean, nightMoon, moonReflection);
  }

  // draw reflection
  drawReflection();

  // draw starts
  star1.drawStar();
  star2.drawStar();
  star3.drawStar();
  star4.drawStar();
  star5.drawStar();
  star6.drawStar();
  star7.drawStar();
  star8.drawStar();
  star9.drawStar();

}

function sceneTwoAnimations() {

  if (transitionInProgress) {
    colorTransition(setSky, setOcean, setSun, currentReflection);
  }

  drawReflection();
  // animateBirds();
  bird1.animation();
  bird2.animation();
  bird3.animation();
  bird4.animation();

}

function sceneThreeAnimations() {
  if (transitionInProgress) {
    colorTransition(cloudySky, cloudyOcean, cloudySun, currentReflection);
  }

  toggleRain(true);
}

function sceneFourAnimations() {
  if (transitionInProgress) {
    colorTransition(discoSky, discoOcean, discoSun, currentReflection);
  }

  drawDisco();

  fill(currentOcean);
  rect(0, height / 2, width, height / 2);

  fill(currentSunMoon);
  arc(width / 2, height / 2, width / 4, width / 4, PI, 0);
}

function sceneFiveAnimations() {
  if (transitionInProgress) {
    colorTransition(roseSky, roseOcean, daySky, currentReflection);
  }

  boat1.animation()
  boat2.animation();
  boat3.animation();
}

function sceneSixAnimations() {
  if (transitionInProgress) {
    colorTransition(discoSky, nightSky, nightMoon, currentReflection);
  }

  if (!transitionInProgress) {
  // fireworks
  sparkColor = pickColor();
  xPosition = random(40, width - 40);

  // chance of firework being launched
  if (random(1) < 0.06) {
    fireworks.push(new Firework(sparkColor, xPosition));
  }
  for (i = fireworks.length - 1; i >= 0; i--) {
    fireworks[i].update();
  
    fireworks[i].show();
		
    if (fireworks[i].done()) {
      fireworks.splice(i, 1);
    }
  }
  
    fill(nightSky);
    noStroke();
    rect(0, height / 2, width, height / 2);
  }
  
}

function resetScene(scene) {
  resetReflection();

  isNight = false;
  isSceneTwo = false;
  isSceneThree = false;
  isSceneFour = false;
  isSceneFive = false;
  isSceneSix = false;

  currentSky = lerpColor(currentSky, daySky, 1);
  currentOcean = lerpColor(currentSky, dayOcean, 1);
  currentSunMoon = lerpColor(currentSunMoon, daySun, 1);
  currentReflection = lerpColor(currentReflection, dayReflection, 1);

  isBase = true;

  toggleRain(false);

  lateNight.stop();
  sober.stop();
  retro.stop();
  popThieves.stop();
  palisades.stop();
  poke.stop();


}

/* functional animations */
function colorTransition(newSky, newOcean, newSunMoon, newReflection) {

  // Calculate the progress of the transition (0 to 1)
  let elapsedTime = (millis() - transitionStartTime);
  let transitionProgress = constrain(elapsedTime / transitionDuration, 0, 1);

  currentSky = lerpColor(daySky, newSky, transitionProgress);
  currentOcean = lerpColor(dayOcean, newOcean, transitionProgress);
  currentSunMoon = lerpColor(daySun, newSunMoon, transitionProgress);
  currentReflection = lerpColor(dayReflection, newReflection, transitionProgress);

  // Check if the transition is complete
  if (transitionProgress === 1) {
    transitionInProgress = false;
  }
}

function drawReflection() {

  fill(currentReflection);

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

  if (reflectionHeight3 >= height / 8 && reflectionHeight4 < height / 8) {
    reflectionHeight4 += reflectionSpeed;
  }
}

function resetReflection() {
  reflectionHeight1 = 0;
  reflectionHeight2 = 0;
  reflectionHeight3 = 0;
  reflectionHeight4 = 0;
}

function drawDisco() {
  if (!transitionInProgress) {
    for (var x = 0; x <= width; x += 50) {
      for (var y = 0; y <= height / 2; y += 50) {
        fill(random(255), 0, random(255));
        ellipse(x, y, 25, 25);
      }
    }
  }
}

function toggleRain(rainToggled) {

  if (rainToggled) {
    for (let i = 0; i < drops.length; i++) {
      drops[i].fall();
      drops[i].display();
    }
  } else if (!rainToggled) {
    for (let i = 0; i < drops.length; i++) {
      drops[i].resetRain();
    }
  }

}

function pickColor() {
  // All fireworks get a random color
  c = color(random(50, 255), random(50, 255), random(50, 255));
  return c;
}