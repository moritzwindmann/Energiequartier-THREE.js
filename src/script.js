import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import * as dat from 'dat.gui'
import { TextureDataType, TextureLoader } from 'three'
import { InteractionManager } from 'three.interactive'

/**
 * Loaders
 */

const gltfLoader = new GLTFLoader()
const cubeTextureLoader = new THREE.CubeTextureLoader()

/**
 * Textures
 */

 const textureLoader = new THREE.TextureLoader()

 const doorColorTexture = textureLoader.load('/textures/door/color.jpg')
 const doorAlphaTexture = textureLoader.load('/textures/door/alpha.jpg')
 const doorAmbientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
 const doorHeightTexture = textureLoader.load('/textures/door/height.jpg')
 const doorNormalTexture = textureLoader.load('/textures/door/normal.jpg')
 const doorMetalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
 const doorRoughnessTexture = textureLoader.load('/textures/door/roughness.jpg')
 
 const bricksColorTexture = textureLoader.load('/textures/bricks/color.jpg')
 const bricksAmbientOcclusionTexture = textureLoader.load('/textures/bricks/ambientOcclusion.jpg')
 const bricksNormalTexture = textureLoader.load('/textures/bricks/normal.jpg')
 const bricksRoughnessTexture = textureLoader.load('/textures/bricks/roughness.jpg')
 
 bricksColorTexture.encoding =  THREE.sRGBEncoding;
 bricksColorTexture.flipY = false;

 bricksColorTexture.wrapS = THREE.RepeatWrapping
 bricksColorTexture.wrapT = THREE.RepeatWrapping

 const grassColorTexture = textureLoader.load('/textures/grass/color.jpg')
 const grassAmbientOcclusionTexture = textureLoader.load('/textures/grass/ambientOcclusion.jpg')
 const grassNormalTexture = textureLoader.load('/textures/grass/normal.jpg')
 const grassRoughnessTexture = textureLoader.load('/textures/grass/roughness.jpg')
 
 grassColorTexture.repeat.set(8, 8)
 grassAmbientOcclusionTexture.repeat.set(8, 8)
 grassNormalTexture.repeat.set(8, 8)
 grassRoughnessTexture.repeat.set(8, 8)

 grassColorTexture.wrapS = THREE.RepeatWrapping
 grassAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping
 grassNormalTexture.wrapS = THREE.RepeatWrapping
 grassRoughnessTexture.wrapS = THREE.RepeatWrapping
 
 grassColorTexture.wrapT = THREE.RepeatWrapping
 grassAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping
 grassNormalTexture.wrapT = THREE.RepeatWrapping
 grassRoughnessTexture.wrapT = THREE.RepeatWrapping

// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Sizes
 */
 const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    console.log( renderer.info.render.triangles );

})


/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(30, sizes.width / sizes.height, 0.1, 100)
camera.position.set(4, 1, - 4)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
 const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    background: false,
    antialias: true
})

renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.physicallyCorrectLights = true
renderer.outputEncoding = THREE.sRGBEncoding
renderer.shadowMap.enabled = true;
renderer.setClearColor('#dec9ad')
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap


 /**
 * interactionManager
 */

  const interactionManager = new InteractionManager(
    renderer,
    camera,
    renderer.domElement
  );


  const logDiv = document.querySelector('#title .log');

/**
 * Fog
 */

 const fog = new THREE.Fog('#dec9ad', 8, 15)
 scene.fog = fog

/**
 * Materials
 */
const terrain = new THREE.MeshStandardMaterial({color: 0xdec9ad});
const wall =  new THREE.MeshStandardMaterial({color: 0xdec9ad})
const roof =  new THREE.MeshStandardMaterial({color: 0xff0000})

var params = {
    wallColor: 0xffffff,
    wallEmissive: 0x000000,

    roofColor: 0xff0000,
    roofEmissive: 0x000000
};

var folder = gui.addFolder( 'Materials' );

folder.addColor( params, 'wallColor' ).onChange( function() { wall.color.set( params.wallColor ); } );
folder.addColor( params, 'wallEmissive' ).onChange( function() { wall.emissive.set( params.wallEmissive ); } );
folder.add(wall, 'roughness').min(0).max(1).step(0.001).name('wallRoughness')
folder.add(wall, 'metalness').min(0).max(1).step(0.001).name('wallMetalness')

