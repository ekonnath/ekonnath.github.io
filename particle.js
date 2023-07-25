function Particle(x, y, sparkCol, firework) {

    // Give the particle a position that was passed to it
    this.pos = createVector(x, y);
    
    // This firework is the "root" firework
    this.firework = firework;
    
    // Set the lifespan of this particle to maximum
    this.lifespan = 255;
    
    // Set the color of the root firework to orange
    this.col = color(226, 88, 34);
    
    // At first, the acceleration of this particle is 0
    this.acc = createVector(0, 0);
    
    // Set the color of the firework after the explosion to
      // the color passed to it
    this.sparkColor = sparkCol;
    
    // If this is the root firework
    if (this.firework) {
      
      // Set the firework's velocity to a random 
          // value between 6 and 9 pointing up
      this.vel = createVector(0, random(-6, -12));
    } else {
      
      // Set the direction of the explosion particles to random
      this.vel = p5.Vector.random2D();
      
      // Multiply the magnitude of the explosion particles
          // with a random number between 1 and 2 to make the
          // explosion particles form a more realistic explosion shape
      this.vel.mult(random(1, 2));
    }
  
    // Apply forces to this particle
    this.applyForce = function(force) {
      this.acc.add(force);
    }
  
    // Update the values of this particle
    this.update = function() {
      
      // If this is not the root firework
      if (!this.firework) {
        
        // Slow down this particles speed
        this.vel.mult(0.983);
        
        // Make the lifespan smaller
        this.lifespan -= 2;
      }
      
      // Calculate the position of this particle
      this.vel.add(this.acc);
      this.pos.add(this.vel);
      this.acc.mult(0);
    }
  
    // Determine if this particle can be deleted
    this.done = function() {
      
      // If the lifespan value is less than 25
      if (this.lifespan < 25) {
        
        // this particle can be deleted
        return true;
        
        // otherwise this particle can't be deleted
      } else {
        return false;
      }
    }
    
    // Show this particle on the drawing
    this.show = function() {
      
      // If this is not the root firework
      if (!this.firework) {
        
        // Set the particle size to 3 pixels
        strokeWeight(3);
        
        // Give these particles the color determined by pickColor()
        this.sparkColor = color(red(this.sparkColor), green(this.sparkColor), blue(this.sparkColor), this.lifespan);
        stroke(this.sparkColor);
        
      } else {
        
        // If this is the root firework, set the particle size
              // to 4 pixels and use the orange color
        strokeWeight(4);
        stroke(this.col);
      }
      
      // Draw the particle on the drawing
      point(this.pos.x, this.pos.y);
    }
  
  }