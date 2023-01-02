import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Stats from 'three/examples/jsm/libs/stats.module'
import { GUI } from 'dat.gui'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import { Loader } from 'three'
// var AsciiEffect = require('three-asciieffect')
// AsciiEffect = require('three-asciieffect')

const scene = new THREE.Scene()
scene.background = new THREE.Color(0x0000ff)
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1500
)
camera.position.z = 2

scene.fog = new THREE.Fog(0x000000, 0.015, 100)

const skyMesh = new THREE.SphereGeometry(50)
const skyMaterial = new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load('models/textures/space.avif'),
    side: THREE.DoubleSide
})
const skybox = new THREE.Mesh(skyMesh, skyMaterial)
scene.add(skybox)

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)



// Controls
const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
controls.dampingFactor = 0.05
controls.maxDistance = 30
controls.minDistance = 0.1

// Create Saturn
const SaturnGeometry = new THREE.SphereGeometry(1, 32, 32)
// const SaturnTexture = new THREE.TextureLoader().load('models/textures/saturn.jpeg')
// const SaturnMaterial = new THREE.MeshPhongMaterial({ map: SaturnTexture })
const SaturnMaterial = new THREE.MeshPhongMaterial({ flatShading: true })
const saturn = new THREE.Mesh(SaturnGeometry, SaturnMaterial)
scene.add(saturn)

// Create Rings
const ringGeometry = new THREE.RingGeometry(1.2, 2, 50)
const ringMaterial = new THREE.MeshPhongMaterial({color: 0x00ff00, side: THREE.DoubleSide, transparent: true, opacity: 0.5})
const ring = new THREE.Mesh(ringGeometry, ringMaterial)
ring.rotation.x =  1.7
const ringSystem = new THREE.Object3D()
ringSystem.add(ring)
saturn.add(ringSystem)

// Create Moons
// Titan
const titanGeometry = new THREE.SphereGeometry(0.1, 32, 32)
const titanTexture = new THREE.TextureLoader().load('models/textures/titan.jpeg')
const titanMaterial = new THREE.MeshPhongMaterial({ map: titanTexture })
const titan = new THREE.Mesh(titanGeometry, titanMaterial)
titan.position.x = 5
const titanSystem = new THREE.Object3D()
titanSystem.add(titan)
saturn.add(titanSystem)
// Encelaedus
const encelaedusGeometry = new THREE.SphereGeometry(0.1, 32, 32)
const encelaedusTexture = new THREE.TextureLoader().load('models/textures/encelaedus.jpeg')
const encelaedusMaterial = new THREE.MeshPhongMaterial({ map: encelaedusTexture })
const encelaedus = new THREE.Mesh(encelaedusGeometry, encelaedusMaterial)
encelaedus.position.x = 9
encelaedus.position.y = 1
const encelaedusSystem = new THREE.Object3D()
encelaedusSystem.add(encelaedus)
saturn.add(encelaedusSystem)
// Rhea
const rheaGeometry = new THREE.SphereGeometry(0.1, 32, 32)
const rheaTexture = new THREE.TextureLoader().load('models/textures/rhea.jpeg')
const rheaMaterial = new THREE.MeshPhongMaterial({ map: rheaTexture })
const rhea = new THREE.Mesh(rheaGeometry, rheaMaterial)
rhea.position.x = 13
rhea.position.y = 2
const rheaSystem = new THREE.Object3D()
rheaSystem.add(rhea)
saturn.add(rheaSystem)
// Iapetus
const iapetusGeometry = new THREE.SphereGeometry(0.1, 32, 32)
const iapetusTexture = new THREE.TextureLoader().load('models/textures/iapetus.jpeg')
const iapetusMaterial = new THREE.MeshPhongMaterial({ map: iapetusTexture })
const iapetus = new THREE.Mesh(iapetusGeometry, iapetusMaterial)
iapetus.position.x = 18
iapetus.position.y = 3
const iapetusSystem = new THREE.Object3D()
iapetusSystem.add(iapetus)
saturn.add(iapetusSystem)
// Dione
const dioneGeometry = new THREE.SphereGeometry(0.1, 32, 32)
const dioneTexture = new THREE.TextureLoader().load('models/textures/dione.jpeg')
const dioneMaterial = new THREE.MeshPhongMaterial({ map: dioneTexture })
const dione = new THREE.Mesh(dioneGeometry, dioneMaterial)
dione.position.x = 25
dione.position.y = 4
const dioneSystem = new THREE.Object3D()
dioneSystem.add(dione)
saturn.add(dioneSystem)
// Tethys
const tethysGeometry = new THREE.SphereGeometry(0.1, 32, 32)
const tethysTexture = new THREE.TextureLoader().load('models/textures/tethys.jpeg')
const tethysMaterial = new THREE.MeshPhongMaterial({ map: tethysTexture })
const tethys = new THREE.Mesh(tethysGeometry, tethysMaterial)
tethys.position.x = 7.5
tethys.position.y = 5
const tethysSystem = new THREE.Object3D()
tethysSystem.add(tethys)
saturn.add(tethysSystem)
// Mimas
const mimasGeometry = new THREE.SphereGeometry(0.1, 32, 32)
const mimasTexture = new THREE.TextureLoader().load('models/textures/mimas.jpeg')
const mimasMaterial = new THREE.MeshPhongMaterial({ map: mimasTexture })
const mimas = new THREE.Mesh(mimasGeometry, mimasMaterial)
mimas.position.x = 8.5
mimas.position.y = 6
const mimasSystem = new THREE.Object3D()
mimasSystem.add(mimas)
saturn.add(mimasSystem)




