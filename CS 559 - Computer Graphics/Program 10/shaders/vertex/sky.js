var script = document.createElement('script');
script.id = 'vs_sky';
script.className = 'shader';
script.type = 'vertex';
script.text = `
    precision highp float;

    uniform mat4 uPerspective;
    uniform samplerCube uCubemap;

    attribute vec3 vPosition;
         
    varying vec3 fPosition;
    
    void main()
  	{
        fPosition = vPosition;
        gl_Position = uPerspective * vec4(vPosition, 1.0);
    }`;
document.head.appendChild(script);