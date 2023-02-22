import React, { useLayoutEffect } from "react";
import * as THREE from "three";
import earthPicture from "../../assets/earth.png";
import moonPicture from "../../assets/moon.jpeg";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Text } from "troika-three-text";

const places = {
  Krakow: { lat: 50.06465009999999, lng: 19.9449799, color: 0xff7700 },
  Murter: { lat: 43.7999968, lng: 15.5999976, color: 0xe6f4f1 },
  Mexico: { lat: 20.6666667, lng: -87.0833333, color: 0xe6f4f1 },
  Cuba: { lat: 21.521757, lng: -77.781167, color: 0xe6f4f1 },
  "Orda cave": { lat: 57.10552, lng: 56.5317, color: 0xe6f4f1 },
  Kamtschatka: { lat: 53.0166667, lng: 158.65, color: 0xe6f4f1 },
  Bajkal: { lat: 51.5, lng: 104.1666667, color: 0xe6f4f1 },
  Philippines: { lat: 12.879721, lng: 121.774017, color: 0xe6f4f1 },
  Maldives: { lat: 3.202778, lng: 73.22068, color: 0xe6f4f1 },
  Egypt: { lat: 26.820553, lng: 30.802498, color: 0xe6f4f1 },
  "Barents Sea": { lat: 75.706936, lng: 40.696365, color: 0xe6f4f1 },
};

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

function vertexCurveShader() {
  return `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      vec4 modelViewPosition = modelViewMatrix * vec4(position, 1);
      gl_Position = projectionMatrix * modelViewPosition; 
    }
  `;
}

function fragmentCurveShader() {
  return `
      #define orange vec3(1.00,0.47,0.0)
      #define white vec3(.7,.7,.7)
      
      varying vec2 vUv;
      uniform float time;
      
      void main() {
        float pct = sin(vUv.x * 50. - time);
      
        if (pct < 0.0) {
          discard;
        }
        
        // gl_FragColor = vec4(mix(orange, white, pct), 1.0);
        gl_FragColor = vec4(orange, 1.0);
        
      }
  `;
}

function vertexMarkerShader() {
  return `
    varying vec2 vUv;
    varying vec3 vNormal;
    void main() {
      vUv = uv;
      vNormal = normalize(normalMatrix * normal);
      vec4 modelViewPosition = modelViewMatrix * vec4(position, 1);
      gl_Position = projectionMatrix * modelViewPosition; 
    }
  `;
}

function fragmentMarkerShader() {
  return `
      #define red   vec3(1.00,0.47,0.0)
      varying vec3 vNormal;
      uniform float time;
      
      void main() {
        float pct = smoothstep(0.56,0.66, abs(sin(vNormal.z +  0.1* time))) - smoothstep(0.66,0.76, abs(sin(vNormal.z +  0.1*time)));
        if (pct < 0.5) {
          discard;
        }
        gl_FragColor = vec4(red, pct);   
      }
  `;
}

function convertToRadians(degrees) {
  return (degrees * Math.PI) / 180;
}

function convertToCartesianCoordinates(lat, lng, radius = 1) {
  const phi = convertToRadians(90 - lat);
  const theta = convertToRadians(lng + 180);

  const x = -radius * Math.sin(phi) * Math.cos(theta);
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(phi) * Math.sin(theta);

  return new THREE.Vector3(x, y, z);
}

function getCurve(start, end) {
  let points = [];
  for (let i = 0; i <= 20; i++) {
    const p = new THREE.Vector3().lerpVectors(start, end, i / 20);
    p.normalize().multiplyScalar(1.8 + 0.12 * Math.sin((Math.PI * i) / 20));
    points.push(p);
  }
  const curve = new THREE.CatmullRomCurve3(points);
  const geometry = new THREE.TubeGeometry(curve, 20, 0.0008, 8, false);
  const material = new THREE.ShaderMaterial({
    vertexShader: vertexCurveShader(),
    fragmentShader: fragmentCurveShader(),
    uniforms: {
      time: { value: 0 },
    },
    blending: THREE.AdditiveBlending,
  });
  const mesh = new THREE.Mesh(geometry, material);
  setInterval(() => {
    material.uniforms.time.value += 0.04;
  }, 1000 / 60);
  return mesh;
}

const getTextMarker = (text, color, lat, lng) => {
  const textMarker = new Text();
  textMarker.text = text;
  textMarker.color = color;
  textMarker.fontSize = 0.04;
  textMarker.fontWeight = "bold";

  const textCoordinates = convertToCartesianCoordinates(lat, lng, 1.85);

  textMarker.position.set(
    textCoordinates.x,
    textCoordinates.y,
    textCoordinates.z
  );
  textMarker.lookAt(0, 0, 0);
  textMarker.rotateOnAxis(new THREE.Vector3(0, 1, 0), Math.PI / 2);
  textMarker.name = text;

  return textMarker;
};

