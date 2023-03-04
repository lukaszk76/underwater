import React, { useContext, useEffect, useLayoutEffect } from "react";
import Header from "../components/Header";
import { Context } from "../components/ContextProvider";
import Cursor from "../components/Cursor";
import * as THREE from "three";
import { addSmoothScroll } from "../helpers/addSmoothScroll";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader";
import fishFile from "../assets/small_fish.glb";
import { Gradient } from "../Gradient.js";
import Footer from "../components/Footer";

const texts = [
  "Diving Center",
  "Wrecks",
  "Attractions",
  "Apartments",
  "Prices",
  "Contact",
];

function vertexShader() {
  return `
    varying vec3 vNormal;
    uniform float speed;
    varying float vSpeed;
    varying vec3 vPosition;
    
    mat4 rotationMatrix(vec3 axis, float angle) {
      axis = normalize(axis);
      float s = sin(angle);
      float c = cos(angle);
      float oc = 1.0 - c;
      
      return mat4(oc * axis.x * axis.x + c,           oc * axis.x * axis.y - axis.z * s,  oc * axis.z * axis.x + axis.y * s,  0.0,
                  oc * axis.x * axis.y + axis.z * s,  oc * axis.y * axis.y + c,           oc * axis.y * axis.z - axis.x * s,  0.0,
                  oc * axis.z * axis.x - axis.y * s,  oc * axis.y * axis.z + axis.x * s,  oc * axis.z * axis.z + c,           0.0,
                  0.0,                                0.0,                                0.0,                                1.0);
    }
  
    vec3 rotate(vec3 v, vec3 axis, float angle) {
      mat4 m = rotationMatrix(axis, angle);
      return (m * vec4(v, 1.0)).xyz;
    }
    
    void main() {
      vSpeed = speed;
      vNormal = normalize(normalMatrix * normal);
      vPosition = position;
      vec3 newPosition = rotate(position, vec3(0.0, 0.0, 1.0), 0.5 * position.x * 0.8 * speed);
      vec4 modelViewPosition = modelViewMatrix * vec4(newPosition, 1.);
      gl_Position = projectionMatrix * modelViewPosition; 
    }
  `;
}
function fragmentShader() {
  return `
      varying vec3 vNormal;
      varying float vSpeed;
      varying vec3 vPosition;

      void main() {
    
        vec3 color = vec3(163./255., 173./255., 171./255.);
        color = color * vec3(cos(vSpeed* 5.));
        float intensity = (.05 -vPosition.y * .05 + pow(vPosition.x, 1.5) * .03)*(1. + abs(sin(vSpeed* 5.)));
        color = color + vec3(0., pow(intensity,2.), intensity);
        gl_FragColor = vec4(color, 1.0);
       
      }
  `;
}

function fragmentCopyShader() {
  return `
      varying vec3 vNormal;
      varying float vSpeed;
      varying vec3 vPosition;
      
      void main() {
        vec3 red = vec3(163./255., 0., 0.0);
        vec3 orange = vec3(1., 119./255., 0.0);
        vec3 color = mix(red, orange, pow(vPosition.x,1.3) * 0.15 * (1. - sin(vSpeed* 5.)));
        gl_FragColor = vec4(color, 1.0);
      }
  `;
}

const sizes = {
  width: window.innerWidth * 0.7,
  height: window.innerHeight,
};

const getScene = () => new THREE.Scene();

const getCamera = () => {
  const camera = new THREE.PerspectiveCamera();
  camera.aspect = sizes.width / sizes.height;
  camera.fov = 75;
  camera.near = 0.1;
  camera.far = 100;
  camera.position.x = 0;
  camera.position.y = 0;
  camera.position.z = 5;
  camera.updateProjectionMatrix();
  return camera;
};

const getRenderer = () => {
  const canvas = document.querySelector("#croatia-canvas");
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true,
  });
  renderer.autoClear = false;
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(sizes.width / sizes.height);
  return renderer;
};

const getTextMeshes = async () => {
  const fontLoader = new FontLoader();
  const textMeshes = [];
  const font = await fontLoader.loadAsync("/Poppins_Regular.json");
  texts.forEach((text, index) => {
    const textGeometry = new TextGeometry(text, {
      font: font,
      size: 0.6,
      height: 0.01,
      curveSegments: 12,
      bevelEnabled: false,
    });
    const textMaterial = new THREE.ShaderMaterial({
      vertexShader: vertexShader(),
      fragmentShader: fragmentShader(),
      uniforms: {
        speed: { value: 0 },
      },
    });

    const textMesh = new THREE.Mesh(textGeometry, textMaterial);
    textMesh.position.x = -3;
    textMesh.position.y = 0.9 * (2 - index);
    textMesh.position.z = 0;
    textMesh.name = text;
    textMeshes.push(textMesh);
  });
  return textMeshes;
};

