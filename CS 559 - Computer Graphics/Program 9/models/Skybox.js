"use strict"
// skybox class
// xyz origin point
// w x l from center of origin
// gl graphics object
// vertex color
// tx - model transform
// name associated with object
class Skybox {
    constructor(gl, tx, name) {
        this.gl = gl;
        this.tx = tx;
        this.name = name || "Skybox";
        // verts
        this.vertexPos = new Float32Array(
            [1, 1, 1, -1, 1, 1, -1, -1, 1, 1, -1, 1,
                1, 1, 1, 1, -1, 1, 1, -1, -1, 1, 1, -1,
                1, 1, 1, 1, 1, -1, -1, 1, -1, -1, 1, 1,
                -1, 1, 1, -1, 1, -1, -1, -1, -1, -1, -1, 1,
                -1, -1, -1, 1, -1, -1, 1, -1, 1, -1, -1, 1,
                1, -1, -1, -1, -1, -1, -1, 1, -1, 1, 1, -1]);

        // colors
        this.vertexColors = new Float32Array(
            [0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,
                1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0,
                0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0,
                1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0,
                1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1,
                0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1]);

        // vertex texture coordinates
        this.vertexTexCoords = new Float32Array(
            [0, 0, 1, 0, 1, 1, 0, 1,
                1, 0, 1, 1, 0, 1, 0, 0,
                0, 1, 0, 0, 1, 0, 1, 1,
                0, 0, 1, 0, 1, 1, 0, 1,
                1, 1, 0, 1, 0, 0, 1, 0,
                1, 1, 0, 1, 0, 0, 1, 0]);

        // tris
        this.triangleIndices = new Uint8Array(
            [0, 1, 2, 0, 2, 3,    // front
                4, 5, 6, 4, 6, 7,    // right
                8, 9, 10, 8, 10, 11,    // top
                12, 13, 14, 12, 14, 15,    // left
                16, 17, 18, 16, 18, 19,    // bottom
                20, 21, 22, 20, 22, 23]); // back

        // add buffers to webgl
        // vertecies
        this.vertexBuff = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuff);
        gl.bufferData(gl.ARRAY_BUFFER, this.vertexPos, gl.STATIC_DRAW);
        this.vertexBuff.itemSize = 3;
        this.vertexBuff.numItems = 24;

        // colors
        this.colorBuff = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuff);
        gl.bufferData(gl.ARRAY_BUFFER, this.vertexColors, gl.STATIC_DRAW);
        this.colorBuff.itemSize = 3;
        this.colorBuff.numItems = 24;

        // a buffer for textures
        this.texBuff = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.texBuff);
        gl.bufferData(gl.ARRAY_BUFFER, this.vertexTexCoords, gl.STATIC_DRAW);
        this.texBuff.itemSize = 2;
        this.texBuff.numItems = 24;

        // triangle indicies
        this.indexBuff = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuff);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.triangleIndices, gl.STATIC_DRAW);
    }
}