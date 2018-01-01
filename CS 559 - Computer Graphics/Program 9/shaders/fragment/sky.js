var script = document.createElement('script');
script.id = 'fs_sky';
script.className = 'shader';
script.type = 'fragment';
script.text = `
    precision highp float;

    uniform mat4 uPerspective;
    uniform samplerCube uCubemap;

    varying vec3 fPosition;
    
    void main(void)
    {
        gl_FragColor = textureCube(uCubemap, fPosition);
    }`;
document.head.appendChild(script);