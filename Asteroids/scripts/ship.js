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
		this.orientation.x = 1.0;
		this.vertices = new Array(4);
		this.vertices[0] = new Vector2D(15.0, 0.0);
		this.vertices[1] = new Vector2D(-15.0, 10.0);
		this.vertices[2] = new Vector2D(-10.0, 0.0);
		this.vertices[3] = new Vector2D(-15.0, -10.0);
		this.updateBoundingBox();
	}
	
	tick(delta)
	{
		if(this.visible)
		{
			if(this.rotating != 0.0)
			{
				this.rotation += 0.1 * delta * this.rotating;
				if(this.rotation < 0.0 || this.rotation > Math.PI * 2.0)
				{
					this.rotation = (this.rotation + Math.PI * 2.0) % (Math.PI * 2.0);
				}
				this.orientation.x = Math.cos(this.rotation);
				this.orientation.y = Math.sin(this.rotation);
				this.updateBoundingBox();
			}
			
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
	
	draw(debugDraw = false)
	{
		if(!this.visible || this.canvas == undefined) {
			return;
		}
		
		if(this.accelerating > 0.0)
		{
			this.animStep += 1;
		} else {
			this.animStep = 0;
		}
		
		this.drawShip(this.location.x, this.location.y);
		if(debugDraw)
		{
			this.drawBoundingBox(this.location.x, this.location.y);
			this.drawVelocityAndOrientation(this.location.x, this.location.y);
		}
		
		if(this.location.x + this.boundingBox.x < 0.0)
		{
			this.drawShip(this.location.x + this.canvas.width, this.location.y);
			if(debugDraw)
			{
				this.drawBoundingBox(this.location.x + this.canvas.width, this.location.y);
				this.drawVelocityAndOrientation(this.location.x + this.canvas.width, this.location.y);
			}
		}
		if(this.location.y + this.boundingBox.y < 0.0)
		{
			this.drawShip(this.location.x, this.location.y + this.canvas.height);
			if(debugDraw)
			{
				this.drawBoundingBox(this.location.x, this.location.y + this.canvas.height);
				this.drawVelocityAndOrientation(this.location.x, this.location.y + this.canvas.height);
			}
		}
		if(this.location.x + this.boundingBox.width >= this.canvas.width)
		{
			this.drawShip(this.location.x - this.canvas.width, this.location.y);
			if(debugDraw)
			{
				this.drawBoundingBox(this.location.x - this.canvas.width, this.location.y);
				this.drawVelocityAndOrientation(this.location.x - this.canvas.width, this.location.y);
			}
		}
		if(this.location.y + this.boundingBox.height >= this.canvas.height)
		{
			this.drawShip(this.location.x, this.location.y - this.canvas.height);
			if(debugDraw)
			{
				this.drawBoundingBox(this.location.x, this.location.y - this.canvas.height);
				this.drawVelocityAndOrientation(this.location.x, this.location.y - this.canvas.height);
			}
		}
	}
	
	drawShip(x, y)
	{
		this.context.save();
		this.context.transform(this.scale, 0.0, 0.0, this.scale, x, y);
		this.context.rotate(this.rotation);
		this.context.beginPath();
		this.context.strokeStyle = "#FFFFFF";
		this.context.lineWidth = 3;
		this.context.moveTo(this.vertices[this.vertices.length - 1].x, this.vertices[this.vertices.length - 1].y);
		for(var i = 0; i < this.vertices.length; i++)
		{
			this.context.lineTo(this.vertices[i].x, this.vertices[i].y);
		}
		if(this.accelerating > 0.0)
		{
			this.animStep += 1;
			if(this.animStep % 7 < 5)
			{
				this.context.moveTo(-12.5, -5.0);
				this.context.lineTo(-20.0, 0.0);
				this.context.lineTo(-12.5, 5.0);
			}
		} 
		this.context.stroke();
		this.context.restore();
	}
	
	drawVelocityAndOrientation(x, y)
	{
		this.context.save();
		this.context.transform(this.scale, 0.0, 0.0, this.scale, x, y);
		this.context.beginPath();
		this.context.strokeStyle = "#00FF00";
		this.context.lineWidth = 3;
		this.context.moveTo(0.0, 0.0);
		this.context.lineTo(this.velocity.x * 10.0, this.velocity.y * 10.0);
		this.context.stroke();
		/*this.context.beginPath();
		this.context.strokeStyle = "#FFFF00";
		this.context.lineWidth = 3;
		this.context.moveTo(0.0, 0.0);
		this.context.lineTo(this.orientation.x * 100.0, this.orientation.y * 100.0);
		this.context.stroke();*/
		this.context.restore();
	}
}