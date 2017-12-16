// icosahedron class definition
// xyz is origin point of object, r is circumscribed radius
// gl graphics object
// vertex color
// tx - model transform
// name of this object
class Icosahedron {
    constructor(x, y, z, r, gl, color, tx, name) {
        this.trajectory = [0.0, 0.0, 0.0];
        this.position = [x, y, z];
        this.velocities = [0.0, 0.0, 0.0];
        this.r = r;
        this.rtx = m4.identity();
        this.gl = gl;
        this.color = color;
        this.tx = tx;
        this.name = name || "Icosahedron";
        // radian intervals for vertex points
        var lonSpacing = Math.PI / 5;
        var latSpacing = Math.atan(1 / 2);

        // verticies

        this.vertexPos2 = new Float32Array([x, y + r, z,
            x + r * Math.cos(latSpacing) * Math.cos(0), y - r * Math.sin(latSpacing), z + r * Math.cos(latSpacing) * Math.sin(0),
            x + r * Math.cos(latSpacing) * Math.cos(lonSpacing), y + r * Math.sin(latSpacing), z + r * Math.cos(latSpacing) * Math.sin(lonSpacing),
            x + r * Math.cos(latSpacing) * Math.cos(lonSpacing * 2), y - r * Math.sin(latSpacing), z + r * Math.cos(latSpacing) * Math.sin(lonSpacing * 2),
            x + r * Math.cos(latSpacing) * Math.cos(lonSpacing * 3), y + r * Math.sin(latSpacing), z + r * Math.cos(latSpacing) * Math.sin(lonSpacing * 3),
            x + r * Math.cos(latSpacing) * Math.cos(lonSpacing * 4), y - r * Math.sin(latSpacing), z + r * Math.cos(latSpacing) * Math.sin(lonSpacing * 4),
            x + r * Math.cos(latSpacing) * Math.cos(lonSpacing * 5), y + r * Math.sin(latSpacing), z + r * Math.cos(latSpacing) * Math.sin(lonSpacing * 5),
            x + r * Math.cos(latSpacing) * Math.cos(lonSpacing * 6), y - r * Math.sin(latSpacing), z + r * Math.cos(latSpacing) * Math.sin(lonSpacing * 6),
            x + r * Math.cos(latSpacing) * Math.cos(lonSpacing * 7), y + r * Math.sin(latSpacing), z + r * Math.cos(latSpacing) * Math.sin(lonSpacing * 7),
            x + r * Math.cos(latSpacing) * Math.cos(lonSpacing * 8), y - r * Math.sin(latSpacing), z + r * Math.cos(latSpacing) * Math.sin(lonSpacing * 8),
            x + r * Math.cos(latSpacing) * Math.cos(lonSpacing * 9), y + r * Math.sin(latSpacing), z + r * Math.cos(latSpacing) * Math.sin(lonSpacing * 9),
            x, y - r, z]);

        // normals

        this.vertexNormals2 = new Float32Array([0, 1, 0,
            Math.cos(latSpacing) * Math.cos(0), -Math.sin(latSpacing), Math.cos(latSpacing) * Math.sin(0),
            Math.cos(latSpacing) * Math.cos(lonSpacing), Math.sin(latSpacing), Math.cos(latSpacing) * Math.sin(lonSpacing),
            Math.cos(latSpacing) * Math.cos(lonSpacing * 2), -Math.sin(latSpacing), Math.cos(latSpacing) * Math.sin(lonSpacing * 2),
            Math.cos(latSpacing) * Math.cos(lonSpacing * 3), Math.sin(latSpacing), Math.cos(latSpacing) * Math.sin(lonSpacing * 3),
            Math.cos(latSpacing) * Math.cos(lonSpacing * 4), -Math.sin(latSpacing), Math.cos(latSpacing) * Math.sin(lonSpacing * 4),
            Math.cos(latSpacing) * Math.cos(lonSpacing * 5), Math.sin(latSpacing), Math.cos(latSpacing) * Math.sin(lonSpacing * 5),
            Math.cos(latSpacing) * Math.cos(lonSpacing * 6), -Math.sin(latSpacing), Math.cos(latSpacing) * Math.sin(lonSpacing * 6),
            Math.cos(latSpacing) * Math.cos(lonSpacing * 7), Math.sin(latSpacing), Math.cos(latSpacing) * Math.sin(lonSpacing * 7),
            Math.cos(latSpacing) * Math.cos(lonSpacing * 8), -Math.sin(latSpacing), Math.cos(latSpacing) * Math.sin(lonSpacing * 8),
            Math.cos(latSpacing) * Math.cos(lonSpacing * 9), Math.sin(latSpacing), Math.cos(latSpacing) * Math.sin(lonSpacing * 9),
            0, -1, 0]);

        // vertex colors

        this.vertexColors2 = new Float32Array([
           this.color[0], this.color[1], this.color[2],
           this.color[0], this.color[1], this.color[2],
           this.color[0], this.color[1], this.color[2],
           this.color[0], this.color[1], this.color[2],
           this.color[0], this.color[1], this.color[2],
           this.color[0], this.color[1], this.color[2],
           this.color[0], this.color[1], this.color[2],
           this.color[0], this.color[1], this.color[2],
           this.color[0], this.color[1], this.color[2],
           this.color[0], this.color[1], this.color[2],
           this.color[0], this.color[1], this.color[2],
           this.color[0], this.color[1], this.color[2]]);

        // vertex texture coordinates

        this.vertexTexCoords2 = new Float32Array(
            [0.5, 0.0, 0.0, 1.0, 1.0, 1.0]);

        this.triangleIndices2 = new Uint8Array(
            [0, 2, 4,
                0, 4, 6,
                0, 6, 8,
                0, 8, 10,
                0, 10, 2,
                1, 2, 3,
                2, 3, 4,
                3, 4, 5,
                4, 5, 6,
                5, 6, 7,
                6, 7, 8,
                7, 8, 9,
                8, 9, 10,
                9, 10, 1,
                10, 1, 2,
                11, 1, 3,
                11, 3, 5,
                11, 5, 7,
                11, 7, 9,
                11, 9, 1]);

        // Need to loop and create unique verticies, normals, colorvals, and tex coords for each triangle
        this.vertexPos = new Float32Array(this.triangleIndices2.length * 3);
        this.vertexNormals = new Float32Array(this.triangleIndices2.length * 3);
        this.vertexColors = new Float32Array(this.triangleIndices2.length * 3);
        this.vertexTexCoords = new Float32Array(this.triangleIndices2.length * 2);
        this.triangleIndices = new Uint8Array(this.triangleIndices2.length);

        for (var i = 0; i < this.triangleIndices2.length; i++) {
            this.vertexPos[i * 3] = this.vertexPos2[this.triangleIndices2[i] * 3];
            this.vertexPos[i * 3 + 1] = this.vertexPos2[this.triangleIndices2[i] * 3 + 1];
            this.vertexPos[i * 3 + 2] = this.vertexPos2[this.triangleIndices2[i] * 3 + 2];

            this.vertexNormals[i * 3] = this.vertexNormals2[this.triangleIndices2[i] * 3];
            this.vertexNormals[i * 3 + 1] = this.vertexNormals2[this.triangleIndices2[i] * 3 + 1];
            this.vertexNormals[i * 3 + 2] = this.vertexNormals2[this.triangleIndices2[i] * 3 + 2];

            this.vertexColors[i * 3] = this.vertexColors2[this.triangleIndices2[i] * 3];
            this.vertexColors[i * 3 + 1] = this.vertexColors2[this.triangleIndices2[i] * 3 + 1];
            this.vertexColors[i * 3 + 2] = this.vertexColors2[this.triangleIndices2[i] * 3 + 2];

            this.vertexTexCoords[i * 2] = this.vertexTexCoords2[(i * 2 + 6) % 6];
            this.vertexTexCoords[i * 2 + 1] = this.vertexTexCoords2[(i * 2 + 7) % 6];

            this.triangleIndices[i] = i;
        }

        // add buffers to webgl
        // vertecies
        this.vertexBuff = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuff);
        gl.bufferData(gl.ARRAY_BUFFER, this.vertexPos, gl.STATIC_DRAW);
        this.vertexBuff.itemSize = 3;
        this.vertexBuff.numItems = 60;

        // normals
        this.normalBuff = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.normalBuff);
        gl.bufferData(gl.ARRAY_BUFFER, this.vertexNormals, gl.STATIC_DRAW);
        this.normalBuff.itemSize = 3;
        this.normalBuff.numItems = 60;

        // colors
        this.colorBuff = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuff);
        gl.bufferData(gl.ARRAY_BUFFER, this.vertexColors, gl.STATIC_DRAW);
        this.colorBuff.itemSize = 3;
        this.colorBuff.numItems = 60;

        // a buffer for textures
        this.texBuff = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.texBuff);
        gl.bufferData(gl.ARRAY_BUFFER, this.vertexTexCoords, gl.STATIC_DRAW);
        this.texBuff.itemSize = 2;
        this.texBuff.numItems = 60;

        // triangle indicies
        this.indexBuff = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuff);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.triangleIndices, gl.STATIC_DRAW);
    }
}