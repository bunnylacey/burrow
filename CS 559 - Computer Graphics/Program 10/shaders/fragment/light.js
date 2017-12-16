var script = document.createElement('script');
script.id = 'fs_light';
script.className = 'shader';
script.type = 'fragment';
script.text = `
    precision highp float;
    
    uniform mat4 uWorld;
    uniform mat4 uCamera;
    uniform mat4 uPerspective;

    varying vec3 fPosition;

    vec4 encodeFloat (float depth) {
      const vec4 bitShift = vec4(256 * 256 * 256, 256 * 256, 256, 1.0);
      const vec4 bitMask = vec4(0, 1.0 / 256.0, 1.0 / 256.0, 1.0 / 256.0);
      vec4 comp = fract(depth * bitShift);
      comp -= comp.xxyz * bitMask;
      return comp;
    }

    void main()
    {
        gl_FragColor = encodeFloat(gl_FragCoord.z);
    }`;
document.head.appendChild(script);