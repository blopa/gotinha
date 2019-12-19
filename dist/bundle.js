/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"app": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "./dist/";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([0,"vendor"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/config.js":
/*!***********************!*\
  !*** ./src/config.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! phaser */ \"./node_modules/phaser/src/phaser.js\");\n/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(phaser__WEBPACK_IMPORTED_MODULE_0__);\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  type: phaser__WEBPACK_IMPORTED_MODULE_0___default.a.AUTO,\n  parent: 'content',\n  width: 150,\n  height: 640,\n  localStorageName: 'phaseres6webpack',\n  pixelArt: true,\n  physics: {\n    default: 'arcade',\n    arcade: {\n      enableBody: true,\n      debug: true // gravity: {\n      //     y: 500,\n      // },\n\n    }\n  }\n});\n\n//# sourceURL=webpack:///./src/config.js?");

/***/ }),

/***/ "./src/constants.js":
/*!**************************!*\
  !*** ./src/constants.js ***!
  \**************************/
/*! exports provided: SPIKE_TO_LEFT_SIDE, SPIKE_TO_RIGHT_SIDE, MAIN_SPIKES_GROUP, SECONDARY_SPIKES_GROUP, TERTIARY_SPIKES_GROUP */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"SPIKE_TO_LEFT_SIDE\", function() { return SPIKE_TO_LEFT_SIDE; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"SPIKE_TO_RIGHT_SIDE\", function() { return SPIKE_TO_RIGHT_SIDE; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"MAIN_SPIKES_GROUP\", function() { return MAIN_SPIKES_GROUP; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"SECONDARY_SPIKES_GROUP\", function() { return SECONDARY_SPIKES_GROUP; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"TERTIARY_SPIKES_GROUP\", function() { return TERTIARY_SPIKES_GROUP; });\nvar SPIKE_TO_LEFT_SIDE = 0;\nvar SPIKE_TO_RIGHT_SIDE = 1;\nvar MAIN_SPIKES_GROUP = 0;\nvar SECONDARY_SPIKES_GROUP = 1;\nvar TERTIARY_SPIKES_GROUP = 2;\n\n//# sourceURL=webpack:///./src/constants.js?");

/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! phaser */ \"./node_modules/phaser/src/phaser.js\");\n/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(phaser__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _scenes_BootScene__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./scenes/BootScene */ \"./src/scenes/BootScene.js\");\n/* harmony import */ var _scenes_SplashScene__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./scenes/SplashScene */ \"./src/scenes/SplashScene.js\");\n/* harmony import */ var _scenes_GameScene__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./scenes/GameScene */ \"./src/scenes/GameScene.js\");\n/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./config */ \"./src/config.js\");\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\n\n\n\n\n\nvar gameConfig = Object.assign(_config__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {\n  scene: [_scenes_BootScene__WEBPACK_IMPORTED_MODULE_1__[\"default\"], _scenes_SplashScene__WEBPACK_IMPORTED_MODULE_2__[\"default\"], _scenes_GameScene__WEBPACK_IMPORTED_MODULE_3__[\"default\"]]\n});\n\nvar Game =\n/*#__PURE__*/\nfunction (_Phaser$Game) {\n  _inherits(Game, _Phaser$Game);\n\n  function Game() {\n    _classCallCheck(this, Game);\n\n    return _possibleConstructorReturn(this, _getPrototypeOf(Game).call(this, gameConfig));\n  }\n\n  return Game;\n}(phaser__WEBPACK_IMPORTED_MODULE_0___default.a.Game);\n\nwindow.game = new Game();\n\n//# sourceURL=webpack:///./src/main.js?");

/***/ }),

