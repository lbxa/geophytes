import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import type { GLTF } from "three/addons/loaders/GLTFLoader.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

export class TreeModel {
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private controls!: OrbitControls;
  private animateModel!: THREE.Group | null;
  private loadingManager!: THREE.LoadingManager;

  constructor() {
    this.scene = new THREE.Scene();
    this.setupLoadingManager();
    this.setupRenderer();
    this.setupCamera();
    this.setupControls();
    this.setupEventListeners();
    this.loadModel();
    this.animate();
  }

  private setupLoadingManager(): void {
    this.loadingManager = new THREE.LoadingManager(
      () => {
        console.log("All assets loaded");
        const progressBar = document.getElementById("progress-bar")!;
        progressBar.style.width = "100%";
        setTimeout(() => {
          document.getElementById("loading-screen")!.style.display = "none";
          progressBar.style.visibility = "hidden";
        }, 500);
      },
      (url, itemsLoaded, itemsTotal) => {
        const progress = (itemsLoaded / itemsTotal) * 100;
        console.log(`Loading file: ${url} (${progress.toFixed(2)}%)`);
        const progressBar = document.getElementById("progress-bar")!;
        progressBar.style.visibility = "visible";
        progressBar.style.width = `${progress}%`;
      },
      (url) => {
        console.error(`There was an error loading ${url}`);
        document.getElementById("loading-screen")!.style.display = "none";
      }
    );
  }

  private setupRenderer(): void {
    this.renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
      canvas: document.querySelector("#webgl")!,
    });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);
  }

  private setupCamera(): void {
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.set(0.5, 0.25, 2.5);
  }

  private setupControls(): void {
    const domElement = document.querySelector<HTMLCanvasElement>("#webgl")!;
    domElement.style.pointerEvents = "auto";

    this.controls = new OrbitControls(this.camera, domElement);
    this.controls.enableDamping = true;
    this.controls.enablePan = false;
    this.controls.minDistance = 1.5;
    this.controls.maxDistance = 5;
    this.controls.minPolarAngle = 0;
    this.controls.maxPolarAngle = Math.PI;
    this.controls.enableZoom = false;
    this.controls.update();
  }

  private setupEventListeners(): void {
    window.addEventListener("resize", () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();

      this.renderer.setSize(width, height);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });
  }

  private loadModel(): void {
    const gltfLoader = new GLTFLoader(this.loadingManager).setPath(
      "/assets/models/tree/"
    );

    gltfLoader.load("scene.gltf", (gltf: GLTF) => {
      const model = gltf.scene;
      const modelGroup = new THREE.Group();
      this.scene.add(modelGroup);

      const box = new THREE.Box3().setFromObject(model);
      const center = box.getCenter(new THREE.Vector3());
      model.position.sub(center);

      modelGroup.add(model);
      this.controls.target.set(0, 0, 0);
      this.controls.update();
      this.animateModel = modelGroup;
    });
  }

  private animate = (): void => {
    requestAnimationFrame(this.animate);

    if (this.animateModel) {
      this.animateModel.rotation.y += 0.0005;
    }

    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  };
}

new TreeModel();
