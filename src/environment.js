// const isMobile = (()=> {
//     var check = false;
//     (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
//     return check;
// })();

var checker = {
    Android: ()=> {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: ()=> {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: ()=> {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: ()=> {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: ()=> {
        return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
    },
    any: ()=> {
        return (checker.Android() || checker.BlackBerry() || checker.iOS() || checker.Opera() || checker.Windows());
    }
};
const isMobile = checker.any();

document.addEventListener('DOMContentLoaded', ()=>{
    if(isMobile){
        document.getElementById('btn').style.margin='10px 3%';
        document.getElementById('btn').style.width='94%';
        document.getElementById('btn').style.height='10vh';
        document.getElementById('btn').style.opacity='0.4';
        document.getElementById('btn').style.fontSize='50px';
    }
    }, false);



function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
} 
window.addEventListener('resize', onResize, false);
if(!isMobile){
window.addEventListener( 'mousedown', onMouseDown );
window.addEventListener( 'mouseup', onMouseUp, false );
window.addEventListener( 'mousemove', mouseMove, false );
} else{
window.addEventListener('touchstart',touchStart);
window.addEventListener('touchmove',touchMove);
window.addEventListener('touchend',touchEnd);
}
const scene = new THREE.Scene();
scene.background = new THREE.Color( 0x222222 );
const camera = new THREE.PerspectiveCamera( 40, window.innerWidth/window.innerHeight, 0.1, 400 );
camera.position.z = 150;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize( window.innerWidth, window.innerHeight );

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

document.body.appendChild( renderer.domElement );

// controls
// controls = new THREE.OrbitControls( camera, renderer.domElement );
// //controls.addEventListener( 'change', render ); // call this only in static scenes (i.e., if there is no animation loop)
// controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
// controls.dampingFactor = 0.15;
// controls.screenSpacePanning = false;
// controls.minDistance = 70;
// controls.maxDistance = 500;
// controls.maxPolarAngle = Infinity;
// controls.rotateSpeed = 0.3;


const controls = new THREE.TrackballControls(camera, renderer.domElement);
if(isMobile)
controls.rotateSpeed = 1;
else 
controls.rotateSpeed = 4.0;

controls.zoomSpeed = 1.2;
// controls.panSpeed = 0.8;
controls.minDistance = 100;
controls.maxDistance = 400;
controls.noZoom = false;
controls.noPan = false;

// controls.staticMoving = false;
// if(!isMobile)
// controls.dynamicDampingFactor = 0.15;

controls.keys = [ 65, 83, 68 ];
controls.mouseButtons={LEFT:0,RIGHT:2};
controls.noPan=true;

camera.position.set( 70,70,70);

if(isMobile)
controls.enabled = false;

// Shadows
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
//Create a SpotLight and turn on shadows for the light
const lightDimension=500;
const light = new THREE.AmbientLight( 0xdddddd,0.5 ); // soft white light
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


//  Click event handler

let dragStart;
let dragEnd;
let currentPlane;
let currentSign;
let currentCoordinates;

function onMouseDown( event ) {
mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

raycaster.setFromCamera(mouse, camera);
const intersects = raycaster.intersectObjects(scene.children, true);

if(cube.editMode && intersects.length){
    const intersect = intersects[0];
    const {r,g,b} = intersect.object.material.color;
    if(r<0.1 && g<0.1 && b<0.1 ){ // Meas black borders , not actual faces to be colored.
        return;
    }
    intersect.object.material.color = new THREE.Color(cube.activeEditColor);
    return;
}

if(intersects.length){
    controls.enabled = false;
    dragStart = intersects[0].point;
    }
else {
    dragStart=undefined;
}
   
    if(intersects.length){
    const block = intersects[0];
    const {x,y,z} = block.point;
    const max = Math.max(Math.abs(x),Math.abs(y),Math.abs(z));
    const plane = [Math.abs(x),Math.abs(y),Math.abs(z)].map(e=>e<max).reduce((a,e,i)=>e?a+i:a,'').split('').map(e=>'xyz'[e]).join('')
    let dir = 'xyz';
    plane.split('').forEach(e=>dir=dir.split(e).join(''));
    const sign = block.point[dir]<0?-1:1;
    const coord = cube.get3DCoordinatesOfPiece(block.object.parent);

    currentPlane= plane;
    currentSign= sign;
    currentCoordinates= coord;
    }
}


function touchStart( event ) {
    mouse.x = ( event.changedTouches[0].clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.changedTouches[0].clientY / window.innerHeight ) * 2 + 1;
    
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children, true);
    
    if(intersects.length){
        controls.enabled = false;
        dragStart = intersects[0].point;
        }
    else {
        dragStart=undefined;
    }
       
        if(intersects.length){
        controls.enabled = false;   
        const block = intersects[0];
        const {x,y,z} = block.point;
        const max = Math.max(Math.abs(x),Math.abs(y),Math.abs(z));
        const plane = [Math.abs(x),Math.abs(y),Math.abs(z)].map(e=>e<max).reduce((a,e,i)=>e?a+i:a,'').split('').map(e=>'xyz'[e]).join('')
        let dir = 'xyz';
        plane.split('').forEach(e=>dir=dir.split(e).join(''));
        const sign = block.point[dir]<0?-1:1;
        const coord = cube.get3DCoordinatesOfPiece(block.object.parent);
    
        currentPlane= plane;
        currentSign= sign;
        currentCoordinates= coord;
        } else{
            controls.enabled = true;   
        }
    }


function onMouseUp (event){
    if(dragStart && dragEnd){
    const dx = dragEnd.x - dragStart.x;
    const dy = dragEnd.y - dragStart.y;
    const dz = dragEnd.z - dragStart.z;
    let dir;

    let rotationAxis;
    let rotationIndex;
    let rotationDirection;

    switch(currentPlane){
        case 'xy':

                if(Math.abs(dx)>Math.abs(dy)){
                    if(dx<0) dir='L';
                    else dir='R';
                } else {
                    if(dy<0) dir='D';
                    else dir='U';
                }

                if( dir === 'R' || dir === 'L'){
                    rotationAxis='y';
                    rotationIndex = currentCoordinates.y;
                    rotationDirection = dir === 'L' ? 'anti':'clockwise'
                } else{
                    rotationAxis='x';
                    rotationIndex = currentCoordinates.x;
                    rotationDirection = dir === 'U' ? 'anti':'clockwise'
                }
        break;
        case 'yz':
                if(Math.abs(dy)>Math.abs(dz)){
                    if(dy<0) dir='D';
                    else dir='U';
                } else {
                    if(dz<0) dir='L';
                    else dir='R';
                }

                if( dir === 'R' || dir === 'L'){
                    rotationAxis='y';
                    rotationIndex = currentCoordinates.y;
                    rotationDirection = dir === 'R' ? 'anti':'clockwise'
                } else{
                    rotationAxis='z';
                    rotationIndex = currentCoordinates.z;
                    rotationDirection = dir === 'D' ? 'anti':'clockwise'
                }
        break;
        case 'xz':

                if(Math.abs(dx)>Math.abs(dz)){
                    if(dx<0) dir='L';
                    else dir='R';
                } else {
                    if(dz<0) dir='U';
                    else dir='D';
                }

                if( dir === 'R' || dir === 'L'){
                    rotationAxis='z';
                    rotationIndex = currentCoordinates.z;
                    rotationDirection = dir === 'R' ? 'anti':'clockwise'
                } else{
                    rotationAxis='x';
                    rotationIndex = currentCoordinates.x;
                    rotationDirection = dir === 'U' ? 'anti':'clockwise'
                }
        break;
    }
    if(currentSign===-1){
        rotationDirection = rotationDirection=='clockwise'?'anti':'clockwise';
    }
    if(!cube.shuffling){
    cube.rotateSclice(rotationAxis,rotationIndex,rotationDirection);
     setTimeout(()=>{
         if(cube.checkGameStatus())
            cube.showCongrats();
     },500)
   
    }

    }
    dragStart = undefined;
    dragEnd = undefined;
}


function touchEnd (event){
    if(dragStart && dragEnd){
    const dx = dragEnd.x - dragStart.x;
    const dy = dragEnd.y - dragStart.y;
    const dz = dragEnd.z - dragStart.z;
    let dir;

    let rotationAxis;
    let rotationIndex;
    let rotationDirection;

    switch(currentPlane){
        case 'xy':

                if(Math.abs(dx)>Math.abs(dy)){
                    if(dx<0) dir='L';
                    else dir='R';
                } else {
                    if(dy<0) dir='D';
                    else dir='U';
                }

                if( dir === 'R' || dir === 'L'){
                    rotationAxis='y';
                    rotationIndex = currentCoordinates.y;
                    rotationDirection = dir === 'L' ? 'anti':'clockwise'
                } else{
                    rotationAxis='x';
                    rotationIndex = currentCoordinates.x;
                    rotationDirection = dir === 'U' ? 'anti':'clockwise'
                }
        break;
        case 'yz':
                if(Math.abs(dy)>Math.abs(dz)){
                    if(dy<0) dir='D';
                    else dir='U';
                } else {
                    if(dz<0) dir='L';
                    else dir='R';
                }

                if( dir === 'R' || dir === 'L'){
                    rotationAxis='y';
                    rotationIndex = currentCoordinates.y;
                    rotationDirection = dir === 'R' ? 'anti':'clockwise'
                } else{
                    rotationAxis='z';
                    rotationIndex = currentCoordinates.z;
                    rotationDirection = dir === 'D' ? 'anti':'clockwise'
                }
        break;
        case 'xz':

                if(Math.abs(dx)>Math.abs(dz)){
                    if(dx<0) dir='L';
                    else dir='R';
                } else {
                    if(dz<0) dir='U';
                    else dir='D';
                }

                if( dir === 'R' || dir === 'L'){
                    rotationAxis='z';
                    rotationIndex = currentCoordinates.z;
                    rotationDirection = dir === 'R' ? 'anti':'clockwise'
                } else{
                    rotationAxis='x';
                    rotationIndex = currentCoordinates.x;
                    rotationDirection = dir === 'U' ? 'anti':'clockwise'
                }
        break;
    }
    if(currentSign===-1){
        rotationDirection = rotationDirection=='clockwise'?'anti':'clockwise';
    }
    if(!cube.shuffling){
    cube.rotateSclice(rotationAxis,rotationIndex,rotationDirection);
     setTimeout(()=>{
         if(cube.checkGameStatus())
         cube.showCongrats();
     },500)
   
    }

    }
    dragStart = undefined;
    dragEnd = undefined;
}


let mouseEventQuata=0;
let mouseEventLimit = mouseEventQuata;

function mouseMove(event){
    if(mouseEventLimit<0 || dragStart){
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children, true);
    if(intersects.length==0){
        if(!isMobile)
        controls.enabled = true;   
    } else {
        dragEnd=intersects[0].point
        controls.enabled = false;
    }
    mouseEventLimit=mouseEventQuata;
    }   
    mouseEventLimit--;
}

function touchMove(event){
    if(mouseEventLimit<0 || dragStart){
    mouse.x = ( event.changedTouches[0].clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.changedTouches[0].clientY / window.innerHeight ) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children, true);
    if(intersects.length){
        dragEnd=intersects[0].point
        controls.enabled = false;
    }
    mouseEventLimit=mouseEventQuata;
    }   
    mouseEventLimit--;
}

const animate = function () {
requestAnimationFrame( animate );
controls.update(); 
renderer.render(scene, camera);
};

animate();

