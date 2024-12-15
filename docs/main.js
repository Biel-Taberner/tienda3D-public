// Importació de les dependències necessàries de THREE.js i altres mòduls
import * as THREE from "../node_modules/three/build/three.module.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader, TrackballControls } from "three/examples/jsm/Addons.js";
import { ShoeController } from "./controller/ShoeController.js";
import { loadMaterials } from "./helpers/MaterialFunctions.js";
import VectorPointsController from "./controller/VectorPointsController.js";
import { updateVectorPoints, drawVectorsToHTML, displayShoeWhenClickedPoint } from "./helpers/VectorPointsFunctions.js";
import { Timer } from 'three/addons/misc/Timer.js';

// Inicialització del controlador de sabates
const shoeController = new ShoeController();

// Obtenció de totes les sabates des del controlador
const shoes = await shoeController.getAllShoes();

// Inicialització del controlador de punts vectorials
const vectorPointsController = new VectorPointsController();

// Obtenció de tots els punts vectorials
const vectorPoints = await vectorPointsController.getAllVectorPoints();

// Filtrar les sabates de tipus "Expositor"
const filteredExpositorShoes = await shoeController.findAllShoesByType("Expositor");

// Dimensions del visor
const width = window.innerWidth;
const height = window.innerHeight;

// Inicialització del carregador de models GLTF
const loader = new GLTFLoader();

// Configuració de la càmera
const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  alpha: true,
  antialias: true
});

// Configuració de la mida i la relació de píxels del renderer
renderer.setSize(width, height);
renderer.setPixelRatio(window.devicePixelRatio);

// Inicialització de l'escena
const scene = new THREE.Scene();
const canvasElement = document.querySelector(`#canvas-model-shoe-expositor-renderer`);

// Substituir el canvas existent amb el renderer
if (canvasElement && canvasElement.parentNode) {
  canvasElement.parentNode.replaceChild(renderer.domElement, canvasElement);

  renderer.domElement.style.width = "100%";
  renderer.domElement.style.height = "100%";
  renderer.domElement.id = canvasElement.id;
}

// Afegir la càmera a l'escena
scene.add(camera);

// Posició inicial de la càmera
camera.position.z = 1;
camera.position.y = 0.5;
camera.lookAt(0, 0, 0);

// Creació d'un objecte 3D per a la sabata
const shoeGFXObject = new THREE.Object3D();

// Càrrega del model 3D de la sabata
loader.load(`/Models/${filteredExpositorShoes[0].getName()}/${filteredExpositorShoes[0].getMesh()}`, (gltf) => {
  const model = gltf.scene;

  // Carregar materials al model
  loadMaterials(model, filteredExpositorShoes[0]);

  shoeGFXObject.add(model);

  // Configuració d'escala, rotació i posició
  shoeGFXObject.scale.set(0.1, 0.1, 0.1);
  shoeGFXObject.rotation.y = -Math.PI / 6;
  shoeGFXObject.position.y = 0.1;
  shoeGFXObject.position.x = 0.1;

  scene.add(shoeGFXObject);
});

// Afegir llum ambiental i direccional a l'escena
const ambientalLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientalLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.y = 1;
scene.add(directionalLight);

// Variables per al seguiment del ratolí
const mouse = new THREE.Vector2();
const targetRotation = new THREE.Vector2(); // Rotació objectiu
const rotationSpeed = 0.05; // Velocitat de transició suau

// Actualitzar les coordenades del ratolí
window.addEventListener("mousemove", (event) => {
  // Normalitzar les coordenades del ratolí al rang [-1, 1]
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  // Establir la rotació objectiu basada en les coordenades del ratolí
  targetRotation.y = -mouse.x * Math.PI / 4;
});

// Inicialització del temporitzador
const timer = new Timer();

// Mostrar punts vectorials a l'HTML
drawVectorsToHTML(vectorPoints);

// Mostrar la sabata quan es fa clic a un punt vectorial
displayShoeWhenClickedPoint(vectorPoints, shoes, scene, camera, renderer);

// Afegir funcionalitat al botó "Torna enrere"
document.getElementById("go-back").addEventListener("click", (e) => {
  e.currentTarget.style.visibility = "hidden";

  document.getElementById("canvas-model-shoe-expositor-renderer-info").style.display = "none";

  camera.position.set(0, 0.5, 1);
});

// Actualització de punts vectorials
const tick = () => {
  updateVectorPoints(vectorPoints, camera, renderer);
};

// Funció d'animació principal
function animate(timestamp) {
  tick();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);

  // Interpolar la rotació de la càmera cap a la rotació objectiu
  camera.rotation.x += (targetRotation.x - camera.rotation.x) * rotationSpeed;
  camera.rotation.y += (targetRotation.y - camera.rotation.y) * rotationSpeed;

  timer.update(timestamp);
}

// Gestionar el redimensionament de la finestra
window.addEventListener('resize', () => {
  const width = window.innerWidth;
  const height = window.innerHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  renderer.setSize(width, height);
  renderer.setPixelRatio(window.devicePixelRatio);
});

// Començar l'animació
animate();