/***/ "./src/scenes/BootScene.js":
/*!*********************************!*\
  !*** ./src/scenes/BootScene.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return _default; });\n/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! phaser */ \"./node_modules/phaser/src/phaser.js\");\n/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(phaser__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var webfontloader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! webfontloader */ \"./node_modules/webfontloader/webfontloader.js\");\n/* harmony import */ var webfontloader__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(webfontloader__WEBPACK_IMPORTED_MODULE_1__);\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\n\n\n\nvar _default =\n/*#__PURE__*/\nfunction (_Phaser$Scene) {\n  _inherits(_default, _Phaser$Scene);\n\n  function _default() {\n    _classCallCheck(this, _default);\n\n    return _possibleConstructorReturn(this, _getPrototypeOf(_default).call(this, {\n      key: 'BootScene'\n    }));\n  }\n\n  _createClass(_default, [{\n    key: \"preload\",\n    value: function preload() {\n      this.fontsReady = false;\n      this.fontsLoaded = this.fontsLoaded.bind(this);\n      this.add.text(100, 100, 'loading fonts...');\n      this.load.image('loaderBg', './assets/images/loader-bg.png');\n      this.load.image('loaderBar', './assets/images/loader-bar.png');\n      webfontloader__WEBPACK_IMPORTED_MODULE_1___default.a.load({\n        google: {\n          families: ['Bangers']\n        },\n        active: this.fontsLoaded\n      });\n    }\n  }, {\n    key: \"update\",\n    value: function update() {\n      if (this.fontsReady) {\n        this.scene.start('SplashScene');\n      }\n    }\n  }, {\n    key: \"fontsLoaded\",\n    value: function fontsLoaded() {\n      this.fontsReady = true;\n    }\n  }]);\n\n  return _default;\n}(phaser__WEBPACK_IMPORTED_MODULE_0___default.a.Scene);\n\n\n\n//# sourceURL=webpack:///./src/scenes/BootScene.js?");

/***/ }),

