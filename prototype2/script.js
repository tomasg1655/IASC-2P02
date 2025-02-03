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
scene.background = new THREE.Color('green')
//Camera
const camera = new THREE.PerspectiveCamera(
    75,
    sizes.aspectRatio,
    0.1,
    100
)
scene.add(camera)
camera.position.set(-2, 2, -5)
//Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
})
renderer.setSize(sizes.width, sizes.height)

/**************
 ** Controls **
 *************/
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
/************
 ** MESHES **
************/
// testSphere

const sphereGeometry = new THREE.SphereGeometry()
const sphereMaterial = new THREE.MeshNormalMaterial()
const testSphere = new THREE.Mesh(sphereGeometry, sphereMaterial)

const clock = new THREE.Clock()
//scene.add(testSphere)


// Plane
const planeGeometry = new THREE.PlaneGeometry(10, 10, 50, 50)
const planeMaterial = new THREE.MeshBasicMaterial({
    color: new THREE.Color('white'),
    side: THREE.DoubleSide,
    wireframe: true
})
const plane = new THREE.Mesh(planeGeometry, planeMaterial)
plane.rotation.x = Math.PI * 0.5
scene.add(plane)

testSphere.position.set(0, 0, 0)

const torusKnotgeometry = new THREE.TorusKnotGeometry( 5, 0.5, 150000, 25 )
const torusKnotmaterial = new THREE.MeshBasicMaterial( { color: 'pink'} )
const torusKnot = new THREE.Mesh( torusKnotgeometry, torusKnotmaterial )
scene.add( torusKnot )


/*******
** UI **
*******/
const ui = new dat.GUI()

// UI Object
const uiObject = {
    speed: 1,
    distance: 1,
    rotationSpeed: 0.5
}

//testSphere UI
const torusKnotFolder = ui.addFolder('Torus Knot')

torusKnotFolder
    .add(uiObject, 'speed')
    .min (0.1)
    .max (10)
    .step (0.1)
    .name('speed')

torusKnotFolder
    .add(uiObject, 'distance')
    .min (0.1)
    .max (10)
    .step (0.1)
    .name('distance')

torusKnotFolder
    .add(uiObject, 'rotationSpeed')
    .min (0.1)
    .max (50)
    .step (0.1)
    .name('rotationSpeed')
//plane UI
const planeFolder = ui.addFolder('Plane')
planeFolder
    .add(planeMaterial, 'wireframe')
    .name("Toggle Wireframe")
    
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
    testSphere.position.z = Math.sin(elapsedTime)
    const speed = 1
    const distance = 2
    //triangle.position.y = Math.sin(elapsedTime * speed) * distance
    //Renderer
    renderer.render(scene, camera)
    // rotate
    const rotationSpeed = 1
    //Update  OrbitControls
    controls.update()

    // Animate TorusKnot
    torusKnot.position.y = Math.sin(elapsedTime * uiObject.speed) * uiObject.distance

    //rotate TorusKnot
    torusKnot.rotation.x = elapsedTime * uiObject.rotationSpeed
    torusKnot.rotation.y = elapsedTime * uiObject.rotationSpeed


    //scale
    //triangle.scale.x = Math.sin(elapsedTime)
   // triangle.scale.y = Math.sin(elapsedTime)
   // triangle.scale.z = Math.sin(elapsedTime)

    //Request next frame
    window.requestAnimationFrame(animation)

}

animation()
