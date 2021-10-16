import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import * as dat from "dat.gui";
import { InteractionManager } from "three.interactive";
import gsap from "gsap/index.js";

/**
 * Loaders
 */

const gltfLoader = new GLTFLoader();

// Debug
const gui = new dat.GUI();

// animation

const explore = document.getElementById("explore");
// var explorer = false;

explore.addEventListener("click", function () {
  //camera.position = object.position;
  console.log("Focus Object");
  // if (!gsap.isTweening(camera.position)) {
  //   gsap.to(camera.position, {
  //     duration: 2,
  //     z: -1.42,
  //     x: 2.24,
  //     y: 0.4,
  //     ease: "power4.easeInOut",
  //   });
  //   // explorer = true
  //   // explore.innerHTML = "go back ";
  //   // console.log('test')
  // }
});

const schwebebahn = document.getElementById("schwebebahn");
// var explorer = false;

schwebebahn.addEventListener("click", function () {
  //camera.position = object.position;
  console.log("Focus Object");
  gltfLoader.load("/models/schwebebahn.gltf", (gltf) => {
    gltf.scene.scale.set(0.01, 0.01, 0.01);
    gltf.scene.position.set(0, 0, 0);
    gltf.scene.rotation.y = -1.59;
    gltf.scene.receiveShadow = true;
    gltf.scene.castShadow = true;
    scene.add(gltf.scene);

    const sceneSettings = gui.addFolder("Szene");

    sceneSettings
      .add(gltf.scene.rotation, "y")
      .min(-Math.PI)
      .max(Math.PI)
      .step(0.01)
      .name("rotation");
    updateAllMaterials();

    model = gltf.scene;
  });

  // if (!gsap.isTweening(camera.position)) {
  //   gsap.to(camera.position, {
  //     duration: 2,
  //     z: -1.42,
  //     x: 2.24,
  //     y: 0.4,
  //     ease: "power4.easeInOut",
  //   });
  //   // explorer = true
  //   // explore.innerHTML = "go back ";
  //   // console.log('test')
  // }
});

const topView = document.getElementById("topview");

topView.addEventListener("click", function () {
  if (!gsap.isTweening(camera.position)) {
    gsap.to(camera.position, {
      duration: 2,
      z: -5.91,
      x: 4.52,
      y: 2.68,
      ease: "power4.easeInOut",
    });
    // explore.innerHTML = "go back ";
  }
});

const umgebung = document.getElementById("umgebung");
// var explorer = false;

umgebung.addEventListener("click", function () {
  //camera.position = object.position;
  console.log("Focus Object");
  gltfLoader.load("/models/umgebung.gltf", (gltf) => {
    gltf.scene.scale.set(0.01, 0.01, 0.01);
    gltf.scene.position.set(0, 0, 0);
    gltf.scene.rotation.y = -1.59;
    gltf.scene.receiveShadow = true;
    gltf.scene.castShadow = true;
    scene.add(gltf.scene);

    const sceneSettings = gui.addFolder("Szene");

    sceneSettings
      .add(gltf.scene.rotation, "y")
      .min(-Math.PI)
      .max(Math.PI)
      .step(0.01)
      .name("rotation");
    updateAllMaterials();

    model = gltf.scene;
  });

  // if (!gsap.isTweening(camera.position)) {
  //   gsap.to(camera.position, {
  //     duration: 2,
  //     z: -1.42,
  //     x: 2.24,
  //     y: 0.4,
  //     ease: "power4.easeInOut",
  //   });
  //   // explorer = true
  //   // explore.innerHTML = "go back ";
  //   // console.log('test')
  // }
});

/**
 * Textures
 */

const textureLoader = new THREE.TextureLoader();

