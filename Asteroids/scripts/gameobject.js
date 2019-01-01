"use strict"
class GameObject {
	
	constructor() {
		this.visible = false;
		this.location = new Vector2D(0.0, 0.0);
		this.orientation = new Vector2D(0.0, 0.0);
		this.rotation = 0.0;
		this.rotating = 0;
		this.velocity = new Vector2D(0.0, 0.0);
		this.deceleration = 0.0;
		this.acceleration = 0.0;
		this.accelerating = 0;
	}
}