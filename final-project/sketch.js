// environment colors
let currentSky, currentOcean, currentSunMoon, currentReflection;

let daySky, nightSky, dayOcean, nightOcean, daySun, nightMoon;
let cloudySky, cloudyOcean, cloudySun, cloudyReflection;
let discoSky, discoOcean, discoSun;
let setSky, setOcean, setSun, setReflection;

// showGuidelines
let showGuidelines; 

// scene check
let isBase;
let isNight;
let isSceneTwo;
let isSceneThree;
let isSceneFour;

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

let bird1X = -50;
let bird1Y = 100;
let bird1YMax = 110;
let bird1YMin = 90;
let bird1YFlap = 0;
let birdSpeed;
let birdUp = false;

let bird1, bird2, bird3, bird4;

function setup() {
  createCanvas(windowWidth, windowHeight);
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

  setSky = color(250, 209, 120,180);
  setOcean = color(2, 31, 105);
  setSun = color(207, 9, 2);
  setReflection = (207, 9, 2, 100);

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

  star1 = new Star(0.28, 0.07, 75, 10, 0 ,5, 5);
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

  bird1 = new Bird(-50, height*0.1, random(10, 40));
  bird2 = new Bird(-50, height*0.2, random(10, 40));
  bird3 = new Bird(-50, height*0.3, random(10, 40));
  bird4 = new Bird(-50, height*0.4, random(10, 40));


  // bird1 = new Bird(-50, height/4-40, 30, 22);
  // bird2 = new Bird(-50, height/4+20, 30, 22);
  // bird3 = new Bird(-50, height/4-80, 30, 22);
  
  
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
    line(0, height/4, width, height/4);
    
    line(width/2-width/8, height/4, width/2-width/8, height/2);
    line(width/2+width/8, height/4, width/2+width/8, height/2);
    
    line(0, height/2, width, height/2);
    line(width/2, height/2, width/2, height);

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

  } else if ((isNight || isSceneTwo || isSceneThree || isSceneFour) && !transitionInProgress) { // reset scene trigger
    resetScene();
    resetReflection();

  } else if (mouseY < height/4 && isBase) { // night trigger
    isNight = true;
    isBase = false;

    if (!transitionInProgress) { // trigger transition
      transitionStartTime = millis();
      transitionInProgress = true;
    }

  } else if ((mouseY > height/4 && mouseY < height/2
            && mouseX > width/3 && mouseX < width/3 * 2) 
            && isBase) { // scene 2 trigger
    isSceneTwo = true;
    isBase = false;

    if (!transitionInProgress) { // trigger transition
      transitionStartTime = millis();
      transitionInProgress = true;
    }

  } else if ((mouseX < width/2-width/8 && mouseX > 0
  && mouseY < height/2 && mouseY > height/4)
  && isBase) { // scene 3 trigger
    isSceneThree = true;
    isBase = false;

    if (!transitionInProgress) { // trigger transition
      transitionStartTime = millis();
      transitionInProgress = true;
    }
  } else if ((mouseX < width && mouseX > width/2+width/8 
    && mouseY < height/2 && mouseY > height/4) && isBase) {
      isSceneFour = true;
      isBase = false;

      if (!transitionInProgress) { // trigger transition
        transitionStartTime = millis();
        transitionInProgress = true;
      }
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

function resetScene(scene) {
  isNight = false;
  isSceneTwo = false;
  isSceneThree = false;
  isSceneFour = false;

  currentSky = lerpColor(currentSky, daySky, 1);
  currentOcean = lerpColor(currentSky, dayOcean, 1);
  currentSunMoon = lerpColor(currentSunMoon, daySun, 1);
  currentReflection = lerpColor(currentReflection, dayReflection, 1);

  isBase = true;

  toggleRain(false);

  bird1.birdX = -50;
  bird2.birdX = -50;
  bird3.birdX = -50;
  
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

function drawDisco() {
  if (!transitionInProgress) {
    for (var x = 0; x <= width; x += 50) {
      for (var y = 0; y <= height/2; y += 50) {
          fill (random(255), 0, random(255));
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

class Star {
  constructor(translateX, translateY, rotation, rX, rY, rW, rH) {
    this.translateX = translateX;
    this.translateY = translateY;
    this.rotation = rotation;
    this.rX = rX;
    this.rY = rY;
    this.rW = rW;
    this.rH = rH;
  }

  drawStar() {
    fill(stars);
    noStroke();

    push();
    translate(width * this.translateX, height * this.translateY);
    rotate(frameCount / this.rotation);
    rect(this.rX, this.rY, this.rW, this.rH);
    pop();
  }
}

class Raindrop {
  constructor() {
    this.x = random(width);
    this.y = random(-400, -100);
    this.speed = random(2, 5);
    this.length = random(10, 20);
  }

  fall() {
    this.y += this.speed;
    if (this.y > height) {
      this.y = random(-400, -100);
      this.x = random(width);
    }
  }

  display() {
    strokeCap(SQUARE);
    stroke(0, 100, 200); // Blue color
    strokeWeight(1.2);
    line(this.x, this.y, this.x, this.y + this.length);
  }

  resetRain() {
    this.y = random(-400, -100);
  }
}

class Bird {
  constructor(x, y, birdWidth) {
    this.birdX = x;
    this.birdY = y
    this.birdWidth = birdWidth;
    this.birdHeight = birdWidth/2;

    this.birdYMax = this.birdY + 10;
    this.birdYMin = this.birdY - 10
    this.birdSpeed = random(0.75,2);
    this.flapY = 0;
    this.birdUp = false;

  }

  animation() {
    this.birdX += this.birdSpeed
    this.drawBird(this.birdX, this.birdY);

    if (this.birdY == this.birdYMax) {
      this.birdUp = false;
    }
    else if (this.birdY == this.birdYMin) {
      this.birdUp = true;
    }

    if (this.birdUp) {
      this.birdY++;
      this.flapY = this.birdY - this.birdHeight*1.4;
    } else if(!this.birdUp) {
      this.birdY--;
      this.flapY = this.birdY + this.birdHeight*1.7;
    }

    if (this.birdX > width + 50) {
      this.birdX = -50;
      this.birdSpeed = random(1,4);
    }
  }

  drawBird() {
    fill(255);
    stroke(0);
    
    // body
    rect(this.birdX, this.birdY, this.birdWidth, this.birdHeight);
    
    // head/neck
    rect(this.birdX + this.birdWidth, this.birdY - this.birdHeight/2, this.birdWidth/2.5, this.birdHeight * 1.5)
    
    // wing
    triangle(this.birdX, this.birdY, this.birdX+this.birdWidth, this.birdY, this.birdX+this.birdWidth, this.flapY);
    
    // tail
    rect(this.birdX, this.birdY, this.birdWidth * -.2, this.birdHeight * 0.3);
    
    // beak
    rect(this.birdX + this.birdWidth + this.birdWidth/2.5, this.birdY, this.birdWidth*.2, this.birdHeight*.3)
    
    // eye
    
  
    rect(this.birdX + this.birdWidth + this.birdWidth/2.5,   this.birdY - this.birdHeight*0.15, 
         -this.birdWidth*0.1,
         -this.birdHeight*0.2);
    
    fill(0);
    rect(this.birdX + this.birdWidth + this.birdWidth/2.5,   this.birdY - this.birdHeight*0.15, -this.birdWidth*0.05, -this.birdHeight*.1);
    
   if (this.birdSpeed >= 3) {
    line(this.birdX - this.birdWidth*0.9,
         this.birdY + this.birdHeight*0.4, 
         this.birdX - this.birdWidth*0.4, 
         this.birdY + this.birdHeight*0.4);
     
     line(this.birdX - this.birdWidth*0.7,
         this.birdY + this.birdHeight*0.6, 
         this.birdX - this.birdWidth*0.4, 
         this.birdY + this.birdHeight*0.6);
     
     line(this.birdX - this.birdWidth*0.9,
         this.birdY + this.birdHeight*0.8, 
         this.birdX - this.birdWidth*0.4, 
         this.birdY + this.birdHeight*0.8);
     
  }

  }
}