const roofTexture = textureLoader.load(
  "/textures/matcaps/B3AA93_F4EFD7_E1DDC2_DCD3BB-256px.png"
);
const wallTexture = textureLoader.load(
  "/textures/matcaps/B5BBB5_3B4026_6E745D_5C6147-256px.png"
);
const treeTexture = textureLoader.load(
  "/textures/matcaps/37C337_279F27_186018_248824-256px.png"
);
// const waterTexture = textureLoader.load('/textures/matcaps/597C3F_254319_6C9668_7C9B53-256px.png')

roofTexture.minFilter = THREE.NearestFilter;
roofTexture.magFilter = THREE.NearestFilter;
roofTexture.generateMipmaps = false;

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// const grid = new THREE.GridHelper( 10 , 100  );
// grid.position.set( 1, 0.1, 1 );
// scene.add( grid );

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  console.log(renderer.info.render.triangles);
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  60,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.set(3.54, 1.3, -3.39);
// camera.rotation.set( -1.8, 1, 2)

camera.lookAt(0.8, 0.14, -0.15);

scene.add(camera);

// child.addEventListener('mousedown', (event) => {

var cameraParams = {
  orbitControls: true,
  animateCamera: false,
};

const folderCamera = gui.addFolder("Camera");
folderCamera.add(cameraParams, "orbitControls").onChange(function () {
  enableOrbit();
});

folderCamera.add(cameraParams, "animateCamera").onChange(function () {
  animateCamera();
  console.log(cameraParams.animateCamera);
});

folderCamera
  .add(camera.position, "x")
  .min(-5)
  .max(5)
  .step(0.01)
  .name("cameraPositionX");
folderCamera
  .add(camera.position, "y")
  .min(-5)
  .max(5)
  .step(0.01)
  .name("cameraPositionY");
folderCamera
  .add(camera.position, "z")
  .min(-5)
  .max(5)
  .step(0.01)
  .name("cameraPositionZ");

folderCamera
  .add(camera.rotation, "x")
  .min(-Math.PI)
  .max(Math.PI)
  .step(0.01)
  .name("cameraRotationX");
folderCamera
  .add(camera.rotation, "y")
  .min(-Math.PI)
  .max(Math.PI)
  .step(0.01)
  .name("cameraRotationY");
folderCamera
  .add(camera.rotation, "z")
  .min(-Math.PI)
  .max(Math.PI)
  .step(0.01)
  .name("cameraRotationz");

gui.close();

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
// controls.target.set(0,0,0)
// controls.target.set(0.8, 0.14, -0.15);
console.log(controls.target);
console.log(camera.position);
controls.enabled = false;

function enableOrbit() {
  controls.enabled = true;
}
camera.zoom = 1;

function animateCamera() {
  if (cameraParams.animateCamera == true) {
    camera.position.y = camera.position.y + 0.4;
  }

  if (cameraParams.animateCamera == false) {
    camera.position.y = camera.position.y - 0.4;
  }
}

// const helper = new THREE.CameraHelper( camera );
// scene.add(helper);

// secondcamera
const secondcamera = new THREE.PerspectiveCamera(
  60,
  sizes.width / sizes.height,
  0.1,
  100
);
secondcamera.position.set(1, 2, 5);
scene.add(secondcamera);
secondcamera.lookAt(0.8, 0.14, -0.15);

// Controls

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  // alpha: true,
  background: false,
  antialias: true,
});

renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.physicallyCorrectLights = true;
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.shadowMap.enabled = true;
renderer.setClearColor("#eaeffc");
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap

/**
 * interactionManager
 */

const interactionManager = new InteractionManager(
  renderer,
  camera,
  // secondcamera,
  renderer.domElement
);

const logDiv = document.querySelector("#title .log");

/**
 * Fog
 */

const fog = new THREE.Fog("#eaeffc", 8, 15);
scene.fog = fog;

/**
 * Materials
 */

var params = {
  terrainColor: 0xeaeffc,
  waterColor: 0x3384ff,
  roofColor: 0xebebeb,
};

/* Standard Materials */
const terrain = new THREE.MeshStandardMaterial({});
const roof = new THREE.MeshStandardMaterial({ color: params.roofColor });
const water = new THREE.MeshStandardMaterial({ color: params.waterColor });

