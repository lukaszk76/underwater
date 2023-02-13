import React, { useLayoutEffect } from "react";
import * as THREE from "three";
import gsap from "gsap";
import earthPicture from "../../assets/earth.png";
import moonPicture from "../../assets/moon.jpeg";

function vertexEarthShader() {
  return `
    varying vec3 vNormal;
    varying vec2 vUv;
    void main() {
      vNormal = normalize(normalMatrix * normal);
      vUv = uv;
      vec4 modelViewPosition = modelViewMatrix * vec4(position, 1);
      gl_Position = projectionMatrix * modelViewPosition; 
    }
  `;
}

// vec3 light = vec3(0.0, 0.0, 1.0);
// float intensity = pow(0.7 - dot(vNormal, light), 2.0);
// vec4 diffuse = texture2D(texture, vec2(0.5, 0.5) + vNormal.xy * 0.5);
// gl_FragColor = vec4(diffuse.rgb * intensity, diffuse.a);
function fragmentEarthShader() {
  return `
      uniform sampler2D earthTexture;
  
      varying vec3 vNormal;
      varying vec2 vUv;
      
      void main() {
        float intensity = 1.0 - dot(vNormal, vec3(0.0, 0.0, 1.0));
        vec3 atmosphere = vec3(0.3, 0.6, 1.0) * pow(intensity,1.5);
        gl_FragColor = vec4( atmosphere + texture2D(earthTexture, vUv).xyz, 1.0);
      }
  `;
}

function vertexAtmosphereShader() {
  return `
    varying vec3 vNormal;
    void main() {
      vNormal = normalize(normalMatrix * normal);
      
      vec4 modelViewPosition = modelViewMatrix * vec4(position, .9);
      gl_Position = projectionMatrix * modelViewPosition; 
    }
  `;
}
function fragmentAtmosphereShader() {
  return `
      varying vec3 vNormal;

      void main() {
        float intensity = pow(0.6 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
        gl_FragColor = vec4(0.4, 0.7, 1.0, 1.0) * intensity;
      }
  `;
}

export const Globe = () => {
  useLayoutEffect(() => {
    const canvas = document.querySelector(".globe-canvas");

    const scene = new THREE.Scene();

    const textureLoader = new THREE.TextureLoader();
    const earthTexture = textureLoader.load(earthPicture);
    const moonTexture = textureLoader.load(moonPicture);

    const earthGeometry = new THREE.SphereGeometry(1.8, 64, 64);

    // const earthSurface = new THREE.MeshStandardMaterial({
    //   roughness: 0.7,
    //   opacity: 1,
    //   flatShading: false,
    //   map: earthTexture,
    // });

    const earthSurface = new THREE.ShaderMaterial({
      vertexShader: vertexEarthShader(),
      fragmentShader: fragmentEarthShader(),
      // side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      uniforms: {
        earthTexture: { value: earthTexture },
      },
    });

    const earth = new THREE.Mesh(earthGeometry, earthSurface);

    const moonGeometry = new THREE.SphereGeometry(0.3, 64, 64);
    const moonSurface = new THREE.MeshStandardMaterial({
      roughness: 0.7,
      opacity: 1,
      flatShading: false,
      map: moonTexture,
    });

    const moon = new THREE.Mesh(moonGeometry, moonSurface);
    moon.position.x = 10;

    const atmosphereGeometry = new THREE.SphereGeometry(1.9, 64, 64);

    const atmosphereSurface = new THREE.ShaderMaterial({
      vertexShader: vertexAtmosphereShader(),
      fragmentShader: fragmentAtmosphereShader(),
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
    });

    const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereSurface);

    const points = [];

    for (let i = 0; i < 10000; i++) {
      const x = THREE.MathUtils.randFloatSpread(200);
      const y = THREE.MathUtils.randFloatSpread(200);
      const z = THREE.MathUtils.randFloatSpread(200);

      points.push(x, y, z);
    }

    const starsGeometry = new THREE.BufferGeometry();
    starsGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(points, 3)
    );

    const starsMaterial = new THREE.PointsMaterial({
      color: 0x888888,
      size: 0.1,
    });

    const stars = new THREE.Points(starsGeometry, starsMaterial);

    const group1 = new THREE.Group();

    group1.add(earth);
    group1.add(moon);

    scene.add(atmosphere);
    scene.add(group1);

    const group2 = new THREE.Group();
    group2.add(stars);
    group2.add(group1);

    scene.add(group2);

    const lightColor1 = new THREE.Color("white");
    const pointLight = new THREE.PointLight(lightColor1, 2);
    pointLight.position.x = 5;
    pointLight.position.y = 4.4;
    pointLight.position.z = 3.45;
    scene.add(pointLight);

    // const lightColor2 = { color: 0x1020 };
    //
    // const pointLight2 = new THREE.PointLight(lightColor2, 0.2);
    // pointLight2.position.x = -5;
    // pointLight2.position.y = -4.4;
    // pointLight2.position.z = 3.45;
    // scene.add(pointLight2);

    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    const camera = new THREE.PerspectiveCamera(
      75,
      sizes.width / sizes.height,
      0.1,
      100
    );
    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 5;
    scene.add(camera);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      alpha: true,
    });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    window.addEventListener("resize", () => {
      // Update sizes
      sizes.width = window.innerWidth;
      sizes.height = window.innerHeight;

      // Update camera
      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();

      // Update renderer
      renderer.setSize(sizes.width, sizes.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });

    let mouseX = 0;
    let mouseY = 0;

    window.addEventListener("mousemove", (event) => {
      mouseX = (event.clientX / sizes.width) * 2 - 1;
      mouseY = (event.clientY / sizes.height) * 2 - 1;
    });
    const clock = new THREE.Clock();

    const tick = () => {
      const elapsedTime = clock.getElapsedTime();

      // Update objects
      group1.rotation.y = 0.1 * elapsedTime;
      gsap.to(group2.rotation, { duration: 2, y: mouseX, x: mouseY });

      // Render
      renderer.render(scene, camera);

      // Call tick again on the next frame
      window.requestAnimationFrame(tick);
    };

    tick();
  }, []);

  return <canvas className="globe-canvas"></canvas>;
};