window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}

const light = new THREE.AmbientLight()
scene.add(light)

const stats = Stats()
document.body.appendChild(stats.dom)

// GUI AND FOLDERS
const gui = new GUI()

const ringFolder = gui.addFolder("Ring")
ringFolder.add(ring.rotation, "x", 0, Math.PI *2 ) 
ringFolder.add(ring.rotation, "y", 0,  Math.PI *2 ) 
ringFolder.add(ring.rotation, "z", 0,  Math.PI *2 ) 
ringFolder.add(ring.scale, "x", 0, 2 ) 
ringFolder.add(ring.scale, "y", 0, 2 )
ringFolder.open()

const textureFolder = gui.addFolder("Texture")
textureFolder.add(SaturnMaterial, "wireframe")
textureFolder.add(SaturnMaterial, "wireframeLinewidth", 0, 10)
// textureFolder.add(SaturnTexture.center, "x", 0, 1)
// textureFolder.add(SaturnTexture.center, "y", 0, 1)
// textureFolder.add(SaturnTexture.offset, "x", 0, 1)
// textureFolder.add(SaturnTexture.repeat, "x", 0, 10)
// textureFolder.add(SaturnTexture.repeat, "y", 0, 10)
// textureFolder.add(SaturnMaterial.center, "x", 0, 1)
// textureFolder.add(SaturnMaterial.center, "y", 0, 1)
textureFolder.open()

//ASCII ART
// Ascii Effect
// const effect = new AsciiEffect( renderer, ' .:-+*=%@#', { invert: true } );
// effect.setSize( window.innerWidth, window.innerHeight );
// effect.domElement.style.color = 'black';
// effect.domElement.style.backgroundColor = 'white';
// const asciiEffect = new AsciiEffect(renderer);

const cameraFolder = gui.addFolder("Camera")
cameraFolder.add(camera.position, "z", 0, 20)
cameraFolder.open()

function animate() {
    requestAnimationFrame(animate)
    saturn.rotation.y -= 0.005
    // ring.rotation.x += 0.01
    // ring.rotation.y += 0.01

    titan.rotation.y += 0.01
    titanSystem.rotation.y += 0.03
    titanSystem.rotation.x += 0.01
    
    rhea.rotation.y += 0.01
    rheaSystem.rotation.y += 0.01
    rheaSystem.rotation.x += 0.02

    iapetus.rotation.y += 0.01
    iapetusSystem.rotation.y += 0.04
    iapetusSystem.rotation.x += 0.01
    
    dione.rotation.y += 0.03
    dioneSystem.rotation.y += 0.03
    dioneSystem.rotation.x += 0.01
    
    tethys.rotation.y += 0.01
    tethysSystem.rotation.y += 0.01
    tethysSystem.rotation.x += 0.03
    
    mimas.rotation.y += 0.01
    mimasSystem.rotation.x += 0.005
    mimasSystem.rotation.y += 0.01
    
    stats.update()
    render()
}

function render() {
    renderer.render(scene, camera)
}
render()
animate()