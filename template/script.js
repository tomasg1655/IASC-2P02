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
camera.position.set(0, 0, 5)
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

const sphereGeometry = new THREE.SphereGeometry(1)
const sphereMaterial = new THREE.MeshNormalMaterial()
const testSphere = new THREE.Mesh(sphereGeometry, sphereMaterial)

const clock = new THREE.Clock()
scene.add(testSphere)

testSphere.position.set(0, 0, 0)

/*******
** UI **
*******/
const ui = new dat.GUI()


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

    

    //scale
    //triangle.scale.x = Math.sin(elapsedTime)
   // triangle.scale.y = Math.sin(elapsedTime)
   // triangle.scale.z = Math.sin(elapsedTime)

    //Request next frame
    window.requestAnimationFrame(animation)

}

animation()