folder.addColor( params, 'roofColor' ).onChange( function() { roof.color.set( params.roofColor ); } );
folder.addColor( params, 'roofEmissive' ).onChange( function() { roof.emissive.set( params.roofEmissive ); } );
folder.add(roof, 'roughness').min(0).max(1).step(0.001).name('roofRoughness')
folder.add(roof, 'metalness').min(0).max(1).step(0.001).name('roofMetalness')

folder.open();


const wallTexture = new THREE.MeshStandardMaterial({
    map: bricksColorTexture,
    aoMap: bricksAmbientOcclusionTexture,
    normalMap: bricksNormalTexture,
    roughnessMap: bricksRoughnessTexture
});    


const testCube = new THREE.Mesh(
    new THREE.BoxGeometry(0.5, 0.5, 0.5),
)
testCube.material = wallTexture
testCube.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(testCube.geometry.attributes.uv.array, 2))

testCube.position.set(1,0,0.4)
scene.add(testCube)
console.log(wall.map);

/**
 * Update Materials
 */

const debugObject = {
} 

let objectsHover = [];

const updateAllMaterials = () =>
{
    scene.traverse((child) => {
        if(child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial){
            // console.log(child.material.name)

            if(child.name == 'Terrain001') {
                child.material = terrain
                child.receiveShadow = true;
            }

            if(child.material.name == 'wall') {
                child.material = wall;
                // child.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(child.geometry.attributes.uv.array, 2))
                console.log(child.material.map);
                // console.log(wall.map);

            }

            if(child.material.name == 'roof') {
                child.material = roof;
                // child.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(child.geometry.attributes.uv.array, 2))
                // console.log(child.roof.map);
                // console.log(roof.map);

            }

            child.material.envMap = enviromentMap
            child.material.envMapIntensity = debugObject.envMapIntensity
            // child.material.flatShading = true
            // child.material.wireframe = true
            // child.receiveShadow = true;

            child.castShadow = true;
            // child.generateMipmaps = false;
            // child.magFilter = THREE.LinearFilter;
            // child.manFilter = THREE.LinearFilter;
        // };


        // if (child.children.length === 0) {
            // Add only objects widthout children
            // if (child.material) {
            //   child.material = child.material.clone();
            //   child.userData.initialEmissive = child.material.emissive.clone();
            //   child.material.emissiveIntensity = 0.5;
            // }

            interactionManager.add(child);

            child.addEventListener('mouseover', (event) => {
              console.log(event);
              console.log(child);
              // event.stopPropagation();
              if (!objectsHover.includes(event.target))
                objectsHover.push(event.target);

              document.body.style.cursor = 'pointer';

              const path = getPath(event.target);
              logDiv.innerHTML =
                '<span style="color: #ff0000">' + path + ' – mouseover</span>';

                if (child.material) {
                    child.userData.materialEmissiveHex = child.material.emissive.getHex();
                    child.material.emissive.setHex(0x000000);
                    child.material.emissiveIntensity = 0.5;
                }
            });

            child.addEventListener('mouseout', (event) => {
              console.log(event);
              // event.stopPropagation();

              objectsHover = objectsHover.filter((n) => n !== event.target);
              if (objectsHover.length > 0) {
                const o = objectsHover[objectsHover.length - 1];
                // o.material.emissive.setHex(0xff0000);
                logDiv.innerHTML = getPath(o);
              } else {
                logDiv.innerHTML = '';
              }

              document.body.style.cursor = 'default';

              if (child.material) {
                child.material.emissive.setHex(
                  child.userData.materialEmissiveHex
                );
              }
            });

            child.addEventListener('mousedown', (event) => {
              console.log(event);
              console.log(event.target.name);
              event.stopPropagation();
            //   child.position.y = 1
            // child.scale.y = 1

              if (child.material) {
                child.material.emissive.setHex(0x0000ff);
              }

              const path = getPath(event.target);
              logDiv.innerHTML =
                '<span style="color: #0000ff">' + path + ' – mousedown</span>';
            });
          }
        
    })
}


/**
 * Map
 */

