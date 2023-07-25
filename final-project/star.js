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
  