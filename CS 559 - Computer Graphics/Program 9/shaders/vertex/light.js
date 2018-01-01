var script = document.createElement('script');
script.id = 'vs_light';
script.className = 'shader';
script.type = 'vertex';
script.text = `
    precision highp float;

    uniform mat4 uWorld;
    uniform mat4 uCamera;
    uniform mat4 uPerspective;

    attribute vec3 vPosition;

    varying vec3 fPosition;

    void main()
  	{
        fPosition = vPosition;
        gl_Position = uPerspective * uWorld * vec4(vPosition, 1.0);
    }`;
document.head.appendChild(script);