"use strict"
class GameSession
{
	constructor()
	{
		// timing variables
		this.currentTime = performance.now();
		this.lastTime = this.currentTime;
		this.updateTime = this.currentTime;
		this.updateInterval = 500.0;
		this.frameCount = 0;
		this.targetFPS = 1000.0 / 60.0;    // Target frames per second
		this.actualFPS = 0.0;
		this.delta = 1.0;            // delta time multiplier between each frame
		
		// player variables
		this.score = 0;
		this.lives = 5;
		
		this.level = 0;
		
		this.reset();
	}
	
	reset()
	{
		this.currentTime = performance.now();
		this.lastTime = this.currentTime;
		this.frameCount = 0;
		this.delta = 1.0;
		
		this.score = 0;
		this.lives = 5;
		
		this.level= 0;
	}
    
	// update function
    update()
	{
        // update local time values, delta variable, and fps counter
        this.currentTime = performance.now();
        if (this.currentTime - this.updateTime > this.updateInterval) {
            this.actualFPS = Math.round(this.frameCount / ((this.currentTime - this.updateTime) / 1000.0));
            this.updateTime = this.currentTime;
			this.frameCount = 0;
        }
        this.delta = (this.currentTime - this.lastTime) / this.targetFPS;
        this.lastTime = this.currentTime;
        this.frameCount++;
	}
}