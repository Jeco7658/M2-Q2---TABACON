import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.152.2/build/three.module.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Textures
const loader = new THREE.TextureLoader();
const sphere1texture = loader.load('textures/earth.jpg');
const sphere2texture = loader.load('textures/moon.jpg');
const sphere3texture = loader.load('textures/sun.jpg');
const spacetexture = loader.load('textures/space.jpg');


// Space Wall
const wall1 = new THREE.Mesh(
  new THREE.BoxGeometry(10, 4, 0.2),
  new THREE.MeshPhongMaterial({ map: spacetexture })
);
wall1.position.z = -5;
scene.add(wall1);

// Space Wall 2
const wall2 = new THREE.Mesh(
  new THREE.BoxGeometry(0.2, 4, 10),
  new THREE.MeshLambertMaterial({ map: spacetexture })
);
wall2.position.x = -5;
scene.add(wall2);

// Space Wall 3
const wall3 = new THREE.Mesh(
  new THREE.BoxGeometry(0.2, 4, 10),
  new THREE.MeshLambertMaterial({ map: spacetexture })
);
wall3.position.x = 5;
scene.add(wall3);

// Floor
const floor = new THREE.Mesh(
  new THREE.BoxGeometry(10, 0.2, 10),
  new THREE.MeshStandardMaterial({ map: spacetexture })
);
floor.position.y = -1;
scene.add(floor);


// Earth
const sphere1 = new THREE.Mesh(
  new THREE.SphereGeometry(0.3, 16, 16), 
  new THREE.MeshStandardMaterial({ map: sphere1texture }) 
);
sphere1.position.set(1, 0, 0); 
scene.add(sphere1);

// Moon
const sphere2 = new THREE.Mesh(
  new THREE.SphereGeometry(0.1, 16, 16), 
  new THREE.MeshStandardMaterial({ map: sphere2texture }) 
);
sphere2.position.set(-0, 0, -2); 
scene.add(sphere2);

// Sun
const sphere3 = new THREE.Mesh(
  new THREE.SphereGeometry(1, 16, 16), 
  new THREE.MeshStandardMaterial({ map: sphere3texture }) 
);
sphere3.position.set(-2, 0.1, 0);
scene.add(sphere3);


// Ambient Light 
const ambientLight = new THREE.AmbientLight(0xffffff, 0.15);
scene.add(ambientLight);

// Point Light — simulates the Sun’s light coming from the Sun object
const sunLight = new THREE.PointLight(0xffee88, 2, 150);
sunLight.position.copy(sphere3.position);
scene.add(sunLight);

// Directional Light — adds extra highlights and shadows
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
directionalLight.position.set(-8, 4, 8);
scene.add(directionalLight);

// Make the Sun glow using emissive color
sphere3.material.emissive = new THREE.Color(0xffaa33);
sphere3.material.emissiveIntensity = 1;

camera.position.set(1, 2, 5);
camera.lookAt(0, 0, 0);

let angle = 0;
function animate() {
  requestAnimationFrame(animate);

  // Rotate the Earth, Moon and Sun
  sphere1.rotation.y += 0.01;
  sphere2.rotation.y += 0.01;
  sphere3.rotation.y += 0.003;

  // Orbit the Moon around the Earth
  angle -= 0.01;
  sphere2.position.x = sphere1.position.x + Math.cos(angle) * 0.6;
  sphere2.position.z = sphere1.position.z + Math.sin(angle) * 0.6;

  renderer.render(scene, camera);
}
animate();
