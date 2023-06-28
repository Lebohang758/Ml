import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 1, 5);

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(1, 0.5, 2);
const material = new THREE.MeshStandardMaterial({ color: 0x885522 });
const cube = new THREE.Mesh(geometry, material);
// scene.add(cube);
cube.position.y = 0.25;
cube.castShadow = true;

const planeGeometry = new THREE.PlaneGeometry(10, 10);
const planeMaterial = new THREE.MeshStandardMaterial({ color: 0x0088ff, side: THREE.DoubleSide });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
// scene.add(plane);
plane.rotation.x = -Math.PI / 2;
plane.receiveShadow = true;

const loader = new GLTFLoader();
const link = new URL('./Ocean4.glb', import.meta.url)

const group = new THREE.Group()

loader.load( link.href , function ( gltf ) {
  group.add( gltf.scene )
}, undefined, function (error) {
  console.error(error);
} )

const loader1 = new GLTFLoader();
const link1 = new URL('./boat.glb', import.meta.url)

loader1.load( link1.href , function ( gltf ) {
  group.add( gltf.scene )
}, undefined, function (error) {
  console.error(error);
} )

scene.add(group);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(1, 1, 1);
directionalLight.castShadow = true;
scene.add(directionalLight);

const pointLight = new THREE.PointLight(0xff0000, 1, 100);
pointLight.position.set(-5, 5, 5);
pointLight.castShadow = true;
scene.add(pointLight);

const controls = new OrbitControls(camera, renderer.domElement);
controls.update();

document.getElementById("animate").addEventListener('click', ()=>{
  anima = !anima;
})

const anima = false;

function animate() {
  if(!anima){
    group.rotation.y += .01
  }
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();
