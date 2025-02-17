import * as THREE from "three"
import { OrbitControls } from "OrbitControls"
import * as dat from "lil-gui"
console.log(THREE)

/********** 
** SETUP **
**********/

//Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
    aspectRatio: window.innerWidth / window.innerHeight

}

/***********
 ** SCENE **
 **********/
// Canvas
const canvas = document.querySelector('.webgl')
//Scene
const scene = new THREE.Scene()
scene.background = new THREE.Color('black')
//Camera
const camera = new THREE.PerspectiveCamera(
    75,
    sizes.aspectRatio,
    0.1,
    100
)
scene.add(camera)
camera.position.set(10, 2, 7.5)
//Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap


/**************
 ** Controls **
 *************/
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
/************
 ** MESHES **
************/
// Cave ----------------
const caveGeometry = new THREE.PlaneGeometry(15.5, 7.5)
const caveMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('white'),
    side: THREE.DoubleSide
})

const cave = new THREE.Mesh(caveGeometry, caveMaterial)
cave.receiveShadow = true
scene.add(cave)
const clock = new THREE.Clock()
cave.rotation.y = Math.PI * 0.5



// objects
//const torusKnotGeometry = new THREE.TorusKnotGeometry(1, 0.2)
//const torusKnotMaterial = new THREE.MeshNormalMaterial()
//const torusKnot = new THREE.Mesh(torusKnotGeometry, torusKnotMaterial)
//torusKnot.position.set(6, 1, 0)
//scene.add(torusKnot)
//torusKnot.castShadow = true

// Smiley Face 

// Face Sphere
const sphereGeometry = new THREE.SphereGeometry(0.25)
const sphereMaterial = new THREE.MeshNormalMaterial()
const testSphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
scene.add(testSphere)
testSphere.castShadow = true
testSphere.position.set(5, 1, -1)

const sphereGeometry1 = new THREE.SphereGeometry(0.25)
const sphereMaterial1 = new THREE.MeshNormalMaterial()
const testSphere1 = new THREE.Mesh(sphereGeometry, sphereMaterial)
scene.add(testSphere1)
testSphere1.castShadow = true
testSphere1.position.set(5, 1, 1)

//mouth ---- didn't know how to do i the way you showed so I did a different route to create a half sphere to produce the final result of a mouth for a smiley face
const halfSphereGeometry = new THREE.SphereGeometry(
    0.5,
    32,
    32,
    0,
    Math.PI
)
const halfSphereMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('pink'),
    side: THREE.DoubleSide
})

const halfSphere = new THREE.Mesh(halfSphereGeometry, halfSphereMaterial)
scene.add(halfSphere)
halfSphere.castShadow = true
halfSphere.position.set (5, 0, 0)
halfSphere.rotation.x = Math.PI * 0.5

/**********
**Lights***
**********/

//const ambientLight = new THREE.AmbientLight(
//    new THREE.Color('white')
//)
//const ambientLight = new THREE.AmbientLight(0x404040)
//scene.add(ambientLight)

//directional light
const directionalLight = new THREE.DirectionalLight(
    new THREE.Color('white'),
    0.5
)
scene.add(directionalLight)
directionalLight.position.set(20, 4.1, 0)
directionalLight.castShadow = true
directionalLight.target = cave
directionalLight.shadow.mapSize.width = 1024
directionalLight.shadow.mapSize.height = 1024


//directional light helper
const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight)
scene.add(directionalLightHelper)


/*******
** UI **
*******/
const ui = new dat.GUI()
const lightPositionFolder = ui.addFolder('Light Position')
lightPositionFolder
    .add(directionalLight.position, 'y')
    .min(-10)
    .max(10)
    .step(0.1)
    .name('Y')

lightPositionFolder
    .add(directionalLight.position, 'z')
    .min(-10)
    .max(10)
    .step(0.1)
    .name('Z')



// UI Object
const uiObject = {
    speed: 1,
    distance: 1,
    rotationSpeed: 0.5
}

//plane UI

    
//const geometry = new THREE.TriangleGeometry (1.5, 1.5, 7)
//const material = new THREE.MeshNormalMaterial()
//const triangle = new THREE.Mesh(geometry,material)
//cube.position.set(0, 0.5, -5.5)
//scene.add(THREE.triangle)
/********************
 ** ANIMATION LOOP **
********************/


const animation = () =>
{

    // Return elasped Time
    const elapsedTime = clock.getElapsedTime ()
    console.log(elapsedTime)
    // Animate testSphere
    const speed = 1
    const distance = 2
    //triangle.position.y = Math.sin(elapsedTime * speed) * distance
    //Renderer
    renderer.render(scene, camera)
    // rotate
    const rotationSpeed = 1
    //Update  OrbitControls
    controls.update()

    //animate objects
   // torusKnot.rotation.y = elapsedTime

    //update direction light helper
    directionalLightHelper.update()


    //scale
    //triangle.scale.x = Math.sin(elapsedTime)
   // triangle.scale.y = Math.sin(elapsedTime)
   // triangle.scale.z = Math.sin(elapsedTime)

    //Request next frame
    window.requestAnimationFrame(animation)

}

animation()
