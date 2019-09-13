
function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
} 
window.addEventListener('resize', onResize, false);
window.addEventListener( 'mousedown', onMouseDown, false );
window.addEventListener( 'mouseup', onMouseUp, false );
window.addEventListener( 'mousemove', mouseMove, false );

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 40, window.innerWidth/window.innerHeight, 0.1, 2000 );
camera.position.z = 80;

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

document.body.appendChild( renderer.domElement );

// controls
controls = new THREE.OrbitControls( camera, renderer.domElement );
//controls.addEventListener( 'change', render ); // call this only in static scenes (i.e., if there is no animation loop)
controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
controls.dampingFactor = 0.15;
controls.screenSpacePanning = false;
controls.minDistance = 70;
controls.maxDistance = 500;
controls.maxPolarAngle = Math.PI;
controls.rotateSpeed = 0.3;


// Shadows
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap

//Create a SpotLight and turn on shadows for the light
const lightDimension=100;
const light = new THREE.AmbientLight( 0xdddddd ); // soft white light
scene.add( light );


const light1 = new THREE.SpotLight( 0xffffff, 0.5 );
light1.castShadow = true;            // default false
scene.add( light1 );

//Set up shadow properties for the light
light1.shadow.mapSize.width = 512;  // default
light1.shadow.mapSize.height = 512; // default
light1.shadow.camera.near = 0.5;       // default
light1.shadow.camera.far = 500      // default
light1.position.set(lightDimension,lightDimension,lightDimension)

const light2 = new THREE.SpotLight( 0xffffff, 0.5 );
light2.castShadow = true;            // default false
scene.add( light2 );

//Set up shadow properties for the light
light2.shadow.mapSize.width = 512;  // default
light2.shadow.mapSize.height = 512; // default
light2.shadow.camera.near = 0.5;       // default
light2.shadow.camera.far = 500      // default
light2.position.set(lightDimension,lightDimension,-lightDimension)


const light3 = new THREE.SpotLight( 0xffffff, 0.5 );
light3.castShadow = true;            // default false
scene.add( light3 );

//Set up shadow properties for the light
light3.shadow.mapSize.width = 512;  // default
light3.shadow.mapSize.height = 512; // default
light3.shadow.camera.near = 0.5;       // default
light3.shadow.camera.far = 500      // default
light3.position.set(lightDimension,-lightDimension,lightDimension)


const light4 = new THREE.SpotLight( 0xffffff, 0.5 );
light4.castShadow = true;            // default false
scene.add( light4 );

//Set up shadow properties for the light
light4.shadow.mapSize.width = 512;  // default
light4.shadow.mapSize.height = 512; // default
light4.shadow.camera.near = 0.5;       // default
light4.shadow.camera.far = 500      // default
light4.position.set(lightDimension,-lightDimension,-lightDimension)


const light5 = new THREE.SpotLight( 0xffffff, 0.5 );
light5.castShadow = true;            // default false
scene.add( light5 );

//Set up shadow properties for the light
light5.shadow.mapSize.width = 512;  // default
light5.shadow.mapSize.height = 512; // default
light5.shadow.camera.near = 0.5;       // default
light5.shadow.camera.far = 500      // default
light5.position.set(-lightDimension,-lightDimension,lightDimension)


//Create a helper for the shadow camera (optional)
// const helper1 = new THREE.CameraHelper( light1.shadow.camera );
// const helper2 = new THREE.CameraHelper( light2.shadow.camera );
// const helper3 = new THREE.CameraHelper( light3.shadow.camera );
// const helper4 = new THREE.CameraHelper( light4.shadow.camera );
// scene.add( helper1 );
// scene.add( helper2 );
// scene.add( helper3 );
// scene.add( helper4 );


//  Click event handler

let dragStart;
let dragEnd;

function onMouseDown( event ) {
// calculate mouse position in normalized device coordinates
// (-1 to +1) for both components

mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

raycaster.setFromCamera(mouse, camera);
const intersects = raycaster.intersectObjects(scene.children, true);
if(intersects.length){
    controls.enableRotate = false;
    dragStart = {x:event.clientX, y:event.clientY}
    }
else 
    controls.enableRotate = true;
   
    if(intersects.length){
    const block = intersects.reduce((a,e)=>e.distance<a.distance?e:a,{distance:Infinity});
    // scene.remove(block.object.parent)
    console.log(block);
    }
}

function onMouseUp (event){
    // dragEnd = {x:event.clientX, y:event.clientY};
    // controls.enableRotate = true;
    // const dx = dragStart.x-dragEnd.x;
    // const dy = dragStart.y-dragEnd.y
    // console.log('delta x/y', dx, dy);
    // let dir;
    // if(Math.abs(dx)>Math.abs(dy)){
    //     if(dx<0) dir='R';
    //     else dir='L';
    // } else {
    //     if(dy<0) dir='D';
    //     else dir='U';
    // }
    // console.log('dir:', dir)
}

function mouseMove(e){
    // var vector = new THREE.Vector3();

    // vector.set(
    //     ( event.clientX / window.innerWidth ) * 2 - 1,
    //     - ( event.clientY / window.innerHeight ) * 2 + 1,
    //     0.5 );
    
    // vector.unproject( camera );
    
    // var dir = vector.sub( camera.position ).normalize();
    
    // var distance = - camera.position.z / dir.z;
    
    // var pos = camera.position.clone().add( dir.multiplyScalar( distance ) );
    // // console.log('pos', pos)

    // console.log('pos', event.clientX, event.clientX)

}






const animate = function () {
requestAnimationFrame( animate );

controls.update(); 
renderer.render(scene, camera);
};

animate();