const getCopyTextMeshes = async () => {
  const fontLoader = new FontLoader();
  const textMeshes = [];
  const font = await fontLoader.loadAsync("/Poppins_Regular.json");
  texts.forEach((text, index) => {
    const textGeometry = new TextGeometry(text, {
      font: font,
      size: 0.6,
      height: 0.01,
      curveSegments: 12,
      bevelEnabled: false,
    });
    const textMaterial = new THREE.ShaderMaterial({
      vertexShader: vertexShader(),
      fragmentShader: fragmentCopyShader(),
      uniforms: {
        speed: { value: 0 },
      },
    });

    const textMesh = new THREE.Mesh(textGeometry, textMaterial);
    textMesh.position.x = -3;
    textMesh.position.y = 0.9 * (2 - index);
    textMesh.position.z = 0;
    textMeshes.push(textMesh);
  });
  return textMeshes;
};

const getFish = async () => {
  const ModelLoader = new GLTFLoader();
  const fishData = await ModelLoader.loadAsync(fishFile);
  const fish = fishData.scene.children[0];
  fish.scale.set(1.5, 1.5, 1.5);
  fish.position.x = 2;
  fish.position.y = 0;
  fish.position.z = 0;
  return fish;
};

const getLight = () => {
  const light = new THREE.DirectionalLight(0xffffff, 3);
  light.position.set(0, 10, 10);
  return light;
};

const getSecondaryLight = () => {
  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(0, -10, -10);
  return light;
};

const threeJs = async () => {
  let prevScroll = 0;
  let activeText = 0;
  const scene = getScene();
  const sceneCopy = getScene();
  const camera = getCamera();
  const textGroup = new THREE.Group();
  const textGroupCopy = new THREE.Group();
  const fishGroup = new THREE.Group();
  const renderer = getRenderer();
  const textMeshes = await getTextMeshes();
  const textMeshesCopy = await getCopyTextMeshes();
  const fish = await getFish();
  const light = getLight();
  const secondaryLight = getSecondaryLight();

  textGroup.add(...textMeshes);
  scene.add(camera);
  scene.add(textGroup);
  fishGroup.add(fish);
  scene.add(fishGroup);
  scene.add(light);
  scene.add(secondaryLight);

  textGroupCopy.add(...textMeshesCopy);
  sceneCopy.add(camera);
  sceneCopy.add(textGroupCopy);

  const animateFish = () => {
    const position = textGroup.position.y * 2;
    const deltaY = position - prevScroll;
    prevScroll = position;
    textMeshes.forEach((textMesh) => {
      textMesh.material.uniforms.speed.value = deltaY;
      textMesh.material.uniformsNeedUpdate = true;
    });
    textMeshesCopy.forEach((textMesh) => {
      textMesh.material.uniforms.speed.value = deltaY;
      textMesh.material.uniformsNeedUpdate = true;
    });
    const rotateRight = deltaY > 0 ? 1 : -1;
    const angle = -Math.PI * position;
    const targetRotation = angle - (rotateRight * Math.PI) / 2;
    fish.rotation.z += (targetRotation - fish.rotation.z) * 0.15;
    fish.position.z = 3 * Math.sin(-angle);
    fish.position.x = 3 * Math.cos(-angle);
    fishGroup.rotation.z = 0.3 * Math.sin(angle);

    activeText = -Math.floor(angle / 6 - 2);
    textGroupCopy.children.forEach((textMesh, index) => {
      textMesh.visible = index === activeText;
      textMeshes[index].visible = index !== activeText;
    });
  };

  const animateText = () => {
    const position = (window.scrollY / window.innerHeight) * 6 - 6;
    const deltaY = position - textGroup.position.y;
    textGroup.position.y += deltaY * 0.05;
    textGroupCopy.position.y += deltaY * 0.05;
  };

  const renderScenes = () => {
    renderer.render(scene, camera);
    renderer.clearDepth();
    renderer.render(sceneCopy, camera);
  };

  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();

  function onPointerMove(event) {
    // calculate pointer position in normalized device coordinates
    // (-1 to +1) for both components

    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(pointer, camera);

    // calculate objects intersecting the picking ray
    const intersects = raycaster.intersectObjects(scene.children);

    for (const element of intersects) {
      if (texts.includes(element.object.name)) {
        console.log("clicked:", element.object.name);
        break;
      }
    }
  }

  window.addEventListener("mousedown", onPointerMove);

  const tick = () => {
    animateFish();
    animateText();
    renderScenes();

    window.requestAnimationFrame(tick);
  };

  window.addEventListener("resize", () => {
    // Update sizes
    sizes.width = window.innerWidth * 0.7;
    sizes.height = window.innerHeight;

    // Update camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    // Update renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(sizes.width / sizes.height);
  });

  tick();
};
export const Croatia = () => {
  const context = useContext(Context);

  useEffect(() => {
    addSmoothScroll();
    const gradient = new Gradient();
    gradient.initGradient("#gradient-canvas");
    window.scrollTo(0, window.innerHeight * 0.9);
  }, []);

  useLayoutEffect(() => {
    threeJs();
  }, []);

  return (
    <div id="croatia-wrapper">
      <Cursor />
      <Footer />
      <canvas id="croatia-canvas" />
      <canvas id="gradient-canvas" data-transition-in />
      <div id="croatia-header-wrapper">
        <Header
          link="/"
          title={context.sections.DIVING_CENTER.name}
          subtitle={context.sections.DIVING_CENTER.description}
          buttoncolor={"var(--safety-orange)"}
          textcolor={"var(--pale)"}
        />
      </div>
    </div>
  );
};
