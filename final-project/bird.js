class Bird {
    constructor(x, y, birdWidth) {
      this.birdX = x;
      this.birdY = y
      this.birdWidth = birdWidth;
      this.birdHeight = birdWidth / 2;
  
      this.birdYMax = this.birdY + 10;
      this.birdYMin = this.birdY - 10
      this.birdSpeed = random(0.75, 2);
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
        this.flapY = this.birdY - this.birdHeight * 1.4;
      } else if (!this.birdUp) {
        this.birdY--;
        this.flapY = this.birdY + this.birdHeight * 1.7;
      }
  
      if (this.birdX > width + 50) {
        this.birdX = -50;
        this.birdSpeed = random(1, 4);
      }
    }
  
    drawBird() {
      fill(255);
      stroke(0);
      strokeWeight(1);
  
      fill(dayOcean)
      // body
      rect(this.birdX, this.birdY, this.birdWidth, this.birdHeight);
      // head/neck
      rect(this.birdX + this.birdWidth, this.birdY - this.birdHeight / 2, this.birdWidth / 2.5, this.birdHeight * 1.5);
  
      strokeWeight(1);
  
      fill(204, 202, 200)
      // wing
      triangle(this.birdX, this.birdY, this.birdX + this.birdWidth, this.birdY, this.birdX + this.birdWidth, this.flapY);
  
      // tail
      rect(this.birdX, this.birdY, this.birdWidth * -.2, this.birdHeight * 0.3);
  
      // beak
      rect(this.birdX + this.birdWidth + this.birdWidth / 2.5, this.birdY, this.birdWidth * .2, this.birdHeight * .3)
  
      // eye/eyeball
      rect(this.birdX + this.birdWidth + this.birdWidth / 2.5, this.birdY - this.birdHeight * 0.15,
        -this.birdWidth * 0.1,
        -this.birdHeight * 0.2);
      fill(0);
      rect(this.birdX + this.birdWidth + this.birdWidth / 2.5, this.birdY - this.birdHeight * 0.15, -this.birdWidth * 0.05, -this.birdHeight * .1);
  
  
      if (this.birdSpeed >= 2.5) {
        line(this.birdX - this.birdWidth * 0.9,
          this.birdY + this.birdHeight * 0.4,
          this.birdX - this.birdWidth * 0.4,
          this.birdY + this.birdHeight * 0.4);
  
        line(this.birdX - this.birdWidth * 0.7,
          this.birdY + this.birdHeight * 0.6,
          this.birdX - this.birdWidth * 0.4,
          this.birdY + this.birdHeight * 0.6);
  
        line(this.birdX - this.birdWidth * 0.9,
          this.birdY + this.birdHeight * 0.8,
          this.birdX - this.birdWidth * 0.4,
          this.birdY + this.birdHeight * 0.8);
      }
  
  
    }
  }