/* Matcaps Materials */
const wall = new THREE.MeshMatcapMaterial({ matcap: wallTexture });
const forest = new THREE.MeshMatcapMaterial({ matcap: treeTexture });

/* DAT GUI Materials */

var folder = gui.addFolder("Materials");

folder.addColor(params, "terrainColor").onChange(function () {
  terrain.color.set(params.terrainColor);
  fog.color.set(params.terrainColor);
  renderer.setClearColor(params.terrainColor);
});

folder.addColor(params, "roofColor").onChange(function () {
  roof.color.set(params.roofColor);
});
folder.addColor(params, "waterColor").onChange(function () {
  water.color.set(params.waterColor);
});
// folder.open();

/**
 * Update Materials
 */

const debugObject = {};
let prevClickName;
let objectsHover = [];

const updateAllMaterials = () => {
  scene.traverse((child) => {
    if (
      child instanceof THREE.Mesh &&
      child.material instanceof THREE.MeshStandardMaterial
    ) {
      // Update Materials
      if (child.name == "Terrrain") {
        child.material = terrain;
        child.receiveShadow = true;
      }
      if (child.material.name == "wall") {
        child.material = wall;
      }
      if (child.material.name == "roof") {
        child.material = roof;
      }
      if (child.material.name == "forest") {
        child.material = forest;
      }
      if (child.material.name == "water") {
        child.material = water;
      }

      //Hide Schwebebahn and Trees
      if (child.name.includes("Cylinder") == true) {
        child.visible = false;
      }

      child.castShadow = true;

      // Interaction Manager
      interactionManager.add(child);

      child.addEventListener("mouseover", (event) => {
        if (!objectsHover.includes(event.target))
          objectsHover.push(event.target);
        document.body.style.cursor = "pointer";

        const path = getPath(event.target);
        logDiv.innerHTML =
          '<span style="color: #ff0000">' + path + " – mouseover</span>";
      });

      child.addEventListener("mouseout", (event) => {
        objectsHover = objectsHover.filter((n) => n !== event.target);
        if (objectsHover.length > 0) {
          const o = objectsHover[objectsHover.length - 1];
          logDiv.innerHTML = getPath(o);
        } else {
          logDiv.innerHTML = "";
        }

        document.body.style.cursor = "default";
      });

      child.addEventListener("mousedown", (event) => {
        // const  targetPositionX = child.parent.position.x / 100;
        // const  targetPositionY = child.parent.position.y / 100;
        // const  targetPositionZ = child.parent.position.z / 100;
        // secondcamera.lookAt(targetPositionX, targetPositionY, targetPositionZ);
        // console.log("look At")
        // console.log(targetPositionX, targetPositionY, targetPositionZ)

        // log click mash attributes
        console.log(
          "Name: " +
            event.target.name +
            " ID: " +
            event.target.material.uuid +
            " Type: " +
            event.target.type +
            " color: " +
            event.target.color
        );

        // material for the selected building
        const newMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });

        // check if object is a building
        if (event.target.parent.name.includes("building") == true) {
          // deselect previous building
          if (typeof prevClickName !== "undefined") {
            console.log("Previous: " + prevClickName);
            model.getObjectByName(prevClickName).material = wall;
            model.getObjectByName(prevClickName + "_1").material = roof;
          }

          // get name of selected mash
          let clickName = event.target.name;
          console.log("Current " + clickName);

          // remove suffix
          if (clickName.includes("_1") == true) {
            clickName = clickName.replace("_1", "");
          }

          // save current name for the next selection
          prevClickName = clickName;

          // Change materials of the selected building
          model.getObjectByName(clickName).material = newMaterial;
          // console.log(
          //   "Position" +
          //     model.getObjectByName(clickName).getWorldPosition(child.position)
          // );
          // console.log(
          //   "Position" +
          //     getWorldPosition(model.getObjectByName(clickName).position)
          // );
          model.getObjectByName(clickName).visible = false;
          model.getObjectByName(clickName + "_1").material = newMaterial;
        }

        event.stopPropagation();

        const path = getPath(event.target);
        logDiv.innerHTML =
          '<span style="color: #0000ff">' + path + " – mousedown</span>";
      });
    }
  });
};

