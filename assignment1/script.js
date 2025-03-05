import * as THREE from "three";
import * as dat from "lil-gui"
import { OrbitControls } from "OrbitControls"
//////////////////////////////////////////////////////////////////
/***********
 ** SETUP **
 ***********/
// Sizes
const sizes = {
    width: window.innerWidth * 0.4,
    height: window.innerHeight,
    aspectRatio: window.innerWidth / innerHeight
}
//////////////////////////////////////////////////////////////
/***********
 ** SCENE **
 ***********/
// Canvas
const canvas = document.querySelector('.webgl')
// Scene
const scene = new THREE.Scene()
//scene.background = new THREE.Color('black')
// Camera
const camera = new THREE.PerspectiveCamera(
    75,
    sizes.aspectRatio,
    0.1,
    100
)
scene.add(camera)
camera.position.set(10, 2, 7.5)
// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
//////////////////////////////////////////////////////
/************
 ** MESHES **
 ************/
// Cave
const caveGeometry = new THREE.PlaneGeometry(15.5, 7.5)
const caveMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('white'),
    side: THREE.DoubleSide
})
const cave = new THREE.Mesh(caveGeometry, caveMaterial)
cave.rotation.y = Math.PI * 0.5
cave.receiveShadow = true
scene.add(cave)
// Objects
const boxGeometry = new THREE.BoxGeometry(2.5, 2.5, 2.5)
const boxMaterial = new THREE.MeshStandardMaterial({color:new THREE.Color('gold')})
const box = new THREE.Mesh(boxGeometry, boxMaterial)
box.position.set(8.75, 1.3, 0)
box.scale.xyz= 0.75
box.castShadow = true
scene.add(box)
////////////////////////////////////////////////////
const torusGeometry = new THREE.TorusGeometry(3, 0.25, 3, 100)
const torusMaterial = new THREE.MeshStandardMaterial({color:new THREE.Color('gold')})
const torus = new THREE.Mesh(torusGeometry, torusMaterial)
torus.position.set(9, 1.5, 0)
torus.scale.xyz= 1
torus.castShadow = true
scene.add(torus)
///////////////////////////////////////////////////
/************
 ** LIGHTS ** 
 ************/
// Ambient Light
//const ambientLight = new THREE.AmbientLight(0x404040)
//const ambientLight = new THREE.AmbientLight(
//    new THREE.Color('white'))
//scene.add(ambientLight)
// Directional Light
const directionalLight = new THREE.DirectionalLight(
    new THREE.Color('white'),
    0.5
)
scene.add(directionalLight), directionalLight.position.set(20, 4.1, 0), directionalLight.target = cave, directionalLight.castShadow = true, directionalLight.shadow.mapSize.width = 1024, directionalLight.shadow.mapSize.height = 1024
// Directional Light Helper
const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight)
scene.add(directionalLightHelper)
//////////////////////////////////////////
/*********************
** DOM INTERACTIONS **
**********************/
const domObject = {
    part: 1, firstChange: false, secondChange: false,thirdChange: false, forthChange: false,
}
// part-one
document.querySelector('#part-one').onclick = function() {
    domObject.part = 1
}
// part-two
document.querySelector('#part-two').onclick = function() {
    domObject.part = 2
}
//1st-change
document.querySelector('#first-change').onclick = function(){
    domObject.firstChange = true
}
//2nd-change
document.querySelector('#second-change').onclick = function(){
    domObject.secondChange = true

}
//3rd-change
document.querySelector('#third-change').onclick = function(){
    domObject.thirdChange = true

}
//4th-change
document.querySelector('#fourth-change').onclick = function(){
    domObject.fourthChange = true
}
////////////////////////////////
/********
 ** UI **
 ********/
// UI
/*
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
    .min(-15)
    .max(15)
    .step(0.1)
    .name('Z')
*/
////////////////////////////  
/*******************
** ANIMATION LOOP **
********************/
const clock = new THREE.Clock()
//////////////////////////////
const animation = () =>
{
    // elapsedTime
    const elapsedTime = clock.getElapsedTime()
    //console.log(camera.position)
    // 1st-part
    if(domObject.part === 1)
    {
        camera.position.set(6, 0, 0), camera.lookAt(0, 0, 0)
    }
    //2nd-part
    if(domObject.part === 2)
    {
        camera.position.set(15, 1, 9), camera.lookAt(0, 0, 0)
    }
    // 1st-change
    if(domObject.firstChange)
    {
        box.rotation.z = elapsedTime *0.25
    }
    // 2nd-change
    if(domObject.secondChange)
    {
        box.rotation.y = (elapsedTime * 3), torus.position.z = Math.cos(elapsedTime * 3)
    }
    // 3rd-change
    if(domObject.thirdChange)
    {
        box.position.y = Math.sin(elapsedTime) + 2, torus.position.y = Math.sin(elapsedTime) + 2
    }
    //4th-change
    if(domObject.fourthChange)
    {
        box.rotation.y = Math.tan(elapsedTime * 10), torus.position.z = Math.cos(elapsedTime * 10)  
    }
    // Update directionalLightHelper
    directionalLightHelper.update()
    // Update OrbitControls
    controls.update()
    // Renderer
    renderer.render(scene, camera)
    //Request next frame
    window.requestAnimationFrame(animation)
}
animation()