/***/ "./src/scenes/GameScene.js":
/*!*********************************!*\
  !*** ./src/scenes/GameScene.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return _default; });\n/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! phaser */ \"./node_modules/phaser/src/phaser.js\");\n/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(phaser__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils */ \"./src/utils.js\");\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../constants */ \"./src/constants.js\");\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n/* globals __DEV__ */\n\n\n\n\nvar _default =\n/*#__PURE__*/\nfunction (_Phaser$Scene) {\n  _inherits(_default, _Phaser$Scene);\n\n  function _default() {\n    var _this;\n\n    _classCallCheck(this, _default);\n\n    _this = _possibleConstructorReturn(this, _getPrototypeOf(_default).call(this, {\n      key: 'GameScene'\n    }));\n\n    _defineProperty(_assertThisInitialized(_this), \"generateSpikes\", function (spikeConfig, group, quantity) {\n      var spikesArray = Object(_utils__WEBPACK_IMPORTED_MODULE_1__[\"generateRandomPositionsArray\"])(quantity);\n      var spikePosition = 0;\n      var side = _constants__WEBPACK_IMPORTED_MODULE_2__[\"SPIKE_TO_LEFT_SIDE\"]; // loop spikes for both sides\n\n      for (var spikeIndex in spikesArray) {\n        spikePosition += _this.config.tileSize;\n\n        if (spikesArray[spikeIndex] === 0) {\n          continue;\n        }\n\n        var spike = void 0;\n\n        if (side === _constants__WEBPACK_IMPORTED_MODULE_2__[\"SPIKE_TO_LEFT_SIDE\"]) {\n          spike = _this.make.sprite(_objectSpread({}, spikeConfig, {\n            y: spikePosition\n          }));\n          group.add(spike);\n          spike.body.setOffset(-10, -10).setImmovable();\n          side = _constants__WEBPACK_IMPORTED_MODULE_2__[\"SPIKE_TO_RIGHT_SIDE\"];\n        } else {\n          spike = _this.make.sprite(_objectSpread({}, spikeConfig, {\n            y: spikePosition,\n            x: 123,\n            flipY: true\n          }));\n          group.add(spike);\n          spike.body.setOffset(3, -10).setImmovable();\n          side = _constants__WEBPACK_IMPORTED_MODULE_2__[\"SPIKE_TO_LEFT_SIDE\"];\n        }\n\n        if (Number(spikeIndex) + 1 === spikesArray.length) {\n          spike.body.onWorldBounds = true;\n          spike.body.setCollideWorldBounds(true);\n          spike.setName('triggerSpikes');\n        }\n      }\n    });\n\n    _defineProperty(_assertThisInitialized(_this), \"gameOver\", function (hero, foe) {\n      console.log('game over!'); // alert('GAME OVER!');\n\n      _this.scene.restart();\n    });\n\n    _defineProperty(_assertThisInitialized(_this), \"moveHero\", function () {\n      _this.hero.anims.play('jumping');\n\n      if (!_this.hero.flipX) {\n        _this.hero.setVelocityX(-_this.jumpSpeed);\n      } else {\n        _this.hero.setVelocityX(_this.jumpSpeed);\n      }\n    });\n\n    return _this;\n  }\n\n  _createClass(_default, [{\n    key: \"init\",\n    value: function init() {\n      var _this2 = this;\n\n      // TODO\n      this.hero = {};\n      this.speed = 100;\n      this.jumpSpeed = 800;\n      this.spacebarKey = this.input.keyboard.addKey('SPACE');\n      this.input.on('pointerdown', function () {\n        return _this2.moveHero();\n      });\n      this.lastUsedGroup = _constants__WEBPACK_IMPORTED_MODULE_2__[\"MAIN_SPIKES_GROUP\"];\n      this.config = {\n        tileSize: 16\n      };\n      this.config = _objectSpread({}, this.config, {\n        heroXPosition: this.game.config.width - this.config.tileSize,\n        chunkSize: this.config.tileSize * 20\n      });\n    }\n  }, {\n    key: \"preload\",\n    value: function preload() {// TODO\n    }\n  }, {\n    key: \"create\",\n    value: function create() {\n      var _this3 = this;\n\n      // console.log(this.config);\n      // add background image\n      this.add.image(0, 0, 'background').setY(100); // add hero sprites and physics\n\n      this.hero = this.physics.add.sprite(this.config.heroXPosition, 600, 'hero', 'drop_10').setOrigin(0, 0).setImmovable();\n      this.hero.body.width = 20;\n      this.physics.world.setBoundsCollision(); // console.log(this.hero.body);\n      // add blocks physics and groups\n\n      this.blocksGroup = this.physics.add.group();\n      this.mainSpikeGroup = this.physics.add.group();\n      this.secondarySpikeGroup = this.physics.add.group();\n      this.tertiarySpikeGroup = this.physics.add.group();\n      var height = this.config.chunkSize;\n      var y = -height;\n\n      for (var i = 0; i < 4; i++) {\n        var leftBlock = this.make.tileSprite({\n          x: 0,\n          y: y,\n          height: height,\n          width: this.config.tileSize,\n          // angle: 90,\n          key: 'tiles',\n          frame: 29,\n          origin: {\n            x: 0,\n            y: 0\n          }\n        });\n        var rightBlock = this.make.tileSprite({\n          x: this.config.heroXPosition,\n          y: y,\n          height: height,\n          width: this.config.tileSize,\n          // angle: 90,\n          key: 'tiles',\n          frame: 29,\n          flipX: true,\n          origin: {\n            x: 0,\n            y: 0\n          }\n        });\n        this.blocksGroup.add(leftBlock);\n        this.blocksGroup.add(rightBlock);\n        leftBlock.body.setImmovable();\n        rightBlock.body.setImmovable();\n        y += height - this.config.tileSize;\n      } // console.log(this.blocksGroup);\n      // console.log(this.hero);\n      // add spikes\n\n\n      var spikeConfig = {\n        height: 7,\n        width: 11,\n        x: 27,\n        y: 30,\n        angle: 90,\n        key: 'items',\n        frame: 'items_18',\n        flipX: true,\n        // immovable: true,\n        origin: {\n          x: 0,\n          y: 0\n        }\n      }; // generate spikes\n\n      this.generateSpikes(spikeConfig, this.mainSpikeGroup, 8); // set group speed\n\n      this.blocksGroup.setVelocity(0, this.speed);\n      this.mainSpikeGroup.setVelocity(0, this.speed); // this.secondarySpikeGroup.setVelocity(0, this.speed);\n      // creates hero animation\n\n      this.anims.create({\n        key: 'walking',\n        frames: this.anims.generateFrameNames('hero', {\n          frames: ['drop_12', 'drop_09', 'drop_10']\n        }),\n        frameRate: 6,\n        yoyo: true,\n        repeat: -1\n      });\n      this.anims.create({\n        key: 'jumping',\n        frames: this.anims.generateFrameNames('hero', {\n          frames: ['drop_06', 'drop_07', 'drop_08']\n        }),\n        frameRate: 6\n      }); // plays animation\n\n      this.hero.anims.play('walking'); // set collision\n\n      this.physics.add.collider(this.hero, this.blocksGroup);\n      this.physics.add.collider(this.hero, this.mainSpikeGroup, this.gameOver);\n      this.physics.add.collider(this.hero, this.secondarySpikeGroup, this.gameOver);\n      this.physics.add.collider(this.hero, this.tertiarySpikeGroup, this.gameOver);\n      this.physics.world.on('worldbounds', function (body, top, bottom, left, right) {\n        if (bottom && body.gameObject.name === 'triggerSpikes') {\n          body.gameObject.destroy();\n\n          switch (_this3.lastUsedGroup) {\n            case _constants__WEBPACK_IMPORTED_MODULE_2__[\"MAIN_SPIKES_GROUP\"]:\n              {\n                _this3.generateSpikes(spikeConfig, _this3.secondarySpikeGroup, 5);\n\n                _this3.secondarySpikeGroup.setVelocity(0, _this3.speed);\n\n                _this3.tertiarySpikeGroup.clear(true, true);\n\n                _this3.lastUsedGroup = _constants__WEBPACK_IMPORTED_MODULE_2__[\"SECONDARY_SPIKES_GROUP\"];\n                break;\n              }\n\n            case _constants__WEBPACK_IMPORTED_MODULE_2__[\"SECONDARY_SPIKES_GROUP\"]:\n              {\n                _this3.generateSpikes(spikeConfig, _this3.tertiarySpikeGroup, 5);\n\n                _this3.tertiarySpikeGroup.setVelocity(0, _this3.speed);\n\n                _this3.mainSpikeGroup.clear(true, true);\n\n                _this3.lastUsedGroup = _constants__WEBPACK_IMPORTED_MODULE_2__[\"TERTIARY_SPIKES_GROUP\"];\n                break;\n              }\n\n            case _constants__WEBPACK_IMPORTED_MODULE_2__[\"TERTIARY_SPIKES_GROUP\"]:\n              {\n                _this3.generateSpikes(spikeConfig, _this3.mainSpikeGroup, 5);\n\n                _this3.mainSpikeGroup.setVelocity(0, _this3.speed);\n\n                _this3.secondarySpikeGroup.clear(true, true);\n\n                _this3.lastUsedGroup = _constants__WEBPACK_IMPORTED_MODULE_2__[\"MAIN_SPIKES_GROUP\"];\n                break;\n              }\n\n            default:\n              {\n                break;\n              }\n          }\n        }\n      });\n    }\n  }, {\n    key: \"update\",\n    value: function update() {\n      // hero moving commands\n      if (phaser__WEBPACK_IMPORTED_MODULE_0___default.a.Input.Keyboard.JustDown(this.spacebarKey)) {\n        this.moveHero();\n      }\n\n      if (this.hero.x < this.config.tileSize) {\n        this.hero.setVelocityX(0);\n        this.hero.x = this.config.tileSize;\n        this.hero.flipX = true;\n        this.hero.anims.play('walking');\n      }\n\n      if (this.hero.x > this.config.heroXPosition) {\n        this.hero.setVelocityX(0);\n        this.hero.x = this.config.heroXPosition;\n        this.hero.flipX = false;\n        this.hero.anims.play('walking');\n      } // calculates the restart of the blocks chink\n\n\n      var _iteratorNormalCompletion = true;\n      var _didIteratorError = false;\n      var _iteratorError = undefined;\n\n      try {\n        for (var _iterator = this.blocksGroup.children.entries[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {\n          var blockChunk = _step.value;\n\n          if (blockChunk.y - 320 >= 640) {\n            blockChunk.y = -(this.config.chunkSize / 2);\n          }\n        }\n      } catch (err) {\n        _didIteratorError = true;\n        _iteratorError = err;\n      } finally {\n        try {\n          if (!_iteratorNormalCompletion && _iterator.return != null) {\n            _iterator.return();\n          }\n        } finally {\n          if (_didIteratorError) {\n            throw _iteratorError;\n          }\n        }\n      }\n    }\n  }]);\n\n  return _default;\n}(phaser__WEBPACK_IMPORTED_MODULE_0___default.a.Scene);\n\n\n\n//# sourceURL=webpack:///./src/scenes/GameScene.js?");