const enviromentMap = cubeTextureLoader.load([
    '/textures/environmentMaps/1/px.jpg',
    '/textures/environmentMaps/1/nx.jpg',
    '/textures/environmentMaps/1/py.jpg',
    '/textures/environmentMaps/1/ny.jpg',
    '/textures/environmentMaps/1/pz.jpg',
    '/textures/environmentMaps/1/nz.jpg'
])

// scene.background = enviromentMap
scene.environment = enviromentMap

debugObject.envMapIntensity = 5
gui.add(debugObject, 'envMapIntensity').min(0).max(10).step(0.001).name('envMap').onChange(updateAllMaterials)
    
/**
 * Models
 */

gltfLoader.load(
    // 'models/FlightHelmet/glTF/FlightHelmet.gltf',
    // 'models/arrenberg-scene_comp.gltf', 
    // '/models/BlenderOSM/Blender-OSM_02.gltf', 
    '/models/Arrenberg-Blender_01.gltf', 
    (gltf) => {
        gltf.scene.scale.set(0.01,0.01,0.01)
        gltf.scene.position.set(0,0,0)
        gltf.scene.rotation.y = -1.59

        gltf.scene.receiveShadow = true;
        gltf.scene.castShadow = true;

        scene.add(gltf.scene)
        gui.add(gltf.scene.rotation, 'y').min(- Math.PI).max(Math.PI).step(0.01).name('rotation')
       
        updateAllMaterials()

    }   
)

/**
 * Light
 */

const directionalLight = new THREE.DirectionalLight('#ffffff', 2)
directionalLight.position.set(0.616, 1.182, 0.074)
directionalLight.castShadow = true; // default false
scene.add(directionalLight)

//Set up shadow properties for the light
directionalLight.shadow.mapSize.width = 1024 * 2; // default
directionalLight.shadow.mapSize.height = 1024 * 2; // default
directionalLight.shadow.camera.near = 0.01; // default
directionalLight.shadow.camera.far = 5; // default

directionalLight.shadow.camera.top = 2
directionalLight.shadow.camera.right = 2
directionalLight.shadow.camera.bottom = - 2
directionalLight.shadow.camera.left = - 2

// directionalLight.shadow.radius = 3 just pcf

gui.add(directionalLight, 'intensity').min(0).max(10).step(0.001).name('lightIntensity')
gui.add(directionalLight.position, 'x').min(-5).max(5).step(0.001).name('lightX')
gui.add(directionalLight.position, 'y').min(0).max(5).step(0.001).name('lightY')
gui.add(directionalLight.position, 'z').min(-5).max(5).step(0.001).name('lightZ')
gui.add(directionalLight, 'castShadow').name('Shadow')

const directionalLightCameraHelper = new THREE.CameraHelper(directionalLight.shadow.camera)
scene.add(directionalLightCameraHelper)

// const ambientLight = new THREE.AmbientLight( 0x404040 ); // soft white light
// scene.add( ambientLight );


const ambientLight = new THREE.DirectionalLight('#ffffff', 3)
ambientLight.position.set(-2, 5, 1)
ambientLight.intensity = 1.605
// ambientLight.castShadow = true; // default false
scene.add(ambientLight)


ambientLight.shadow.camera.near = 0.01; // default
ambientLight.shadow.camera.far = 5; // default

// const ambientLightCameraHelper = new THREE.CameraHelper(ambientLight.shadow.camera)
// scene.add(ambientLightCameraHelper)
gui.add(ambientLight, 'intensity').min(0).max(10).step(0.001).name('ambientLightIntensity')
gui.add(ambientLight.position, 'x').min(-5).max(10).step(0.001).name('ambientLightX')
gui.add(ambientLight.position, 'y').min(0).max(10).step(0.001).name('ambientLightY')
gui.add(ambientLight.position, 'z').min(-5).max(10).step(0.001).name('ambientLightZ')



/**
 * Animate
 */

const tick = () =>
{
    // Update controls
    controls.update()

    interactionManager.update();
    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()

function getPath(object) {
    const string = object.name + ' [' + object.type + ']';

    if (object.parent) {
      return getPath(object.parent) + ' > ' + string;
    } else {
      return string;
    }
  }