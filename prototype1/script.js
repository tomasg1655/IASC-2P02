import * as THREE from "three"
console.log(THREE)
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
    window.innerWidth / window.innerHeight,
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
renderer.setSize(window.innerWidth, window.innerHeight,
)

/************
 ** MESHES **
************/
// testSphere
const sphereGeometry = new THREE.SphereGeometry(1)
const sphereMaterial = new THREE.MeshNormalMaterial()
const testSphere = new THREE.Mesh(sphereGeometry, sphereMaterial)

scene.add(testSphere)

testSphere.position.set(0, 0, 0)


const geometry = new THREE.TriangleGeometry (1.5, 1.5, 7)
const material = new THREE.MeshNormalMaterial()
const triangle = new THREE.Mesh(geometry,material)
cube.position.set(0, 0.5, -5.5)
scene.add(THREE.triangle)
/********************
 ** ANIMATION LOOP **
********************/


const animation = () =>
{
    // Return elasped Time
    const elapsedTime = clock.getElapsedTime ()

    // Animate testSphere
    testSphere.position.z = Math.sin(elapsedTime)
    const speed = 1
    const distance = 2
    triangle.position.y = Math.sin(elapsedTime * speed) * distance
    //Renderer
    renderer.render(scene, camera)
    // rotate
    const rotationSpeed = 1
    triangle.rotation.x elapsedTime * rotationSpeed
    triangle.rotation.y elapsedTime * rotationSpeed
    triangle.rotation.z elapsedTime * rotationSpeed

    //scale
    triangle.scale.x = Math.sin(elapsedTime)
    triangle.scale.y = Math.sin(elapsedTime)
    triangle.scale.z = Math.sin(elapsedTime)

    //Request next frame
    window.requestAnimationFrame(animation)

}

animation()