/**
 * Models
 */

var model, gltf;

gltfLoader.load("/models/04_Energiequartier.gltf", (gltf) => {
  gltf.scene.scale.set(0.01, 0.01, 0.01);
  gltf.scene.position.set(0, 0, 0);
  gltf.scene.rotation.y = -1.59;
  gltf.scene.receiveShadow = true;
  gltf.scene.castShadow = true;
  scene.add(gltf.scene);

  const sceneSettings = gui.addFolder("Szene");

  sceneSettings
    .add(gltf.scene.rotation, "y")
    .min(-Math.PI)
    .max(Math.PI)
    .step(0.01)
    .name("rotation");
  updateAllMaterials();

  model = gltf.scene;
});

var model, gltf;

/**
 * Light
 */

const directionalLight = new THREE.DirectionalLight("#ffffff", 2);
directionalLight.position.set(0.616, 1.182, 0.074);
directionalLight.castShadow = true; // default false
scene.add(directionalLight);

//Set up shadow properties for the light
directionalLight.shadow.mapSize.width = 1024 * 2; // default
directionalLight.shadow.mapSize.height = 1024 * 2; // default
directionalLight.shadow.camera.near = 0.01; // default
directionalLight.shadow.camera.far = 5; // default

directionalLight.shadow.camera.top = 2;
directionalLight.shadow.camera.right = 2;
directionalLight.shadow.camera.bottom = -2;
directionalLight.shadow.camera.left = -2;

// directionalLight.shadow.radius = 3 just pcf

// gui.add(directionalLight, 'intensity').min(0).max(10).step(0.001).name('lightIntensity')
// gui.add(directionalLight.position, 'x').min(-5).max(5).step(0.001).name('lightX')
// gui.add(directionalLight.position, 'y').min(0).max(5).step(0.001).name('lightY')
// gui.add(directionalLight.position, 'z').min(-5).max(5).step(0.001).name('lightZ')
// gui.add(directionalLight, 'castShadow').name('Shadow')

const directionalLightCameraHelper = new THREE.CameraHelper(
  directionalLight.shadow.camera
);
// scene.add(directionalLightCameraHelper)

// const ambientLight = new THREE.AmbientLight( 0x404040 ); // soft white light
// scene.add( ambientLight );

const ambientLight = new THREE.DirectionalLight("#ffffff", 3);
ambientLight.position.set(-2, 5, 1);
ambientLight.intensity = 1.2;
// ambientLight.castShadow = true; // default false
scene.add(ambientLight);

ambientLight.shadow.camera.near = 0.01; // default
ambientLight.shadow.camera.far = 5; // default

// const ambientLightCameraHelper = new THREE.CameraHelper(ambientLight.shadow.camera)
// scene.add(ambientLightCameraHelper)
// gui.add(ambientLight, 'intensity').min(0).max(10).step(0.001).name('ambientLightIntensity')
// gui.add(ambientLight.position, 'x').min(-5).max(10).step(0.001).name('ambientLightX')
// gui.add(ambientLight.position, 'y').min(0).max(10).step(0.001).name('ambientLightY')
// gui.add(ambientLight.position, 'z').min(-5).max(10).step(0.001).name('ambientLightZ')

/**
 * Animate
 */

const tick = () => {
  // Update controls
  // controls.update()

  interactionManager.update();
  // Render

  renderer.render(scene, camera);

  // console.log(camera.position)

  // console.log(camera.rotation)
  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();

function getPath(object) {
  const string = object.name + " [" + object.type + "]";

  if (object.parent) {
    return getPath(object.parent) + " > " + string;
  } else {
    return string;
  }
}
