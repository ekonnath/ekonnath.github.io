class Boat {
    constructor(x, y, boatWidth, boatDirection) {
      this.boatX = x;
      this.boatY = y
      this.boatWidth = boatWidth;
      this.boatHeight = boatWidth * 0.20;
      this.boatDirection = boatDirection;
      this.boatSpeed = random(0.1, 0.5);
  
    }
  
    animation() {
      if (this.boatDirection) {
        this.boatX += this.boatSpeed;
      } else if (!this.boatDirection) {
        this.boatX -= this.boatSpeed;
      }
  
      this.drawBoat(this.boatX, this.boatY)
  
      if (this.boatX > width + this.boatWidth && this.boatDirection) {
        this.boatX = 0 - this.boatWidth;
        this.boatSpeed = random(0.1, 0.5);
      } else if (this.boatX < 0 - this.boatWidth && !this.boatDirection) {
        this.boatX = width + this.boatWidth;
        this.boatSpeed = random(0.1, 0.5);
      }
    }
  
    drawBoat() {
      fill(255);
      noStroke();
      strokeWeight(1);
  
      fill(153, 123, 77);
      // body
      rect(this.boatX, this.boatY, this.boatWidth, -this.boatHeight);
      
      fill(128, 97, 51);
      rect(this.boatX + this.boatWidth * .15, 
        this.boatY,
        this.boatWidth*0.70, 
        this.boatHeight*0.3);
      
        // sides
      rect(this.boatX, this.boatY - this.boatHeight,
        this.boatWidth*0.10,-this.boatHeight*0.2);
      rect(this.boatX+this.boatWidth - this.boatWidth*0.1,
        this.boatY-this.boatHeight,
        this.boatWidth*0.1, -this.boatHeight*0.2)
  
      fill(255);
      
      // flags
  
      triangle(this.boatX + this.boatWidth*0.5, this.boatY+this.boatHeight*-3.65,
        this.boatX + this.boatWidth*0.5, this.boatY-this.boatHeight*1.5,
        this.boatX + this.boatWidth*0.25, this.boatY-this.boatHeight*1.5)
      
      triangle(this.boatX + this.boatWidth*0.51, this.boatY+this.boatHeight*-3.65,
        this.boatX + this.boatWidth*0.51, this.boatY-this.boatHeight*1.5,
        this.boatX + this.boatWidth*0.75, this.boatY-this.boatHeight*1.5)
  
      // flag pole
  
      fill(128, 97, 51);
      rect(this.boatX + this.boatWidth*0.5, this.boatY-this.boatHeight,
        this.boatWidth*0.01, this.boatHeight*-2.8);
      ellipseMode(CENTER);
      ellipse(this.boatX + this.boatWidth*0.505, this.boatY + this.boatHeight*-3.85, 
        this.boatWidth * 0.025, this.boatWidth * 0.025);
      
      }
    }