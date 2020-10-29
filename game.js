"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

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
          });
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
          box.position.set(x * gap, y * gap, z * gap);
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
    var translationOffset = (_this.order - 1) / 2;
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

  this.showCongrats = function () {};

  this.mergeSlice = function (_ref) {
    var _ref$initial = _ref.initial,
        initial = _ref$initial === void 0 ? false : _ref$initial,
        data = _ref.data;

    if (initial) {
      _this.mergeObj = _toConsumableArray(data);
    } else if (_this.mergeObj) {
      var newObj = [];
      data.forEach(function (slice, i) {
        if (slice.length == 0) slice = ["1", "1", "1"];
        newObj.push(slice.map(function (e, j) {
          return _this.mergeObj[i][j] == e ? e : "0";
        }));
      });
      var expectedSum = data.reduce(function (a, e, i) {
        return a + i;
      }, '');
      var valid = false;

      var _loop = function _loop(i) {
        var sum = "";

        for (var j = 0; j < data.length; j++) {
          sum += newObj[j][i];
        }

        if (expectedSum.split('').every(function (e) {
          return sum.includes(e);
        })) {
          valid = true;
        }
      };

      for (var i = 0; i < 3; i++) {
        _loop(i);
      }

      if (!valid) {
        newObj = false;
      }

      _this.mergeObj = newObj;
    }
  };

  this.checkGameStatus = function () {
    if (_this.alreadyWon) return false;

    for (var _i = 0, _arr = [0, _this.order - 1]; _i < _arr.length; _i++) {
      var i = _arr[_i];
      var initial = true;

      for (var j = 0; j < _this.order; j++) {
        var data = [];

        for (var k = 0; k < _this.order; k++) {
          data.push(_this.blocks[i][j][k].piece.name.split(''));
        }

        _this.mergeSlice({
          initial: initial,
          data: data
        });

        initial = false;
      }

      if (!_this.mergeObj) {
        return false;
      }
    }

    for (var _i2 = 0, _arr2 = [0, _this.order - 1]; _i2 < _arr2.length; _i2++) {
      var _i3 = _arr2[_i2];
      var _initial = true;

      for (var _j = 0; _j < _this.order; _j++) {
        var _data = [];

        for (var _k = 0; _k < _this.order; _k++) {
          _data.push(_this.blocks[_j][_k][_i3].piece.name.split(''));
        }

        _this.mergeSlice({
          initial: _initial,
          data: _data
        });

        _initial = false;
      }

      if (!_this.mergeObj) {
        return false;
      }
    }

    for (var _i4 = 0, _arr3 = [0, _this.order - 1]; _i4 < _arr3.length; _i4++) {
      var _i5 = _arr3[_i4];
      var _initial2 = true;

      for (var _j2 = 0; _j2 < _this.order; _j2++) {
        var _data2 = [];

        for (var _k2 = 0; _k2 < _this.order; _k2++) {
          _data2.push(_this.blocks[_i5][_k2][_j2].piece.name.split(''));
        }

        _this.mergeSlice({
          initial: _initial2,
          data: _data2
        });

        _initial2 = false;
      }

      if (!_this.mergeObj) {
        return false;
      }
    }

    _this.alreadyWon = true;
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
        for (var _i6 = 0; _i6 < _this.order; _i6++) {
          var _row = '';

          for (var _j3 = 0; _j3 < _this.order; _j3++) {
            _row += _this.blocks[_i6][index][_j3].piece.name + ', ';
          }

          console.log(_row);
        }

        break;

      case 'z':
        for (var _i7 = 0; _i7 < _this.order; _i7++) {
          var _row2 = '';

          for (var _j4 = 0; _j4 < _this.order; _j4++) {
            _row2 += _this.blocks[_i7][_j4][index].piece.name + ', ';
          }

          console.log(_row2);
        }

        break;
    }
  };

  this.rotateSclice = function (axis, index, direction) {
    var del = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    return new Promise(function (resolve, reject) {
      if (_this.editMode) return;

      if (_this.rotating) {
        console.log("Already in one rotation...!");
        return;
      }

      if (index >= _this.order) throw new Error('Rotation not possible on this index : ' + index + ' because maximum size is : ' + (_this.order - 1));
      if ('xyz'.indexOf(axis) == -1) throw new Error('Rotation on invalid axis: ' + axis);
      var dirAngle;
      var rotationAngleInterval = 10;
      var tempSclice = {};
      _this.rotating = true;

      switch (axis) {
        case 'x':
          dirAngle = direction === 'clockwise' ? 1 : -1;

          var _loop2 = function _loop2(i) {
            var _loop3 = function _loop3(j) {
              if (del) scene.remove(_this.blocks[index][i][j].piece);
              if (!tempSclice['' + i + j]) tempSclice['' + i + j] = _this.blocks[index][i][j].piece;

              var _this$rotationMatrixH = _this.rotationMatrixHelper(i, j, direction == 'clockwise' ? '' : 'clockwise'),
                  x = _this$rotationMatrixH.x,
                  y = _this$rotationMatrixH.y;

              _this.blocks[index][i][j].piece = tempSclice['' + x + y] || _this.blocks[index][x][y].piece;
              var totalAngle = rotationAngleInterval;

              var doRotationAnimation = function doRotationAnimation() {
                if (totalAngle == 90) {
                  _this.rotating = false;
                  setTimeout(function () {
                    return resolve("done");
                  }, 500);
                } else requestAnimationFrame(doRotationAnimation);

                var rotation = new THREE.Matrix4().makeRotationX(degree(rotationAngleInterval * dirAngle));

                _this.blocks[index][i][j].piece.applyMatrix(rotation);

                totalAngle += rotationAngleInterval;
              };

              doRotationAnimation();
            };

            for (var j = 0; j < _this.order; j++) {
              _loop3(j);
            }
          };

          for (var i = 0; i < _this.order; i++) {
            _loop2(i);
          }

          break;

        case 'y':
          dirAngle = direction === 'clockwise' ? 1 : -1;

          var _loop4 = function _loop4(_i8) {
            var _loop5 = function _loop5(j) {
              if (del) scene.remove(_this.blocks[_i8][index][j].piece);
              if (!tempSclice['' + _i8 + j]) tempSclice['' + _i8 + j] = _this.blocks[_i8][index][j].piece;

              var _this$rotationMatrixH2 = _this.rotationMatrixHelper(_i8, j, direction),
                  x = _this$rotationMatrixH2.x,
                  y = _this$rotationMatrixH2.y;

              _this.blocks[_i8][index][j].piece = tempSclice['' + x + y] || _this.blocks[x][index][y].piece;
              var totalAngle = rotationAngleInterval;

              var doRotationAnimation = function doRotationAnimation() {
                if (totalAngle == 90) {
                  _this.rotating = false;
                  setTimeout(function () {
                    return resolve("done");
                  }, 500);
                } else requestAnimationFrame(doRotationAnimation);

                var rotation = new THREE.Matrix4().makeRotationY(degree(rotationAngleInterval * dirAngle));

                _this.blocks[_i8][index][j].piece.applyMatrix(rotation);

                totalAngle += rotationAngleInterval;
              };

              doRotationAnimation();
            };

            for (var j = 0; j < _this.order; j++) {
              _loop5(j);
            }
          };

          for (var _i8 = 0; _i8 < _this.order; _i8++) {
            _loop4(_i8);
          }

          break;

        case 'z':
          dirAngle = direction === 'clockwise' ? 1 : -1;

          var _loop6 = function _loop6(_i9) {
            var _loop7 = function _loop7(j) {
              if (del) scene.remove(_this.blocks[_i9][j][index].piece);
              if (!tempSclice['' + _i9 + j]) tempSclice['' + _i9 + j] = _this.blocks[_i9][j][index].piece;

              var _this$rotationMatrixH3 = _this.rotationMatrixHelper(_i9, j, direction == 'clockwise' ? '' : 'clockwise'),
                  x = _this$rotationMatrixH3.x,
                  y = _this$rotationMatrixH3.y;

              _this.blocks[_i9][j][index].piece = tempSclice['' + x + y] || _this.blocks[x][y][index].piece;
              var totalAngle = rotationAngleInterval;

              var doRotationAnimation = function doRotationAnimation() {
                if (totalAngle == 90) {
                  _this.rotating = false;
                  setTimeout(function () {
                    return resolve("done");
                  }, 500);
                } else requestAnimationFrame(doRotationAnimation);

                var rotation = new THREE.Matrix4().makeRotationZ(degree(rotationAngleInterval * dirAngle));

                _this.blocks[_i9][j][index].piece.applyMatrix(rotation);

                totalAngle += rotationAngleInterval;
              };

              doRotationAnimation();
            };

            for (var j = 0; j < _this.order; j++) {
              _loop7(j);
            }
          };

          for (var _i9 = 0; _i9 < _this.order; _i9++) {
            _loop6(_i9);
          }

          break;
      }
    });
  };

  this.rotate = function (notation) {
    var mapping = {
      'U': function U() {
        return cube.rotateSclice('y', 2, 'anticlockwise');
      },
      'Uprime': function Uprime() {
        return cube.rotateSclice('y', 2, 'clockwise');
      },
      'D': function D() {
        return cube.rotateSclice('y', 0, 'clockwise');
      },
      'Dprime': function Dprime() {
        return cube.rotateSclice('y', 0, 'anticlockwise');
      },
      'R': function R() {
        return cube.rotateSclice('z', 0, 'clockwise');
      },
      'Rprime': function Rprime() {
        return cube.rotateSclice('z', 0, 'anticlockwise');
      },
      'L': function L() {
        return cube.rotateSclice('z', 2, 'anticlockwise');
      },
      'Lprime': function Lprime() {
        return cube.rotateSclice('z', 2, 'clockwise');
      },
      'F': function F() {
        return cube.rotateSclice('x', 2, 'anticlockwise');
      },
      'Fprime': function Fprime() {
        return cube.rotateSclice('x', 2, 'clockwise');
      },
      'B': function B() {
        return cube.rotateSclice('x', 0, 'clockwise');
      },
      'Bprime': function Bprime() {
        return cube.rotateSclice('x', 0, 'anticlockwise');
      },
      'M': function M() {
        return cube.rotateSclice('z', 1, 'anticlockwise');
      },
      'Mprime': function Mprime() {
        return cube.rotateSclice('z', 1, 'clockwise');
      },
      'E': function E() {
        return cube.rotateSclice('y', 1, 'clockwise');
      },
      'Eprime': function Eprime() {
        return cube.rotateSclice('y', 1, 'anticlockwise');
      },
      'S': function S() {
        return cube.rotateSclice('x', 1, 'anticlockwise');
      },
      'Sprime': function Sprime() {
        return cube.rotateSclice('x', 1, 'clockwise');
      }
    };

    try {
      return mapping[notation];
    } catch (e) {
      console.error('Invalid notation', e);
      console.log("step:", notation);
    }
  };

  this.getNormal = function (obj) {
    var normalMatrix = new THREE.Matrix3().getNormalMatrix(obj.matrixWorld);
    return obj.geometry.faces[1].normal.clone().applyMatrix3(normalMatrix).normalize();
  };

  this.getState = function () {
    var F = {
      faces: ["222", "221", "220", "212", "211", "210", "202", "201", "200"],
      normal: {
        x: 1,
        y: 0,
        z: 0
      }
    };
    var R = {
      faces: ["220", "120", "020", "210", "110", "010", "200", "100", "000"],
      normal: {
        x: 0,
        y: 0,
        z: 1
      }
    };
    var U = {
      faces: ["022", "021", "020", "122", "121", "120", "222", "221", "220"],
      normal: {
        x: 0,
        y: -1,
        z: 0
      }
    };
    var D = {
      faces: ["202", "201", "200", "102", "101", "100", "002", "001", "000"],
      normal: {
        x: 0,
        y: -1,
        z: 0
      }
    };
    var L = {
      faces: ["022", "122", "222", "012", "112", "212", "002", "102", "202"],
      normal: {
        x: 0,
        y: 0,
        z: 1
      }
    };
    var B = {
      faces: ["020", "021", "022", "010", "011", "012", "000", "001", "002"],
      normal: {
        x: 1,
        y: 0,
        z: 0
      }
    };

    var _map = [{
      face: "211",
      normal: {
        x: 1,
        y: 0,
        z: 0
      }
    }, {
      face: "110",
      normal: {
        x: 0,
        y: 0,
        z: 1
      }
    }, {
      face: "121",
      normal: {
        x: 0,
        y: -1,
        z: 0
      }
    }, {
      face: "101",
      normal: {
        x: 0,
        y: -1,
        z: 0
      }
    }, {
      face: "112",
      normal: {
        x: 0,
        y: 0,
        z: 1
      }
    }, {
      face: "011",
      normal: {
        x: 1,
        y: 0,
        z: 0
      }
    }].map(function (dimension, i) {
      var _dimension$face$split = dimension.face.split(""),
          _dimension$face$split2 = _slicedToArray(_dimension$face$split, 3),
          x = _dimension$face$split2[0],
          y = _dimension$face$split2[1],
          z = _dimension$face$split2[2];

      var children = cube.blocks[x][y][z].piece.children;
      var color;
      children.forEach(function (child) {
        var _cube$getNormal = cube.getNormal(child),
            x = _cube$getNormal.x,
            y = _cube$getNormal.y,
            z = _cube$getNormal.z;

        if (Math.round(x) === dimension.normal.x && Math.round(y) === dimension.normal.y && Math.round(z) === dimension.normal.z) {
          var _child$material$color = child.material.color,
              r = _child$material$color.r,
              g = _child$material$color.g,
              b = _child$material$color.b;

          if (r < 0.1 && g < 0.1 && b < 0.1) {
            return;
          }

          color = child.material.color.getHex();
        }
      });
      return color;
    }),
        _map2 = _slicedToArray(_map, 6),
        fSide = _map2[0],
        rSide = _map2[1],
        uSide = _map2[2],
        dSide = _map2[3],
        lSide = _map2[4],
        bSide = _map2[5];

    var state = "";
    [F, R, U, D, L, B].forEach(function (side) {
      side.faces.forEach(function (dimension, i) {
        var _dimension$split = dimension.split(""),
            _dimension$split2 = _slicedToArray(_dimension$split, 3),
            x = _dimension$split2[0],
            y = _dimension$split2[1],
            z = _dimension$split2[2];

        var children = cube.blocks[x][y][z].piece.children;
        children.forEach(function (child) {
          var _this$getNormal = _this.getNormal(child),
              x = _this$getNormal.x,
              y = _this$getNormal.y,
              z = _this$getNormal.z;

          if (Math.round(x) === side.normal.x && Math.round(y) === side.normal.y && Math.round(z) === side.normal.z) {
            var _child$material$color2 = child.material.color,
                r = _child$material$color2.r,
                g = _child$material$color2.g,
                b = _child$material$color2.b;

            if (r < 0.1 && g < 0.1 && b < 0.1) {
              return;
            }

            switch (child.material.color.getHex()) {
              case fSide:
                state += 'f';
                break;

              case rSide:
                state += 'r';
                break;

              case uSide:
                state += 'u';
                break;

              case dSide:
                state += 'd';
                break;

              case lSide:
                state += 'l';
                break;

              case bSide:
                state += 'b';
                break;
            }
          }
        });
      });
    });
    return state;
  };

  if (order > 10) throw new Error("Maximum cube size exceeded!");
  this.axisX = new THREE.Vector3(1, 0, 0);
  this.axisY = new THREE.Vector3(0, 1, 0);
  this.axisZ = new THREE.Vector3(0, 0, 1);
  this.alreadyWon = false;
  this.shuffling = false;
  this.rotating = false;
  this.editMode = true;
  this.activeEditColor = 0xff0000;
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
}, {});
controls.minDistance = 80 + (query.order - 3) * 30;
controls.maxDistance = 300 + (query.order - 3) * 30;
var cube = new Cube(query.order || 3);

