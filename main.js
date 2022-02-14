import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Setup

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);

// Torus

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);

// const material = new THREE.MeshStandardMaterial({ color: 0xff6347 });
const material = new THREE.MeshStandardMaterial({ color: 0x3CB043 });
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);
// 
const radius = 3.5;
const tube = 1.5;
const radialSegments = 8;
const tubularSegments = 64;
const p = 2;
const q = 3;
const knotGeometry = new THREE.TorusKnotBufferGeometry(radius, tube, tubularSegments, radialSegments, p, q);
const knotMaterial = new THREE.MeshStandardMaterial({ color: 0xff6347 });
const torusKnot = new THREE.Mesh(knotGeometry, knotMaterial);
torusKnot.position.z =  -20
torusKnot.position.x = -30
torusKnot.position.y = 25
torusKnot.scale.set(.5,.5,.5)

scene.add(torusKnot);

// Lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// Helpers

// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper)

// const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);

// Background

const spaceTexture = new THREE.TextureLoader().load('/space.jpg');
scene.background = spaceTexture;

// Avatar

const userTexture = new THREE.TextureLoader().load('/k.jpg');

const user = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({ map: userTexture }));

scene.add(user);

// sphere

const sphereTexture = new THREE.TextureLoader().load('/earth.jpg');
const normalTexture = new THREE.TextureLoader().load('/normalearth.png');

const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: sphereTexture,
    normalMap: normalTexture,
  })
);

scene.add(sphere);

sphere.position.z = 30;
sphere.position.setX(-10);

user.position.z = -5;
user.position.x = 2;

// Scroll Animation

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  sphere.rotation.x += 0.05;
  sphere.rotation.y += 0.075;
  sphere.rotation.z += 0.05;

  user.rotation.y += 0.01;
  user.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  // camera.rotation.y = t * -0.0002;
  

  
}

document.body.onscroll = moveCamera;
moveCamera();

// Animation Loop

function animate() {
  requestAnimationFrame(animate);

  torusKnot.rotation.x += 0.01;
  torusKnot.rotation.y += 0.005;
  torusKnot.rotation.z += 0.01;

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  sphere.rotation.x += 0.005;

  // controls.update();
  user.rotation.z += 0.01;

  renderer.render(scene, camera);
}

animate();