/***/ }),

/***/ "./src/scenes/SplashScene.js":
/*!***********************************!*\
  !*** ./src/scenes/SplashScene.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return _default; });\n/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! phaser */ \"./node_modules/phaser/src/phaser.js\");\n/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(phaser__WEBPACK_IMPORTED_MODULE_0__);\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\n\n\nvar _default =\n/*#__PURE__*/\nfunction (_Phaser$Scene) {\n  _inherits(_default, _Phaser$Scene);\n\n  function _default() {\n    _classCallCheck(this, _default);\n\n    return _possibleConstructorReturn(this, _getPrototypeOf(_default).call(this, {\n      key: 'SplashScene'\n    }));\n  }\n\n  _createClass(_default, [{\n    key: \"preload\",\n    value: function preload() {\n      /*\r\n       *\r\n       * load your assets\r\n       *\r\n       */\n      // this.load.image('blocks', 'assets/images/blocks.png');\n      this.load.image('background', 'assets/images/background.png'); // this.load.image('tiles', 'assets/images/tiles.png');\n\n      this.load.spritesheet('tiles', 'assets/images/tiles.png', {\n        frameWidth: 16,\n        frameHeight: 16\n      });\n      this.load.atlas('items', 'assets/atlas/items.png', 'assets/atlas/items_atlas.json');\n      this.load.atlas('hero', 'assets/atlas/drops.png', 'assets/atlas/drops_atlas.json');\n    }\n  }, {\n    key: \"create\",\n    value: function create() {\n      this.scene.start('GameScene');\n    }\n  }, {\n    key: \"update\",\n    value: function update() {// TODO\n    }\n  }]);\n\n  return _default;\n}(phaser__WEBPACK_IMPORTED_MODULE_0___default.a.Scene);\n\n\n\n//# sourceURL=webpack:///./src/scenes/SplashScene.js?");

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/*! exports provided: centerGameObjects, generateRandomPositionsArray */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"centerGameObjects\", function() { return centerGameObjects; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"generateRandomPositionsArray\", function() { return generateRandomPositionsArray; });\nvar centerGameObjects = function centerGameObjects(objects) {\n  objects.forEach(function (object) {\n    object.anchor.setTo(0.5);\n  });\n};\nvar generateRandomPositionsArray = function generateRandomPositionsArray(quantity) {\n  var array = [];\n\n  for (var i = 0; i < quantity; i++) {\n    array.push(0, Math.round(Math.random()), 0);\n  }\n\n  array.push(0, 1);\n  return array;\n};\n\n//# sourceURL=webpack:///./src/utils.js?");

/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! C:\\Users\\monte\\Documents\\Projects\\phaser-es6-webpack\\src\\main.js */\"./src/main.js\");\n\n\n//# sourceURL=webpack:///multi_./src/main.js?");

/***/ })

/******/ });