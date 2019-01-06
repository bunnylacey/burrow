"use strict"
class Ship extends GameObject
{
	constructor()
	{
		super();
		this.canvas = canvas;
		this.context = canvas.getContext('2d');
		this.acceleration = 0.1;
		this.deceleration = 0.99;
		this.animStep = 0;
	}
	
	tick(delta)
	{
		if(this.visible)
		{
			this.rotation += 0.1 * delta * this.rotating;
			if(this.rotation < 0.0 || this.rotation > Math.PI * 2.0)
			{
				this.rotation = (this.rotation + Math.PI * 2.0) % (Math.PI * 2.0);
			}
			this.orientation.x = Math.cos(this.rotation);
			this.orientation.y = Math.sin(this.rotation);
			
			if(this.accelerating)
			{
				this.velocity.x += this.acceleration * delta * this.orientation.x;
				this.velocity.y += this.acceleration * delta * this.orientation.y;
				Vector2D.max(this.velocity, 10.0);
			} else {
				this.velocity.x *= (Math.pow(this.deceleration, Math.floor(delta)) - (1.0 - this.deceleration) * (delta - Math.floor(delta)));
				this.velocity.y *= (Math.pow(this.deceleration, Math.floor(delta)) - (1.0 - this.deceleration) * (delta - Math.floor(delta)));
				if(Vector2D.length(this.velocity) < 0.01) {
					this.velocity.x = 0.0;
					this.velocity.y = 0.0;
				}
			}
			
			
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
	
	draw()
	{
		if(!this.visible) {
			return;
		}
		if(this.canvas == undefined)
		{
			console.log(typeof(this) + " : canvas undefined");
			return;
		}
		this.context.save();
		this.context.transform(1.0, 0.0, 0.0, 1.0, this.location.x, this.location.y);
		this.context.rotate(this.rotation);
		this.context.beginPath();
		this.context.strokeStyle = "#FFFFFF";
		this.context.lineWidth = 3;
		this.context.moveTo(15.0, 0.0);
		this.context.lineTo(-15.0, 10.0);
		this.context.lineTo(-10.0, 0.0);
		this.context.lineTo(-15.0, -10.0);
		this.context.lineTo(15.0, 0.0);
		if(this.accelerating > 0.0)
		{
			this.animStep += 1;
			if(this.animStep % 7 < 5)
			{
				this.context.moveTo(-12.5, -5.0);
				this.context.lineTo(-20.0, 0.0);
				this.context.lineTo(-12.5, 5.0);
			}
		} else {
			this.animStep = 0;
		}
		
		this.context.stroke();
		this.context.restore();
		
		this.context.save();
		this.context.transform(1.0, 0.0, 0.0, 1.0, this.location.x, this.location.y);
		this.context.beginPath();
		this.context.strokeStyle = "#00FF00";
		this.context.lineWidth = 3;
		this.context.moveTo(0.0, 0.0);
		this.context.lineTo(this.velocity.x * 10.0, this.velocity.y * 10.0);
		this.context.stroke();
		this.context.beginPath();
		this.context.strokeStyle = "#FFFF00";
		this.context.lineWidth = 3;
		this.context.moveTo(0.0, 0.0);
		this.context.lineTo(this.orientation.x * 100.0, this.orientation.y * 100.0);
		this.context.stroke();
		this.context.restore();
		
	}
}