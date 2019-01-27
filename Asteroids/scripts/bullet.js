"use strict"
class Bullet extends GameObject
{
	constructor(canvas)
	{
		super();
		this.canvas = canvas;
		this.context = canvas.getContext('2d');
		this.radius = 5.0;
		this.updateBoundingBox();
		this.lifetime = 0.0;
	}
	
	tick(delta)
	{
		if(this.visible)
		{
			this.lifetime -= delta;
			this.visible = this.lifetime >= 0.0;
			
			this.location.x += this.velocity.x * delta;
			this.location.y += this.velocity.y * delta;
			
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
	
	draw(debugDraw = false)
	{
		if(!this.visible || this.canvas == undefined) {
			return;
		}
		
		this.drawBullet(this.location.x, this.location.y);
		if(debugDraw)
			this.drawBoundingBox(this.location.x, this.location.y);
		
		if(this.location.x + this.boundingBox.x < 0.0)
		{
			this.drawBullet(this.location.x + this.canvas.width, this.location.y);
			if(debugDraw)
				this.drawBoundingBox(this.location.x + this.canvas.width, this.location.y);
		}
		if(this.location.y + this.boundingBox.y < 0.0)
		{
			this.drawBullet(this.location.x, this.location.y + this.canvas.height);
			if(debugDraw)
				this.drawBoundingBox(this.location.x, this.location.y + this.canvas.height);
		}
		if(this.location.x + this.boundingBox.width >= this.canvas.width)
		{
			this.drawBullet(this.location.x - this.canvas.width, this.location.y);
			if(debugDraw)
				this.drawBoundingBox(this.location.x - this.canvas.width, this.location.y);
		}
		if(this.location.y + this.boundingBox.height >= this.canvas.height)
		{
			this.drawBullet(this.location.x, this.location.y - this.canvas.height);
			if(debugDraw)
				this.drawBoundingBox(this.location.x, this.location.y - this.canvas.height);
		}
	}
	
	drawBullet(x, y)
	{
		this.context.save();
		this.context.transform(this.scale, this.orientation.x, this.orientation.y, this.scale, x, y);
		this.context.beginPath();
		this.context.strokeStyle = "#FFFFFF";
		this.context.lineWidth = 3;
		this.context.arc(0, 0, 5, 0, 2 * Math.PI);
		this.context.stroke();
		this.context.restore();
	}
	
	updateBoundingBox()
	{
		this.boundingBox.x = -this.radius;
		this.boundingBox.y = -this.radius;
		this.boundingBox.width = this.radius * 2;
		this.boundingBox.height = this.radius * 2;
	}
}