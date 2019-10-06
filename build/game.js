"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var degree = function degree(rad) {
  return rad * Math.PI / 180;
};

var Cube = function Cube(order) {
  var _this = this;

  _classCallCheck(this, Cube);

  this.colors = [0xff0000, 0x00ff00, 0x0000ff, 0xffff00, 0xff8c00, 0xffffff];

  this.createPieces = function () {
    for (var i = 0; i < _this.order; i++) {
      for (var j = 0; j < _this.order; j++) {
        for (var k = 0; k < _this.order; k++) {
          var gap = 1.05;
          var skinProjection = 0.17;
          var geometryBox = new THREE.BoxGeometry(_this.pieceSize, _this.pieceSize, _this.pieceSize);
          var geometryFace = new THREE.PlaneGeometry(_this.pieceSize * 0.85, _this.pieceSize * 0.85);
          var materialR = new THREE.MeshStandardMaterial({
            color: _this.colors[0],
            side: THREE.DoubleSide,
            roughness: 0.8
          });
          var materialG = new THREE.MeshStandardMaterial({
            color: _this.colors[1],
            side: THREE.DoubleSide,
            roughness: 0.8
          });
          var materialB = new THREE.MeshStandardMaterial({
            color: _this.colors[2],
            side: THREE.DoubleSide,
            roughness: 0.8
          });
          var materialY = new THREE.MeshStandardMaterial({
            color: _this.colors[3],
            side: THREE.DoubleSide,
            roughness: 0.8
          });
          var materialO = new THREE.MeshStandardMaterial({
            color: _this.colors[4],
            side: THREE.DoubleSide,
            roughness: 0.8
          });
          var materialW = new THREE.MeshStandardMaterial({
            color: _this.colors[5],
            side: THREE.DoubleSide,
            roughness: 0.8
          });
          var materialBox = new THREE.MeshStandardMaterial({
            color: 0x111111,
            side: THREE.DoubleSide,
            roughness: 0.8
          }); // var modifier = new THREE.SubdivisionModifier( 3 );
          // modifier.modify( geometryFace );

          var faceL = new THREE.Mesh(geometryFace, materialO);
          var faceR = new THREE.Mesh(geometryFace, materialR);
          var faceF = new THREE.Mesh(geometryFace, materialG);
          var faceB = new THREE.Mesh(geometryFace, materialB);
          var faceD = new THREE.Mesh(geometryFace, materialY);
          var faceU = new THREE.Mesh(geometryFace, materialW);
          var box = new THREE.Mesh(geometryBox, materialBox);
          faceU.rotation.set(degree(90), 0, 0);
          faceD.rotation.set(degree(90), 0, 0);
          faceF.rotation.set(0, 0, degree(90));
          faceB.rotation.set(0, 0, degree(90));
          faceL.rotation.set(0, degree(90), 0);
          faceR.rotation.set(0, degree(90), 0);
          var _this$blocks$i$j$k = _this.blocks[i][j][k],
              x = _this$blocks$i$j$k.x,
              y = _this$blocks$i$j$k.y,
              z = _this$blocks$i$j$k.z;
          faceU.position.set(x * gap, y * gap + (_this.pieceSize / 2 + skinProjection), z * gap);
          faceD.position.set(x * gap, y * gap - (_this.pieceSize / 2 + skinProjection), z * gap);
          faceB.position.set(x * gap, y * gap, z * gap - (_this.pieceSize / 2 + skinProjection));
          faceF.position.set(x * gap, y * gap, z * gap + (_this.pieceSize / 2 + skinProjection));
          faceL.position.set(x * gap - (_this.pieceSize / 2 + skinProjection), y * gap, z * gap);
          faceR.position.set(x * gap + (_this.pieceSize / 2 + skinProjection), y * gap, z * gap);
          box.position.set(x * gap, y * gap, z * gap); // face.castShadow = true; //default is false
          // face.receiveShadow = true; //default

          var pieceGroup = new THREE.Object3D();

          if (i == 0 || j == 0 || k == 0 || i == _this.order - 1 || j == _this.order - 1 || k == _this.order - 1) {
            if (i == _this.order - 1) pieceGroup.add(faceR);
            if (i == 0) pieceGroup.add(faceL);
            if (j == _this.order - 1) pieceGroup.add(faceU);
            if (j == 0) pieceGroup.add(faceD);
            if (k == _this.order - 1) pieceGroup.add(faceF);
            if (k == 0) pieceGroup.add(faceB);
            pieceGroup.add(box);
            pieceGroup.name = '' + i + j + k;
            scene.add(pieceGroup);
          }

          _this.blocks[i][j][k].piece = pieceGroup;
        }
      }
    }
  };

  this.get3DCoordinatesOfPiece = function (piece) {
    for (var i = 0; i < _this.order; i++) {
      for (var j = 0; j < _this.order; j++) {
        for (var k = 0; k < _this.order; k++) {
          if (_this.blocks[i][j][k].piece.name == piece.name) return {
            x: i,
            y: j,
            z: k
          };
        }
      }
    }
  };

  this.rotationMatrixHelper = function (i, j) {
    var direction = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'clockwise';
    var translationOffset = (_this.order - 1) / 2; // Pivot point rotation
    // Translate to -offset
    // x' = -y and y' = x;
    // Translate back to +offset

    var translatedI = i - translationOffset;
    var translatedJ = j - translationOffset;
    var rotatedI = translatedJ * (direction === 'clockwise' ? -1 : 1);
    var rotatedJ = translatedI * (direction === 'clockwise' ? 1 : -1);
    var x = rotatedI + translationOffset;
    var y = rotatedJ + translationOffset;
    return {
      x: x,
      y: y
    };
  };

  this.shuffle = function () {
    var turns = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;
    _this.alreadyWon = false;
    _this.shuffling = true;
    var timer = setInterval(function () {
      var rand1 = Math.floor(Math.random() * 10) % _this.order;

      var rand2 = Math.floor(Math.random() * 10) % _this.order;

      cube.rotateSclice('xyz'[rand1], rand2, 'clockwise' + rand1 == 2 ? '1' : '');
      turns--;

      if (turns == 0) {
        clearInterval(timer);
        _this.shuffling = false;
      }
    }, 600);
  };

  this.mergeSlice = function (_ref) {
    var _ref$initial = _ref.initial,
        initial = _ref$initial === void 0 ? false : _ref$initial,
        data = _ref.data;

    if (initial) {
      _this.mergeObj = _toConsumableArray(data);
    } else {
      var newObj = [];
      data.forEach(function (slice, i) {
        if (slice.length == 0) slice = ["1", "1", "1"];
        newObj.push(slice.map(function (e, j) {
          return _this.mergeObj[i][j] == e ? e : "0";
        }));
      });
      _this.mergeObj = newObj;
    }
  };

  this.checkGameStatus = function () {
    // if(this.alreadyWon) return false;
    for (var i = 0; i < _this.order; i++) {
      for (var j = 0; j < _this.order; j++) {
        var data = [];

        for (var k = 0; k < _this.order; k++) {
          console.log(_this.blocks[i][j][k].piece.name);
          data.push(_this.blocks[i][j][k].piece.name.split(''));
        }

        console.log("Row");

        if (i === 0 && j === 0) {
          _this.mergeSlice({
            initial: true,
            data: data
          });
        } else {
          _this.mergeSlice({
            data: data
          });
        }
      }

      console.log("slice");
    }

    _this.alreadyWon = 3 == _this.mergeObj.reduce(function (_final, slice) {
      return _final + slice.reduce(function (total, e) {
        return Number(e) + total;
      }, 0);
    }, 0);
    return _this.alreadyWon;
  };

  this.printSclice = function (axis, index) {
    switch (axis) {
      case 'x':
        for (var i = 0; i < _this.order; i++) {
          var row = '';

          for (var j = 0; j < _this.order; j++) {
            row += _this.blocks[index][i][j].piece.name + ', ';
          }

          console.log(row);
        }

        break;

      case 'y':
        for (var _i = 0; _i < _this.order; _i++) {
          var _row = '';

          for (var _j = 0; _j < _this.order; _j++) {
            _row += _this.blocks[_i][index][_j].piece.name + ', ';
          }

          console.log(_row);
        }

        break;

      case 'z':
        for (var _i2 = 0; _i2 < _this.order; _i2++) {
          var _row2 = '';

          for (var _j2 = 0; _j2 < _this.order; _j2++) {
            _row2 += _this.blocks[_i2][_j2][index].piece.name + ', ';
          }

          console.log(_row2);
        }

        break;
    }
  };

  this.rotateSclice = function (axis, index, direction) {
    var del = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

    if (_this.rotating) {
      console.log("Already in one rotation...!");
      return;
    }

    if (index >= _this.order) throw new Error('Rotation not possible on this index : ' + index + ' because maximum size is : ' + (_this.order - 1));
    if ('xyz'.indexOf(axis) == -1) throw new Error('Rotation on invalid axis: ' + axis);
    var dirAngle;
    var rotationAngleInterval = 15;
    var tempSclice = {};
    _this.rotating = true;

    switch (axis) {
      case 'x':
        dirAngle = direction === 'clockwise' ? 1 : -1;

        var _loop = function _loop(i) {
          var _loop2 = function _loop2(j) {
            if (del) scene.remove(_this.blocks[index][i][j].piece); // Backing up

            if (!tempSclice['' + i + j]) tempSclice['' + i + j] = _this.blocks[index][i][j].piece;

            var _this$rotationMatrixH = _this.rotationMatrixHelper(i, j, direction == 'clockwise' ? '' : 'clockwise'),
                x = _this$rotationMatrixH.x,
                y = _this$rotationMatrixH.y;

            _this.blocks[index][i][j].piece = tempSclice['' + x + y] || _this.blocks[index][x][y].piece;
            var totalAngle = rotationAngleInterval; // let timer = setInterval(()=>{
            //     if(totalAngle==90) {
            //         this.rotating= false;
            //         clearInterval(timer);
            //     }
            //     const rotation = new THREE.Matrix4().makeRotationX(degree(rotationAngleInterval * dirAngle));
            //     this.blocks[index][i][j].piece.applyMatrix(rotation);
            //     totalAngle+=rotationAngleInterval;
            // },10)

            var doRotationAnimation = function doRotationAnimation() {
              if (totalAngle == 90) {
                _this.rotating = false;
              } else requestAnimationFrame(doRotationAnimation);

              var rotation = new THREE.Matrix4().makeRotationX(degree(rotationAngleInterval * dirAngle));

              _this.blocks[index][i][j].piece.applyMatrix(rotation);

              totalAngle += rotationAngleInterval;
            };

            doRotationAnimation();
          };

          for (var j = 0; j < _this.order; j++) {
            _loop2(j);
          }
        };

        for (var i = 0; i < _this.order; i++) {
          _loop(i);
        }

        break;

      case 'y':
        dirAngle = direction === 'clockwise' ? 1 : -1;

        var _loop3 = function _loop3(i) {
          var _loop4 = function _loop4(j) {
            if (del) scene.remove(_this.blocks[i][index][j].piece); // Backing up

            if (!tempSclice['' + i + j]) tempSclice['' + i + j] = _this.blocks[i][index][j].piece;

            var _this$rotationMatrixH2 = _this.rotationMatrixHelper(i, j, direction),
                x = _this$rotationMatrixH2.x,
                y = _this$rotationMatrixH2.y;

            _this.blocks[i][index][j].piece = tempSclice['' + x + y] || _this.blocks[x][index][y].piece;
            var totalAngle = rotationAngleInterval; // let timer = setInterval(()=>{
            //     if(totalAngle==90) {
            //         this.rotating= false;
            //         clearInterval(timer);
            //     }
            //     const rotation = new THREE.Matrix4().makeRotationY(degree(rotationAngleInterval * dirAngle));
            // this.blocks[i][index][j].piece.applyMatrix(rotation);
            //     totalAngle+=rotationAngleInterval;
            // },10)

            var doRotationAnimation = function doRotationAnimation() {
              if (totalAngle == 90) {
                _this.rotating = false;
              } else requestAnimationFrame(doRotationAnimation);

              var rotation = new THREE.Matrix4().makeRotationY(degree(rotationAngleInterval * dirAngle));

              _this.blocks[i][index][j].piece.applyMatrix(rotation);

              totalAngle += rotationAngleInterval;
            };

            doRotationAnimation();
          };

          for (var j = 0; j < _this.order; j++) {
            _loop4(j);
          }
        };

        for (var i = 0; i < _this.order; i++) {
          _loop3(i);
        }

        break;

      case 'z':
        dirAngle = direction === 'clockwise' ? 1 : -1;

        var _loop5 = function _loop5(i) {
          var _loop6 = function _loop6(j) {
            // scene.remove(this.blocks[i][j][index].piece);
            if (del) scene.remove(_this.blocks[i][j][index].piece); // Backing up

            if (!tempSclice['' + i + j]) tempSclice['' + i + j] = _this.blocks[i][j][index].piece;

            var _this$rotationMatrixH3 = _this.rotationMatrixHelper(i, j, direction == 'clockwise' ? '' : 'clockwise'),
                x = _this$rotationMatrixH3.x,
                y = _this$rotationMatrixH3.y;

            _this.blocks[i][j][index].piece = tempSclice['' + x + y] || _this.blocks[x][y][index].piece;
            var totalAngle = rotationAngleInterval; // let timer = setInterval(()=>{
            //     if(totalAngle==90) {
            //         this.rotating= false;
            //         clearInterval(timer);
            //     }
            //     const rotation = new THREE.Matrix4().makeRotationZ(degree(rotationAngleInterval*dirAngle));
            // this.blocks[i][j][index].piece.applyMatrix(rotation);
            //     totalAngle+=rotationAngleInterval;
            // },10)

            var doRotationAnimation = function doRotationAnimation() {
              if (totalAngle == 90) {
                _this.rotating = false;
              } else requestAnimationFrame(doRotationAnimation);

              var rotation = new THREE.Matrix4().makeRotationZ(degree(rotationAngleInterval * dirAngle));

              _this.blocks[i][j][index].piece.applyMatrix(rotation);

              totalAngle += rotationAngleInterval;
            };

            doRotationAnimation();
          };

          for (var j = 0; j < _this.order; j++) {
            _loop6(j);
          }
        };

        for (var i = 0; i < _this.order; i++) {
          _loop5(i);
        }

        break;
    }
  };

  if (order > 10) throw new Error("Maximum cube size exceeded!");
  this.axisX = new THREE.Vector3(1, 0, 0);
  this.axisY = new THREE.Vector3(0, 1, 0);
  this.axisZ = new THREE.Vector3(0, 0, 1);
  this.alreadyWon = false;
  this.shuffling = false;
  this.rotating = false;
  this.order = order;
  this.pieceSize = 10;
  this.blocks = [];
  this.mergeObj = [];
  this.offset = (order - 1) * this.pieceSize / 2;

  for (var i = 0; i < order; i++) {
    var sclice = [];

    for (var j = 0; j < order; j++) {
      var row = [];

      for (var k = 0; k < order; k++) {
        var piece = {
          x: i * this.pieceSize - this.offset,
          y: j * this.pieceSize - this.offset,
          z: k * this.pieceSize - this.offset
        };
        row.push(_objectSpread({}, piece));
      }

      sclice.push(_objectSpread({}, row));
    }

    this.blocks.push(_objectSpread({}, sclice));
  }

  this.createPieces();
  camera.position.z = order * 25;
};

var query = location.search.replace('?', '').replace(/&&/g, '&').split('&').reduce(function (a, e) {
  var data = e.split('=');
  return _objectSpread({}, a, _defineProperty({}, data[0], data[1]));
}, {}); // 3=70, 4=100

controls.minDistance = 80 + (query.order - 3) * 30;
controls.maxDistance = 300 + (query.order - 3) * 30;
var cube = new Cube(query.order || 3);

function shuffle() {
  cube.shuffle(query.shuffle);
}