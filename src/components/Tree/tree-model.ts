// import { GUI } from "dat.gui";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import type { GLTF } from "three/addons/loaders/GLTFLoader.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

/**
 *  Loading Manager
 */
const loadingManager = new THREE.LoadingManager(
  // onLoad callback
  () => {
    console.log("All assets loaded");
    const progressBar = document.getElementById("progress-bar")!;
    progressBar.style.width = "100%";
    setTimeout(() => {
      document.getElementById("loading-screen")!.style.display = "none";
      progressBar.style.visibility = "hidden";
    }, 500);
  },
  // onProgress callback
  (url, itemsLoaded, itemsTotal) => {
    const progress = (itemsLoaded / itemsTotal) * 100;
    console.log(`Loading file: ${url} (${progress.toFixed(2)}%)`);
    const progressBar = document.getElementById("progress-bar")!;
    progressBar.style.visibility = "visible";
    progressBar.style.width = `${progress}%`;
  },
  // onError callback
  (url) => {
    console.error(`There was an error loading ${url}`);
    document.getElementById("loading-screen")!.style.display = "none";
  },
);

/**
 *  Sizing
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 *  Scene
 */

const scene = new THREE.Scene();

// const spotLight = new THREE.SpotLight(0xfffffff, 1, 100);
// spotLight.position.set(-10, 10, 10);
// scene.add(spotLight);

// const spotLightHelper = new THREE.SpotLightHelper(spotLight);
// scene.add(spotLightHelper);

const renderer = new THREE.WebGLRenderer({
  alpha: true,
  antialias: true,
  powerPreference: "high-performance",
  canvas: document.querySelector("#webgl")!,
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
// renderer.setClearColor(0xe7bc2f);
document.body.appendChild(renderer.domElement);

const gltfLoader = new GLTFLoader(loadingManager).setPath(
  "/assets/models/tree/",
);

gltfLoader.load("scene.gltf", (gltf: GLTF) => {
  const model = gltf.scene;

  // Create a group to hold the model
  const modelGroup = new THREE.Group();
  scene.add(modelGroup);

  // Center the model around the origin
  const box = new THREE.Box3().setFromObject(model);
  const center = box.getCenter(new THREE.Vector3());
  model.position.sub(center); // Center the model

  // Add the model to the group
  modelGroup.add(model);

  // Set the camera target to the model's position
  controls.target.set(0, 0, 0);
  controls.update();

  // Store the group for use in the animate function
  animateModel = modelGroup;

  // const gui = new GUI();
  // const modelFolder = gui.addFolder('Model');
  // modelFolder.add(model.rotation, 'x', 0, Math.PI * 2).name('Rotate X');
  // modelFolder.add(model.rotation, 'y', 0, Math.PI * 2).name('Rotate Y');
  // modelFolder.add(model.rotation, 'z', 0, Math.PI * 2).name('Rotate Z');
  // modelFolder.open();

  // const cameraFolder = gui.addFolder('Camera');
  // cameraFolder.add(camera.position, 'x', -10, 10).name('Camera X');
  // cameraFolder.add(camera.position, 'y', -10, 10).name('Camera Y');
  // cameraFolder.add(camera.position, 'z', 0, 30).name('Camera Z');
  // cameraFolder.open();
});

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);

const domElement = document.querySelector<HTMLCanvasElement>("#webgl")!;
domElement.style.pointerEvents = "auto";

const controls = new OrbitControls(camera, domElement);
controls.enableDamping = true;

controls.enablePan = false;
controls.minDistance = 1.5;
controls.maxDistance = 5;
controls.minPolarAngle = 0;
controls.maxPolarAngle = Math.PI;
controls.enableZoom = false;

camera.position.set(0.5, 0.25, 2.5);
// camera.lookAt(0, 0, 0);
/**
 * controls.update() must be called after any manual changes
 * to the camera's transform
 */
controls.update();

// Declare a variable to hold the model
let animateModel: THREE.Group | null = null;

function animate() {
  requestAnimationFrame(animate);

  // Rotate the model group if it has been loaded
  if (animateModel) {
    animateModel.rotation.y += 0.0005;
  }

  controls.update();
  renderer.render(scene, camera);
}

animate();
