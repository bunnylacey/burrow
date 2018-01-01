var script = document.createElement('script');
script.id = 'fs_checkerboard';
script.className = 'shader';
script.type = 'fragment';
script.uniforms = 'uSun,uWorld,uNormal,uCamera,uPerspective,texSampler';
script.text = `
    precision highp float;
    
    uniform vec3 uSun;
    uniform mat4 uWorld;
    uniform mat4 uNormal;
    uniform mat4 uCamera;
    uniform mat4 uPerspective;
    uniform sampler2D texSampler;

    varying vec3 fPosition;
    varying vec3 fNormal;
    varying vec3 fColor;
    varying vec2 fTexCoord;

    #define PI 3.14159265359
   
    float pulse(float val, float dst) {
        return floor(mod(val*dst,1.0)+0.5);
    }

    void main()
    {
        vec4 texColor = texture2D(texSampler,fTexCoord);
    
        vec3 dir = uSun;

        vec3 tNormal = normalize(uWorld * vec4(fNormal, 0.0)).xyz;

        const float d = 0.001;

        float bright = pulse(fPosition.x,d) + pulse(fPosition.y,d);
        vec3 color = mod(bright,2.0) > .5 ? vec3(0.10588235294,0.52156862745,0.72156862745) : vec3(0.68235294117,0.35294117647,0.25490196078); 

        float diffuse = max(.2, dot(tNormal,dir));
        gl_FragColor = vec4(diffuse * color, 1.0);
    }`;
document.head.appendChild(script);