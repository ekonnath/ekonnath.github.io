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