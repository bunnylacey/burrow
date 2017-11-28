var script = document.createElement('script');
script.id = 'fs_video';
script.type = 'not-js';
script.text = `
    #extension GL_EXT_shader_texture_lod : enable
    #extension GL_OES_standard_derivatives : enable

    precision highp float;

    uniform vec3 uSun;
    uniform mat4 uWorld;
    uniform mat4 uCamera;
    uniform mat4 uPerspective;
    uniform sampler2D texSampler;

    varying vec3 fPosition;
    varying vec3 fNormal;
    varying vec3 fColor;
    varying vec2 fTexCoord;

    varying vec3 faceNormal;
    
    const float ambient_coeff = 0.25;
    const float specular_coeff = 1.0;
    const float specular_exp = 30.0;
    const vec3 light_color = vec3(1.0, 1.0, 1.0);
    
    void main(void)
    {
        vec4 texColor = texture2D(texSampler,fTexCoord);

        vec3 dir = uSun;

        vec3 tPosition = (uWorld * vec4(fPosition, 1.0)).xyz;
        vec3 tNormal = (uWorld * vec4(fNormal, 1.0)).xyz;
    
        // create flat shading but offset slightly by vertex normals so it isn't 100% flat;
        vec3 ec_normal = normalize((tNormal*0.00008) + cross(dFdx(tPosition), dFdy(tPosition)));
        vec3 l = dir;
        vec3 n = normalize(ec_normal);
        vec3 e = normalize(-tPosition);
        vec3 h = normalize (e+l);
        vec3 ambient_color  = ambient_coeff  * fColor;
        vec3 specular_color = specular_coeff * pow(max(0.0,dot(n,h)),specular_exp) * light_color;

        vec3 diffuse_color = ((.5 + dot(ec_normal,dir)) * texColor.xyz);
        gl_FragColor = vec4(specular_color + diffuse_color, 1.0);
    }`;
document.head.appendChild(script);