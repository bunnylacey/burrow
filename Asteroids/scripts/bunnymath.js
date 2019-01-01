"use strict"
class Vector2D {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
	
	static length(vec) {
		return Math.sqrt(vec.x * vec.x + vec.y * vec.y);
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