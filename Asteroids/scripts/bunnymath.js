"use strict"
class Vector2D {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
	
	static length(vec) {
		return Math.sqrt(vec.x * vec.x + vec.y * vec.y);
	}
	
	static dot(vec1, vec2) {
		return vec1.x * vec2.x + vec1.y * vec2.y;
	}
	
	static sign(vec1, vec2, vec3) {
		return (vec1.x - vec3.x) * (vec2.y - vec3.y) - (vec2.x - vec3.x) * (vec1.y - vec3.y);
	}
	
	// keeps magnitude of vec below val
	static max(vec, val) {
		var len = Vector2D.length(vec);
		if(len > val) {
			Vector2D.normalize(vec);
			vec.x *= val;
			vec.y *= val;
		}
		return vec;
	}
	
	// makes vec unit length
	static normalize(vec) {
		var len = Vector2D.length(vec);
		if(len != 0.0) {
			vec.x = vec.x / len;
			vec.y = vec.y / len;
		}
		return vec;
	}
}

class Matrix4 {
	constructor(a, b, c, d)
	{
		this.a = a;
		this.b = b;
		this.c = c;
		this.d = d;
	}
	
	static identity()
	{
		return new Matrix4(1, 0, 1, 0);
	}
	
	static getRotationMatrix(radians)
	{
		return new Matrix4(Math.cos(radians), -Math.sin(radians), Math.sin(radians), Math.cos(radians));
	}
	
	static transformPoint(matrix, vec)
	{
		return new Vector2D(vec.x * matrix.a + vec.y * matrix.b, vec.x * matrix.c + vec.y * matrix.d);
	}
}

class Rect {
	constructor(x, y, width, height)
	{
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
	}
	
	static getTranslation(rect, vec)
	{
		return new Rect(rect.x + vec.x, rect.y + vec.y, rect.width, rect.height);
	}
	
	static isOverlapping(rect1, rect2)
	{
		var topLeft = new Vector2D(Math.min(rect1.x, rect2.x), Math.min(rect1.y, rect2.y));
		
		var bottomRight = new Vector2D(Math.max(rect1.x + rect1.width, rect2.x + rect2.width), Math.max(rect1.y + rect1.height, rect2.y + rect2.height));
		
		var cond1 = bottomRight.x <= topLeft.x + rect1.width + rect2.width;
		var cond2 = topLeft.x >= bottomRight.x - rect1.width - rect2.width;
		var cond3 = bottomRight.y <= topLeft.y + rect1.height + rect2.height;
		var cond4 = topLeft.y >= bottomRight.y - rect1.height - rect2.height;
		
		return cond1 && cond2 && cond3 && cond4;
	}
}