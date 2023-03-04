import * as THREE from "three";
import React, { useContext, useLayoutEffect } from "react";
import { Context } from "../components/ContextProvider";
import textureFile from "../assets/nautilus.png";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Cursor from "../components/Cursor";

const vertexShader = `
  varying vec2 vUv;
  uniform float uTime;
  void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;
const fragmentShader = `
  varying vec2 vUv;
  uniform sampler2D uTexture;
  uniform sampler2D uDataTexture;
  uniform vec4 resolution;
  
  void main() {
      vec2 newUV = (vUv - vec2(0.5)) * resolution.zw + vec2(0.5);
      vec4 offset = texture2D(uDataTexture, vUv);
  
      gl_FragColor = texture2D(uTexture, newUV - 0.02 * offset.rg);
  }
`;

const imageRatio = 1536 / 1024;

const size = 128;
const fadeFactor = 0.97;
const initialOffsetFactor = 10;
const mouseOffsetFactor = 40;
const distortionSize = 20;

async function getTexture() {
  return new THREE.TextureLoader().load(textureFile, (texture) => texture);
}

function getDataTexture() {
  const textureSize = size * size;
  const data = new Float32Array(4 * textureSize);

  for (let i = 0; i < textureSize; i++) {
    const stride = i * 4;
    data[stride] = Math.random() * initialOffsetFactor;
    data[stride + 1] = Math.random() * initialOffsetFactor;
    data[stride + 2] = 0;
    data[stride + 3] = 0;
  }

  const texture = new THREE.DataTexture(
    data,
    size,
    size,
    THREE.RGBAFormat,
    THREE.FloatType
  );
  texture.minFilter = THREE.NearestFilter;
  texture.magFilter = THREE.NearestFilter;

  texture.needsUpdate = true;
  return texture;
}

function getScene() {
  return new THREE.Scene();
}

function getGeometry() {
  return new THREE.PlaneGeometry(imageRatio, 1, 10, 10);
}

async function getMaterial() {
  return new THREE.ShaderMaterial({
    uniforms: {
      uTexture: { value: await getTexture() },
      uDataTexture: { value: getDataTexture() },
      resolution: { value: new THREE.Vector4() },
    },
    vertexShader,
    fragmentShader,
  });
}

async function getShape() {
  return new THREE.Mesh(getGeometry(), await getMaterial());
}

function getCamera() {
  const camera = new THREE.OrthographicCamera(
    imageRatio / -2,
    imageRatio / 2,
    1 / 2,
    1 / -2,
    0.1,
    10
  );
  camera.position.x = 0;
  camera.position.y = 0;
  camera.position.z = 1;

  return camera;
}

function getRenderer(canvas) {
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: false,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x111122);
  return renderer;
}

function getResolution() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  let a1;
  let a2;
  if (height / width > imageRatio) {
    a1 = width / height / imageRatio;
    a2 = 1;
  } else {
    a1 = 1;
    a2 = (height / width) * imageRatio;
  }
  return { x: width, y: height, z: a1, w: a2 };
}

async function initThreeJS() {
  function onResize() {
    const resolution = getResolution();

    camera.aspect = resolution.x / resolution.y;
    camera.updateProjectionMatrix();

    shape.material.uniforms.resolution.value = resolution;
    shape.material.uniforms.needsUpdate = true;

    renderer.setSize(resolution.x, resolution.y);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }

  function onMouseMove(e) {
    mouse.prevX = mouse.x;
    mouse.prevY = mouse.y;
    mouse.x = e.clientX / window.innerWidth;
    mouse.y = 1 - e.clientY / window.innerHeight;
    mouse.speedX = mouse.x - mouse.prevX;
    mouse.speedY = mouse.y - mouse.prevY;
  }

  function updateDataTexture() {
    const texture = shape.material.uniforms.uDataTexture.value;
    const data = texture.image.data;

    for (let i = 0; i < data.length; i += 4) {
      data[i] *= fadeFactor;
      data[i + 1] *= fadeFactor;
    }

    const x0 = mouse.x * size;
    const y0 = mouse.y * size;

    for (let x = 0; x < size; x++) {
      for (let y = 0; y < size; y++) {
        const distanceSquared = (x0 - x) ** 2 + (y0 - y) ** 2;

        if (distanceSquared > distortionSize ** 2) continue;

        const distance = Math.sqrt(distanceSquared);
        const factor = (1 - distance / distortionSize) ** 2;

        const i = (x + y * size) * 4;
        data[i] += mouse.speedX * factor * mouseOffsetFactor * Math.random();
        data[i + 1] +=
          mouse.speedY * factor * mouseOffsetFactor * Math.random();
      }
    }

    mouse.speedX *= fadeFactor;
    mouse.speedY *= fadeFactor;
    texture.needsUpdate = true;
  }

  const canvas = document.querySelector(".shop-webgl");
  const renderer = getRenderer(canvas);
  const scene = getScene();
  const shape = await getShape();
  const camera = getCamera();
  const mouse = {
    x: 0,
    y: 0,
    prevX: 0,
    prevY: 0,
    speedX: 0,
    speedY: 0,
  };

  scene.add(shape);
  scene.add(camera);

  window.addEventListener("resize", () => {
    onResize();
  });

  onResize();

  window.addEventListener("mousemove", (e) => {
    onMouseMove(e);
  });

  const tick = () => {
    if (!renderer) return;

    updateDataTexture();
    renderer.render(scene, camera);
    window.requestAnimationFrame(tick);
  };

  tick();
}

function Shop() {
  const context = useContext(Context);
  const section = context.sections.DIVING_EQUIPMENT;

  useLayoutEffect(() => {
    initThreeJS();
  }, []);

  return (
    <div id="shop-page">
      <Cursor />
      <div className="header-wrapper glass-dark">
        <Header
          title={section.name}
          subtitle={section.description}
          buttoncolor="var(--safety-orange)"
          textcolor="var(--pale)"
          link="/"
        />
      </div>
      <Footer />
      <canvas className="shop-webgl" />
    </div>
  );
}

export default Shop;
