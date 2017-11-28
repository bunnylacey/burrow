var script = document.createElement('script');
script.id = 'vs_simple';
script.type = 'not-js';
script.text = `
    precision highp float;

    uniform vec3 uSun;
    uniform mat4 uWorld;
    uniform mat4 uCamera;
    uniform mat4 uPerspective;

    attribute vec3 vPosition;
    attribute vec3 vNormal;
    attribute vec3 vColor;
    attribute vec2 vTexCoord;
         
    varying vec3 fPosition;
    varying vec3 fNormal;
    varying vec3 fColor;
    varying vec2 fTexCoord;

    varying vec3 faceNormal;
    
    void main()
  	{
        fPosition = vPosition;
        fNormal = vNormal;
        fColor = vColor;
        fTexCoord = vTexCoord;
        faceNormal = normalize((uCamera * vec4(vPosition, 0.0)).xyz);
        gl_Position = uPerspective * vec4(vPosition, 1.0);
    }`;
document.head.appendChild(script);