"use strict"
class GameObject {
	
	constructor() {
		this.visible = false;
		this.location = new Vector2D(0.0, 0.0);
		this.orientation = new Vector2D(0.0, 0.0);
		this.rotation = 0.0;
		this.rotating = 0;
		this.velocity = new Vector2D(0.0, 0.0);
		this.angularVelocity = 0.0;
		this.deceleration = 0.0;
		this.acceleration = 0.0;
		this.accelerating = 0;
		this.boundingBox = new Rect(0.0, 0.0, 0.0, 0.0);
		this.scale = 1.0;
	}
	
	drawBoundingBox(x, y)
	{
		this.context.save();
		this.context.transform(this.scale, 0.0, 0.0, this.scale, x, y);
		this.context.beginPath();
		this.context.strokeStyle = "#990099";
		this.context.lineWidth = 3;
		this.context.moveTo(this.boundingBox.x, this.boundingBox.y);
		this.context.lineTo(this.boundingBox.x + this.boundingBox.width, this.boundingBox.y);
		this.context.lineTo(this.boundingBox.x + this.boundingBox.width, this.boundingBox.y + this.boundingBox.height);
		this.context.lineTo(this.boundingBox.x, this.boundingBox.y + this.boundingBox.height);
		this.context.lineTo(this.boundingBox.x, this.boundingBox.y);
		this.context.stroke();
		this.context.restore();
	}
}