function shuffle() {
  cube.shuffle(query.shuffle);
}

var activateColor = function activateColor(id, index) {
  Array.from(document.getElementsByClassName('active')).forEach(function (item) {
    item.className = '';
  });
  document.getElementById(id).className = 'active';
  cube.activeEditColor = cube.colors[index];
};

var findSolution = function () {
  var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
    var replacer, stepsInitial, steps, stepsReplaced, finalSteps;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            replacer = {
              f: "F S",
              r: "R Mprime",
              u: "U Eprime",
              d: "D E",
              l: "L M",
              b: "B Sprime",
              fprime: "Fprime Sprime",
              rprime: "Rprime M",
              uprime: "Uprime E",
              dprime: "Dprime Eprime",
              lprime: "Lprime Mprime",
              bprime: "Bprime S"
            };
            console.log("cube.getState()", cube.getState());
            stepsInitial = window.rubiksCubeSolver(cube.getState());
            steps = [];
            stepsInitial.split(' ').forEach(function (step) {
              if (step.slice(-1) === '2') {
                steps.push(step.slice(0, -1));
                steps.push(step.slice(0, -1));
              } else steps.push(step);
            });
            stepsReplaced = steps.map(function (step) {
              return replacer[step] || step;
            }).join(' ');

            if (stepsReplaced) {
              _context.next = 10;
              break;
            }

            alert("Already in solved state!");
            return _context.abrupt("return");

          case 10:
            console.log('stepsReplaced', stepsReplaced);
            cube.editMode = false;
            Array.from(document.getElementsByClassName("hideOnSolve")).forEach(function (e) {
              return e.style.display = "none";
            });
            Array.from(document.getElementsByClassName("showOnSolve")).forEach(function (e) {
              return e.style.display = "unset";
            });
            finalSteps = stepsReplaced.split(' ');
            window.solved = finalSteps;
            document.getElementById("message").innerText = "Can be solved in " + finalSteps.length + " steps!";
            console.log("Solved!!!");
            _context.next = 24;
            break;

          case 20:
            _context.prev = 20;
            _context.t0 = _context["catch"](0);
            alert("Unable to solve. Please make sure that you colored the cube properly!");
            console.log('e', _context.t0);

          case 24:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 20]]);
  }));

  return function findSolution() {
    return _ref2.apply(this, arguments);
  };
}();

