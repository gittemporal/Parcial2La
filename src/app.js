import * as THREE from 'https://cdn.skypack.dev/three@0.131.3';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.131.3/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.131.3/examples/jsm/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  40,
  window.innerWidth / window.innerHeight,
  1,
  5000,
);
const renderer = new THREE.WebGLRenderer({ antialias: true });
let loader = new GLTFLoader();
const textureLoader = new THREE.TextureLoader();
let car;
let directionalLight;
let light;
let light2;
let light3;
let light4;
let route;
let resultado;
document.body.onload = () => {
  main();
};

window.onresize = () => {
  scene.background = new THREE.Color(0xdddddd);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth * 0.8, window.innerHeight, true);
};

export function main() {
  // Configuracion inicial
  renderer.setSize(window.innerWidth * 0.8, window.innerHeight);
  renderer.shadowMap.enabled = true;
  scene.background = new THREE.Color(0xdddddd);
  document.body.appendChild(renderer.domElement);

  // Visual Configs
  cameraConfig();
  controlsConfig();

  // Light
  setupLights();

  // Modelo
  loadInitialModel();
}

function loadInitialModel() {
  loader.load(
    'assets/1/scene.gltf',
    function (gltf) {
      car = gltf.scene.children[0];
      scene.add(car);
      animate();
    },
    function (xhr) {
      console.log((xhr.loaded / xhr.total) * 100 + '% cargado');
    },
    function (error) {
      console.log('Un error ocurrio');
    },
  );
}

export function changeModel(assetFolder) {
  scene.children = [];
  // Light
  setupLights();
  loader.load(
    `assets/${assetFolder}/scene.gltf`,
    function (gltf) {
      car = gltf.scene.children[0];
      scene.add(car);
      animate();
    },
    function (xhr) {
      console.log((xhr.loaded / xhr.total) * 100 + '% cargado modelo');
    },
    function (error) {
      console.log('Un error ocurrio');
    },
  );
}
export function changeTexture(assetFolder, texture) {
 var a = parseInt(assetFolder);
 var b = parseInt(texture);
 console.log(a);
 console.log(b);
 var resulInt = a+b;
  console.log(resulInt);
  switch (resulInt) {
   case 1:
     break;
   case 2:
      route = "/1/textures/material_1_baseColor.png";
      break;
   case 3:
      route = "/1/textures/material_2_baseColor.png";
      break;   
   case 4:
        route = "/1/textures/material_0_baseColor.png";
        break;   
   case 5:
      route = "/4/textures/gt_shadow_diffuse2.png";
      break;
   case 6:
        route = "/4/textures/gt_shadow_diffuse3.png";
        break;   
   case 7:
          route ="/4/textures/gt_shadow_diffuse.png";
          break;  
   case 8:
            route = "/7/textures/material_2_baseColor.png"; 
            break;   
   case 9:
      route = "/7/textures/material_3_baseColor.png";
              break;   
   case 10:
      route = "/7/textures/material_0_baseColor.png";
      break;   
   case 11:
       route = "/10/textures/material_1_baseColor.png"; 
       break;   
   case 12:
         route = "/10/textures/material_2_baseColor.png";
         break;   
   case 13:
       route = "/10/textures/material_0_baseColor.png";
       break;               
  }  
  const map = textureLoader.load(
    `assets/${route}`,
  );
  map.encoding = THREE.sRGBEncoding;
  map.flipY = false;  
  car.traverse(function (node) {
    if (node instanceof THREE.Mesh) {
      node.material.map = map;
    }
  });
  animate();
}
function controlsConfig() {
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.update();
  controls.enablePan = false;
}

function cameraConfig() {
  camera.position.x = 8;
  camera.position.y = 2;
  camera.position.z = 8;
}

function setupLights() {
  directionalLight = new THREE.DirectionalLight(0xffffff, 20);
  directionalLight.position.set(0, 1, 0);
  scene.add(directionalLight);

  light = new THREE.PointLight(0xc4c4c4, 1.5);
  light.position.set(0, 300, 500);
  scene.add(light);

  light2 = new THREE.PointLight(0xc4c4c4, 1.5);
  light2.position.set(500, 100, 0);
  scene.add(light2);

  light3 = new THREE.PointLight(0xc4c4c4, 1.5);
  light3.position.set(0, 100, -500);
  scene.add(light3);

  light4 = new THREE.PointLight(0xc4c4c4, 1.5);
  light4.position.set(-500, 300, 500);
  scene.add(light4);
}

function animate() {
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