const getMarker = (lat, lng, name) => {
  const shaderMaterial = new THREE.ShaderMaterial({
    vertexShader: vertexMarkerShader(),
    fragmentShader: fragmentMarkerShader(),
    uniforms: {
      time: { value: 0 },
    },
    blending: THREE.AdditiveBlending,
  });

  setInterval(() => {
    shaderMaterial.uniforms.time.value += 0.1;
  }, 1000 / 60);

  const marker = new THREE.Mesh(
    new THREE.SphereGeometry(0.07, 32, 32),
    shaderMaterial
  );
  const markerCoordinates = convertToCartesianCoordinates(lat, lng, 1.78);
  marker.position.set(
    markerCoordinates.x,
    markerCoordinates.y,
    markerCoordinates.z
  );
  marker.geometry.name = name;

  return marker;
};

const getBall = (lat, lng) => {
  const ball = new THREE.Mesh(
    new THREE.SphereGeometry(0.01, 32, 32),
    new THREE.MeshBasicMaterial({
      color: 0xff7700,
      name: "ball",
    })
  );
  const ballCoordinates = convertToCartesianCoordinates(lat, lng, 1.8);
  ball.position.set(ballCoordinates.x, ballCoordinates.y, ballCoordinates.z);

  return ball;
};
const getMarkers = (places) => {
  const textMarkers = [];
  const markers = [];
  const balls = [];

  for (const place in places) {
    const { lat, lng, color } = places[place];

    textMarkers.push(getTextMarker(place, color, lat, lng));
    markers.push(getMarker(lat, lng, place));
    balls.push(getBall(lat, lng));
  }

  return { markers, textMarkers, balls };
};

export const Globe = () => {
  useLayoutEffect(() => {
    const canvas = document.querySelector(".globe-canvas");
    const textureLoader = new THREE.TextureLoader();

    //Places

    const { markers, textMarkers, balls } = getMarkers(places);

    const curves = [];
    for (let i = 1; i < textMarkers.length; i++) {
      const start = textMarkers[0].position;
      const end = textMarkers[i].position;
      const curve = getCurve(start, end);
      curves.push(curve);
    }

    //Earth
    let earthTexture = textureLoader.load(earthPicture);
    const earthGeometry = new THREE.SphereGeometry(1.8, 64, 64);

    const earthSurface = new THREE.ShaderMaterial({
      vertexShader: vertexEarthShader(),
      fragmentShader: fragmentEarthShader(),
      uniforms: {
        earthTexture: { value: earthTexture },
      },
    });

    const earth = new THREE.Mesh(earthGeometry, earthSurface);

    //Moon
    const moonTexture = textureLoader.load(moonPicture);
    const moonGeometry = new THREE.SphereGeometry(0.3, 64, 64);
    const moonSurface = new THREE.MeshStandardMaterial({
      roughness: 0.7,
      opacity: 1,
      flatShading: false,
      map: moonTexture,
    });

    const moon = new THREE.Mesh(moonGeometry, moonSurface);
    moon.position.x = 10;

    //Atmosphere
    const atmosphereGeometry = new THREE.SphereGeometry(1.9, 64, 64);

    const atmosphereSurface = new THREE.ShaderMaterial({
      vertexShader: vertexAtmosphereShader(),
      fragmentShader: fragmentAtmosphereShader(),
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
    });
    const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereSurface);

    //Stars
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

    //Light
    const lightColor1 = new THREE.Color("white");
    const pointLight = new THREE.PointLight(lightColor1, 2);
    pointLight.position.x = 5;
    pointLight.position.y = 4.4;
    pointLight.position.z = 3.45;

    //Camera
    const sizes = {
      width: window.innerWidth * 0.7,
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

    //Groups and Scene
    const scene = new THREE.Scene();
    const group1 = new THREE.Group();

    group1.add(earth);
    group1.add(moon);
    group1.add(...textMarkers);
    group1.add(...markers);
    group1.add(...balls);
    group1.add(...curves);

    scene.add(atmosphere);
    scene.add(group1);

    const group2 = new THREE.Group();
    group2.add(stars);
    group2.add(group1);

    scene.add(group2);
    scene.add(pointLight);

    scene.add(camera);

    // Controls
    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = false;

    //Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      alpha: true,
    });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    //Resize
    window.addEventListener("resize", () => {
      // Update sizes
      sizes.width = window.innerWidth * 0.7;
      sizes.height = window.innerHeight;

      // Update camera
      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();

      // Update renderer
      renderer.setSize(sizes.width, sizes.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });

    const clock = new THREE.Clock();

    const tick = () => {
      const elapsedTime = clock.getElapsedTime();
      // Update objects
      group1.rotation.y = 0.1 * elapsedTime;

      // Render
      renderer.render(scene, camera);

      // Call tick again on the next frame
      window.requestAnimationFrame(tick);
    };

    tick();
  }, []);

  return <canvas className="globe-canvas"></canvas>;
};
