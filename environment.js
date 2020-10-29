"use strict";

var checker = {
  Android: function Android() {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function BlackBerry() {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function iOS() {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function Opera() {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function Windows() {
    return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
  },
  any: function any() {
    return checker.Android() || checker.BlackBerry() || checker.iOS() || checker.Opera() || checker.Windows();
  }
};
var isMobile = checker.any();
document.addEventListener('DOMContentLoaded', function () {
  if (isMobile) {
    document.getElementById('btn').style.margin = '10px 3%';
    document.getElementById('btn').style.width = '94%';
    document.getElementById('btn').style.height = '10vh';
    document.getElementById('btn').style.opacity = '0.4';
    document.getElementById('btn').style.fontSize = '50px';
  }
}, false);

function onResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onResize, false);

if (!isMobile) {
  window.addEventListener('mousedown', onMouseDown);
  window.addEventListener('mouseup', onMouseUp, false);
  window.addEventListener('mousemove', mouseMove, false);
} else {
  window.addEventListener('touchstart', touchStart);
  window.addEventListener('touchmove', touchMove);
  window.addEventListener('touchend', touchEnd);
}

var scene = new THREE.Scene();
scene.background = new THREE.Color(0x222222);
var camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 400);
camera.position.z = 150;
var renderer = new THREE.WebGLRenderer({
  antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
document.body.appendChild(renderer.domElement);
var controls = new THREE.TrackballControls(camera, renderer.domElement);
if (isMobile) controls.rotateSpeed = 1;else controls.rotateSpeed = 4.0;
controls.zoomSpeed = 1.2;
controls.minDistance = 100;
controls.maxDistance = 400;
controls.noZoom = false;
controls.noPan = false;
controls.keys = [65, 83, 68];
controls.mouseButtons = {
  LEFT: 0,
  RIGHT: 2
};
controls.noPan = true;
camera.position.set(70, 70, 70);
if (isMobile) controls.enabled = false;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
var lightDimension = 500;
var light = new THREE.AmbientLight(0xdddddd, 0.5);
scene.add(light);
var light1 = new THREE.SpotLight(0xffffff, 0.5);
light1.castShadow = true;
scene.add(light1);
light1.shadow.mapSize.width = 512;
light1.shadow.mapSize.height = 512;
light1.shadow.camera.near = 0.5;
light1.shadow.camera.far = 500;
light1.position.set(lightDimension, lightDimension, lightDimension);
var light2 = new THREE.SpotLight(0xffffff, 0.5);
light2.castShadow = true;
scene.add(light2);
light2.shadow.mapSize.width = 512;
light2.shadow.mapSize.height = 512;
light2.shadow.camera.near = 0.5;
light2.shadow.camera.far = 500;
light2.position.set(lightDimension, lightDimension, -lightDimension);
var light3 = new THREE.SpotLight(0xffffff, 0.5);
light3.castShadow = true;
scene.add(light3);
light3.shadow.mapSize.width = 512;
light3.shadow.mapSize.height = 512;
light3.shadow.camera.near = 0.5;
light3.shadow.camera.far = 500;
light3.position.set(lightDimension, -lightDimension, lightDimension);
var light4 = new THREE.SpotLight(0xffffff, 0.5);
light4.castShadow = true;
scene.add(light4);
light4.shadow.mapSize.width = 512;
light4.shadow.mapSize.height = 512;
light4.shadow.camera.near = 0.5;
light4.shadow.camera.far = 500;
light4.position.set(lightDimension, -lightDimension, -lightDimension);
var light5 = new THREE.SpotLight(0xffffff, 0.5);
light5.castShadow = true;
scene.add(light5);
light5.shadow.mapSize.width = 512;
light5.shadow.mapSize.height = 512;
light5.shadow.camera.near = 0.5;
light5.shadow.camera.far = 500;
light5.position.set(-lightDimension, -lightDimension, lightDimension);
var dragStart;
var dragEnd;
var currentPlane;
var currentSign;
var currentCoordinates;

function onMouseDown(event) {
  mouse.x = event.clientX / window.innerWidth * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);
  var intersects = raycaster.intersectObjects(scene.children, true);

  if (cube.editMode && intersects.length) {
    var intersect = intersects[0];
    var _intersect$object$mat = intersect.object.material.color,
        r = _intersect$object$mat.r,
        g = _intersect$object$mat.g,
        b = _intersect$object$mat.b;

    if (r < 0.1 && g < 0.1 && b < 0.1) {
      return;
    }

    intersect.object.material.color = new THREE.Color(cube.activeEditColor);
    return;
  }

  if (intersects.length) {
    controls.enabled = false;
    dragStart = intersects[0].point;
  } else {
    dragStart = undefined;
  }

  if (intersects.length) {
    var block = intersects[0];
    var _block$point = block.point,
        x = _block$point.x,
        y = _block$point.y,
        z = _block$point.z;
    var max = Math.max(Math.abs(x), Math.abs(y), Math.abs(z));
    var plane = [Math.abs(x), Math.abs(y), Math.abs(z)].map(function (e) {
      return e < max;
    }).reduce(function (a, e, i) {
      return e ? a + i : a;
    }, '').split('').map(function (e) {
      return 'xyz'[e];
    }).join('');
    var dir = 'xyz';
    plane.split('').forEach(function (e) {
      return dir = dir.split(e).join('');
    });
    var sign = block.point[dir] < 0 ? -1 : 1;
    var coord = cube.get3DCoordinatesOfPiece(block.object.parent);
    currentPlane = plane;
    currentSign = sign;
    currentCoordinates = coord;
  }
}

function touchStart(event) {
  mouse.x = event.changedTouches[0].clientX / window.innerWidth * 2 - 1;
  mouse.y = -(event.changedTouches[0].clientY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);
  var intersects = raycaster.intersectObjects(scene.children, true);

  if (intersects.length) {
    controls.enabled = false;
    dragStart = intersects[0].point;
  } else {
    dragStart = undefined;
  }

  if (intersects.length) {
    controls.enabled = false;
    var block = intersects[0];
    var _block$point2 = block.point,
        x = _block$point2.x,
        y = _block$point2.y,
        z = _block$point2.z;
    var max = Math.max(Math.abs(x), Math.abs(y), Math.abs(z));
    var plane = [Math.abs(x), Math.abs(y), Math.abs(z)].map(function (e) {
      return e < max;
    }).reduce(function (a, e, i) {
      return e ? a + i : a;
    }, '').split('').map(function (e) {
      return 'xyz'[e];
    }).join('');
    var dir = 'xyz';
    plane.split('').forEach(function (e) {
      return dir = dir.split(e).join('');
    });
    var sign = block.point[dir] < 0 ? -1 : 1;
    var coord = cube.get3DCoordinatesOfPiece(block.object.parent);
    currentPlane = plane;
    currentSign = sign;
    currentCoordinates = coord;
  } else {
    controls.enabled = true;
  }
}

function onMouseUp(event) {
  if (dragStart && dragEnd) {
    var dx = dragEnd.x - dragStart.x;
    var dy = dragEnd.y - dragStart.y;
    var dz = dragEnd.z - dragStart.z;
    var dir;
    var rotationAxis;
    var rotationIndex;
    var rotationDirection;

    switch (currentPlane) {
      case 'xy':
        if (Math.abs(dx) > Math.abs(dy)) {
          if (dx < 0) dir = 'L';else dir = 'R';
        } else {
          if (dy < 0) dir = 'D';else dir = 'U';
        }

        if (dir === 'R' || dir === 'L') {
          rotationAxis = 'y';
          rotationIndex = currentCoordinates.y;
          rotationDirection = dir === 'L' ? 'anti' : 'clockwise';
        } else {
          rotationAxis = 'x';
          rotationIndex = currentCoordinates.x;
          rotationDirection = dir === 'U' ? 'anti' : 'clockwise';
        }

        break;

      case 'yz':
        if (Math.abs(dy) > Math.abs(dz)) {
          if (dy < 0) dir = 'D';else dir = 'U';
        } else {
          if (dz < 0) dir = 'L';else dir = 'R';
        }

        if (dir === 'R' || dir === 'L') {
          rotationAxis = 'y';
          rotationIndex = currentCoordinates.y;
          rotationDirection = dir === 'R' ? 'anti' : 'clockwise';
        } else {
          rotationAxis = 'z';
          rotationIndex = currentCoordinates.z;
          rotationDirection = dir === 'D' ? 'anti' : 'clockwise';
        }

        break;

      case 'xz':
        if (Math.abs(dx) > Math.abs(dz)) {
          if (dx < 0) dir = 'L';else dir = 'R';
        } else {
          if (dz < 0) dir = 'U';else dir = 'D';
        }

        if (dir === 'R' || dir === 'L') {
          rotationAxis = 'z';
          rotationIndex = currentCoordinates.z;
          rotationDirection = dir === 'R' ? 'anti' : 'clockwise';
        } else {
          rotationAxis = 'x';
          rotationIndex = currentCoordinates.x;
          rotationDirection = dir === 'U' ? 'anti' : 'clockwise';
        }

        break;
    }

    if (currentSign === -1) {
      rotationDirection = rotationDirection == 'clockwise' ? 'anti' : 'clockwise';
    }

    if (!cube.shuffling) {
      cube.rotateSclice(rotationAxis, rotationIndex, rotationDirection);
      setTimeout(function () {
        if (cube.checkGameStatus()) cube.showCongrats();
      }, 500);
    }
  }

  dragStart = undefined;
  dragEnd = undefined;
}

function touchEnd(event) {
  if (dragStart && dragEnd) {
    var dx = dragEnd.x - dragStart.x;
    var dy = dragEnd.y - dragStart.y;
    var dz = dragEnd.z - dragStart.z;
    var dir;
    var rotationAxis;
    var rotationIndex;
    var rotationDirection;

    switch (currentPlane) {
      case 'xy':
        if (Math.abs(dx) > Math.abs(dy)) {
          if (dx < 0) dir = 'L';else dir = 'R';
        } else {
          if (dy < 0) dir = 'D';else dir = 'U';
        }

        if (dir === 'R' || dir === 'L') {
          rotationAxis = 'y';
          rotationIndex = currentCoordinates.y;
          rotationDirection = dir === 'L' ? 'anti' : 'clockwise';
        } else {
          rotationAxis = 'x';
          rotationIndex = currentCoordinates.x;
          rotationDirection = dir === 'U' ? 'anti' : 'clockwise';
        }

        break;

      case 'yz':
        if (Math.abs(dy) > Math.abs(dz)) {
          if (dy < 0) dir = 'D';else dir = 'U';
        } else {
          if (dz < 0) dir = 'L';else dir = 'R';
        }

        if (dir === 'R' || dir === 'L') {
          rotationAxis = 'y';
          rotationIndex = currentCoordinates.y;
          rotationDirection = dir === 'R' ? 'anti' : 'clockwise';
        } else {
          rotationAxis = 'z';
          rotationIndex = currentCoordinates.z;
          rotationDirection = dir === 'D' ? 'anti' : 'clockwise';
        }

        break;

      case 'xz':
        if (Math.abs(dx) > Math.abs(dz)) {
          if (dx < 0) dir = 'L';else dir = 'R';
        } else {
          if (dz < 0) dir = 'U';else dir = 'D';
        }

        if (dir === 'R' || dir === 'L') {
          rotationAxis = 'z';
          rotationIndex = currentCoordinates.z;
          rotationDirection = dir === 'R' ? 'anti' : 'clockwise';
        } else {
          rotationAxis = 'x';
          rotationIndex = currentCoordinates.x;
          rotationDirection = dir === 'U' ? 'anti' : 'clockwise';
        }

        break;
    }

    if (currentSign === -1) {
      rotationDirection = rotationDirection == 'clockwise' ? 'anti' : 'clockwise';
    }

    if (!cube.shuffling) {
      cube.rotateSclice(rotationAxis, rotationIndex, rotationDirection);
      setTimeout(function () {
        if (cube.checkGameStatus()) cube.showCongrats();
      }, 500);
    }
  }

  dragStart = undefined;
  dragEnd = undefined;
}

var mouseEventQuata = 0;
var mouseEventLimit = mouseEventQuata;

function mouseMove(event) {
  if (mouseEventLimit < 0 || dragStart) {
    mouse.x = event.clientX / window.innerWidth * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    var intersects = raycaster.intersectObjects(scene.children, true);

    if (intersects.length == 0) {
      if (!isMobile) controls.enabled = true;
    } else {
      dragEnd = intersects[0].point;
      controls.enabled = false;
    }

    mouseEventLimit = mouseEventQuata;
  }

  mouseEventLimit--;
}

function touchMove(event) {
  if (mouseEventLimit < 0 || dragStart) {
    mouse.x = event.changedTouches[0].clientX / window.innerWidth * 2 - 1;
    mouse.y = -(event.changedTouches[0].clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    var intersects = raycaster.intersectObjects(scene.children, true);

    if (intersects.length) {
      dragEnd = intersects[0].point;
      controls.enabled = false;
    }

    mouseEventLimit = mouseEventQuata;
  }

  mouseEventLimit--;
}

var animate = function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
};

animate();