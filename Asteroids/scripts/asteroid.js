"use strict"
class Asteroid extends GameObject
{
	constructor(canvas)
	{
		super();
		this.canvas = canvas;
		this.context = canvas.getContext('2d');
		this.vertices = new Array(12);
		this.maxMagnitude = 30.0;
		this.minMagnitude = 20.0;
		this.randomizeVertices();
	}
	
	tick(delta)
	{
		if(this.visible)
		{
			this.location.x += this.velocity.x * delta;
			this.location.y += this.velocity.y * delta;
			
			if(this.angularVelocity != 0.0)
			{
				this.rotation += this.angularVelocity * delta;
				this.updateBoundingBox();
			}
			
			if(this.location.x < 0.0 || this.location.x > this.canvas.width)
			{
				this.location.x = (this.location.x + this.canvas.width) % this.canvas.width;
			}
			if(this.location.y < 0.0 || this.location.y > this.canvas.height)
			{
				this.location.y = (this.location.y + this.canvas.height) % this.canvas.height;
			}
		}
	}
	
	updateBoundingBox()
	{
		this.boundingBox.x = 0.0;
		this.boundingBox.y = 0.0;
		this.boundingBox.width = 0.0;
		this.boundingBox.height = 0.0;
		for(var i = 0; i < this.vertices.length; i++)
		{
			var tempPoint = Matrix4.transformPoint(Matrix4.getRotationMatrix(this.rotation), this.vertices[i]);
			this.boundingBox.x = Math.min(tempPoint.x, this.boundingBox.x);
			this.boundingBox.y = Math.min(tempPoint.y, this.boundingBox.y);
			this.boundingBox.width = Math.max(tempPoint.x, this.boundingBox.width);
			this.boundingBox.height = Math.max(tempPoint.y, this.boundingBox.height);
		}
		this.boundingBox.width = this.boundingBox.width - this.boundingBox.x;
		this.boundingBox.height = this.boundingBox.height - this.boundingBox.y;
	}
	
	randomizeVertices()
	{
		var interval = Math.PI * 2 / this.vertices.length;
		for(var i = 0; i < this.vertices.length; i++)
		{
			var magnitude = Math.random() * (this.maxMagnitude - this.minMagnitude) + this.minMagnitude;
			this.vertices[i] = new Vector2D(Math.cos(interval * i) * magnitude, Math.sin(interval * i) * magnitude);
		}
		this.updateBoundingBox();
	}
	
	draw(debugDraw = false)
	{
		if(!this.visible || this.canvas == undefined) {
			return;
		}
		
		this.drawAsteroid(this.location.x, this.location.y);
		
		if(debugDraw)
			this.drawBoundingBox(this.location.x, this.location.y);
		
		if(this.location.x + this.boundingBox.x < 0.0)
		{
			this.drawAsteroid(this.location.x + this.canvas.width, this.location.y);
			if(debugDraw)
				this.drawBoundingBox(this.location.x + this.canvas.width, this.location.y);
		}
		if(this.location.y + this.boundingBox.y < 0.0)
		{
			this.drawAsteroid(this.location.x, this.location.y + this.canvas.height);
			if(debugDraw)
				this.drawBoundingBox(this.location.x, this.location.y + this.canvas.height);
		}
		if(this.location.x + this.boundingBox.width >= this.canvas.width)
		{
			this.drawAsteroid(this.location.x - this.canvas.width, this.location.y);
			if(debugDraw)
				this.drawBoundingBox(this.location.x - this.canvas.width, this.location.y);
		}
		if(this.location.y + this.boundingBox.height >= this.canvas.height)
		{
			this.drawAsteroid(this.location.x, this.location.y - this.canvas.height);
			if(debugDraw)
				this.drawBoundingBox(this.location.x, this.location.y - this.canvas.height);
		}
	}
	
	drawAsteroid(x, y)
	{
		this.context.save();
		this.context.transform(this.scale, this.orientation.x, this.orientation.y, this.scale, x, y);
		this.context.rotate(this.rotation);
		this.context.beginPath();
		this.context.strokeStyle = "#FFFFFF";
		this.context.lineWidth = 3;
		this.context.moveTo(this.vertices[this.vertices.length - 1].x, this.vertices[this.vertices.length - 1].y);
		for(var i = 0; i < this.vertices.length; i++)
		{
			this.context.lineTo(this.vertices[i].x, this.vertices[i].y);
		}
		this.context.stroke();
		this.context.restore();
	}
}