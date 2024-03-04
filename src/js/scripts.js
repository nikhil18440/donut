import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
import {CSS2DRenderer} from 'three/examples/jsm/renderers/CSS2DRenderer.js'

const donutURL = new URL('../img/donut5.glb', import.meta.url)

const renderer = new THREE.WebGLRenderer()
renderer.shadowMap.enabled = true
renderer.setSize(window.innerWidth, window.innerHeight)

document.body.appendChild(renderer.domElement)


const scene = new THREE.Scene()

const camera = new THREE .PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
)

const orbit = new OrbitControls(camera,renderer.domElement)

// const axesHelper = new THREE.AxesHelper(5)
// scene.add(axesHelper)

camera.position.set(0,0,0.6)
orbit.update()


//light
const directionalLight = new THREE.DirectionalLight(0xffffff, 2.5)
scene.add(directionalLight)
directionalLight.position.set(10,10,5)
directionalLight.castShadow = true
directionalLight.shadow.camera.top = 12

// const dlightHelper = new THREE.DirectionalLightHelper(directionalLight)
// scene.add(dlightHelper)

// const dlightShadowHelper = new THREE.CameraHelper(directionalLight.shadow.camera)
// scene.add(dlightShadowHelper)


// materials
const assetLoader = new GLTFLoader()
let modelObj
assetLoader.load(donutURL.href, function (gltf) {
    const model = gltf.scene
    scene.add(model)
    
    model.position.set(0,0,0)
    modelObj = model
}, undefined, function (error) {
    console.log(error)
})

// adding text
const labelRenderer = new CSS2DRenderer()
labelRenderer.setSize(window.innerWidth, window.innerHeight)
labelRenderer.domElement.style.position = 'absolute'
labelRenderer.domElement.style.top = '0px'
labelRenderer.domElement.style.pointerEvents = 'none'
document.body.appendChild(labelRenderer.domElement)

// renderer.setClearColor('#444444',1)


let quaternion = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0,0,1).normalize(), 0.005)
function animate(time) {
    renderer.render(scene, camera)
    
    // modelObj.rotation.x = time / 1000;
    if(modelObj){
        modelObj.rotateX(-0.004)
    }
    
    labelRenderer.render(scene, camera)
    // modelObj.rotation.setFromQuaternion(quaternion)
    // console.log(quaternion)
}


window.addEventListener('resize', function () {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth , window.innerHeight)
    labelRenderer.setSize(this.window.innerWidth, this.window.innerHeight)
})


renderer.setAnimationLoop(animate)