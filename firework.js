function Firework(_col,_pos) {

    // Color of this firework is the color passed to this object.
    this.col = _col;
    
    // The starting position of this firework 
      // is the position passed to this object. 
    this.pos = _pos;
    
    // In the beginning, this firework has not exploded
    this.exploded = false;
    
    // Create a new array for all the particles of the firework
    this.particles = [];
  
    // Create a new particle object with the position and color of
    // this firework. This new particle is the firework before explosion
    this.firework = new Particle(this.pos, height/2, this.col, true);
    
      // Determine whether the firework can be deleted from the array
    this.done = function() {
      
      // If the firework has exploded and particles array is empty..
      if (this.exploded && this.particles.length == 0) {
        
        // ..the firework is done.
        return true;
        
        //  otherwise the firework is not done.
      } else {
        return false;
      }
    }
  
    // Update the values of this firework
    this.update = function() {
      
      // If the firework has not exploded
      if (!this.exploded) {
        
        // apply gravity to the firework
        this.firework.applyForce(gravity);
        
        // and update the firework's position
        this.firework.update();
        
        // If the firework has reached its maximum height and stopped
        if (this.firework.vel.y > 0) {
          
          // Explode the firework and set that it has exploded
          this.explode();
          this.exploded = true;
        }
      }
      
      // Repeat for every particle of this firework
      for (var i = this.particles.length - 1; i >= 0; i--) {
        
        // Apply gravity to this particle
        this.particles[i].applyForce(gravity);
        
        // Update the values of this particle
        this.particles[i].update();
        
        // If this particle is not visible anymore
        if (this.particles[i].done()) {
          
          // Delete it from the array to free some memory
          this.particles.splice(i, 1);
        }
      }
  
    }
  
    // Explode the firework
    this.explode = function() {
  
      // Create 100 particles to the position of the firework
          // and give them the color they were by function pickColor()
      // and add them to the particles array
      for (var i = 0; i < 100; i++) {
        var p = new Particle(this.firework.pos.x, this.firework.pos.y, this.col, false);
        this.particles.push(p);
      }
    }
  
    // Show the firework on the drawing area
    this.show = function() {
      
      // If the firework has not exploded
      if (!this.exploded) {
        
        // Show the firework on the drawing area
        this.firework.show();
      }
      
      // If there is particles in the array, show all of them
      for (var i = 0; i < this.particles.length; i++) {
        this.particles[i].show();
      }
    }
  }