window.isPause = true;

var pause = function pause() {
  window.isPause = true;
  Array.from(document.getElementsByClassName("hideOnPlay")).forEach(function (e) {
    return e.style.display = "unset";
  });
  Array.from(document.getElementsByClassName("showOnPlay")).forEach(function (e) {
    return e.style.display = "none";
  });
};

var play = function () {
  var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
    var id;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (window.isPause) {
              _context2.next = 3;
              break;
            }

            pause();
            return _context2.abrupt("return");

          case 3:
            Array.from(document.getElementsByClassName("hideOnPlay")).forEach(function (e) {
              return e.style.display = "none";
            });
            Array.from(document.getElementsByClassName("showOnPlay")).forEach(function (e) {
              return e.style.display = "unset";
            });
            window.isPause = false;
            id = setInterval(function () {
              if (window.isPause) {
                console.log("Paused");
                clearInterval(id);
              }

              if (window.currentStep === window.solved.length - 1) {
                console.log("Finished");
                pause();
                clearInterval(id);
              }

              oneMove(1);
            }, 400);

          case 7:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function play() {
    return _ref3.apply(this, arguments);
  };
}();

var getInverse = function getInverse(move) {
  if (move.includes('prime')) return move.split('prime')[0];
  return move + 'prime';
};

window.prevDir = -1;

var oneMove = function () {
  var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(dir) {
    var i, finalSteps, step;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            i = (window.currentStep || 0) + dir + (dir !== window.prevDir ? window.prevDir : 0);

            if (!(i < 0 || i >= window.solved.length)) {
              _context3.next = 4;
              break;
            }

            console.log("Operation not allowed!!");
            return _context3.abrupt("return");

          case 4:
            window.currentStep = i;
            window.prevDir = dir;
            finalSteps = window.solved;
            step = dir === -1 ? getInverse(finalSteps[i]) : finalSteps[i];
            console.log(i + 1, step);
            document.getElementById("current-step").innerText = i + 1 > 0 ? "Step #" + (Number(i) + 1) + ' ( ' + step.replace('prime', " '") + ' )' : '';
            _context3.next = 12;
            return cube.rotate(step)();

          case 12:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function oneMove(_x) {
    return _ref4.apply(this, arguments);
  };
}();

var handlePrevNext = function handlePrevNext(dir) {
  if (!window.isPause) {
    console.log("Already playing...");
  } else {
    oneMove(dir);
  }
};