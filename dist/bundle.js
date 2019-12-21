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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! phaser */ \"./node_modules/phaser/src/phaser.js\");\n/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(phaser__WEBPACK_IMPORTED_MODULE_0__);\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  type: phaser__WEBPACK_IMPORTED_MODULE_0___default.a.AUTO,\n  parent: 'content',\n  width: 150,\n  height: 270,\n  scale: {\n    mode: phaser__WEBPACK_IMPORTED_MODULE_0___default.a.Scale.HEIGHT_CONTROLS_WIDTH,\n    autoCenter: phaser__WEBPACK_IMPORTED_MODULE_0___default.a.Scale.CENTER_BOTH\n  },\n  autoRound: false,\n  localStorageName: 'phasergamegotinha',\n  pixelArt: true,\n  physics: {\n    default: 'arcade',\n    arcade: {\n      enableBody: true,\n      debug: false // gravity: {\n      //     y: 500,\n      // },\n\n    }\n  }\n});\n\n//# sourceURL=webpack:///./src/config.js?");

/***/ }),

/***/ "./src/constants.js":
/*!**************************!*\
  !*** ./src/constants.js ***!
  \**************************/
/*! exports provided: SPIKE_TO_LEFT_SIDE, SPIKE_TO_RIGHT_SIDE, MAIN_SPIKES_GROUP, SECONDARY_SPIKES_GROUP, TERTIARY_SPIKES_GROUP, QUATERNARY_SPIKES_GROUP */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"SPIKE_TO_LEFT_SIDE\", function() { return SPIKE_TO_LEFT_SIDE; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"SPIKE_TO_RIGHT_SIDE\", function() { return SPIKE_TO_RIGHT_SIDE; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"MAIN_SPIKES_GROUP\", function() { return MAIN_SPIKES_GROUP; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"SECONDARY_SPIKES_GROUP\", function() { return SECONDARY_SPIKES_GROUP; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"TERTIARY_SPIKES_GROUP\", function() { return TERTIARY_SPIKES_GROUP; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"QUATERNARY_SPIKES_GROUP\", function() { return QUATERNARY_SPIKES_GROUP; });\nvar SPIKE_TO_LEFT_SIDE = 0;\nvar SPIKE_TO_RIGHT_SIDE = 1;\nvar MAIN_SPIKES_GROUP = 0;\nvar SECONDARY_SPIKES_GROUP = 1;\nvar TERTIARY_SPIKES_GROUP = 2;\nvar QUATERNARY_SPIKES_GROUP = 3;\n\n//# sourceURL=webpack:///./src/constants.js?");

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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return _default; });\n/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! phaser */ \"./node_modules/phaser/src/phaser.js\");\n/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(phaser__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var webfontloader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! webfontloader */ \"./node_modules/webfontloader/webfontloader.js\");\n/* harmony import */ var webfontloader__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(webfontloader__WEBPACK_IMPORTED_MODULE_1__);\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\n\n\n\nvar _default =\n/*#__PURE__*/\nfunction (_Phaser$Scene) {\n  _inherits(_default, _Phaser$Scene);\n\n  function _default() {\n    _classCallCheck(this, _default);\n\n    return _possibleConstructorReturn(this, _getPrototypeOf(_default).call(this, {\n      key: 'BootScene'\n    }));\n  }\n\n  _createClass(_default, [{\n    key: \"preload\",\n    value: function preload() {\n      this.fontsReady = false;\n      this.fontsLoaded = this.fontsLoaded.bind(this);\n      this.add.text(10, 100, 'loading...');\n      this.load.image('loaderBg', './assets/images/loader-bg.png');\n      this.load.image('loaderBar', './assets/images/loader-bar.png');\n      webfontloader__WEBPACK_IMPORTED_MODULE_1___default.a.load({\n        google: {\n          families: ['Bangers']\n        },\n        active: this.fontsLoaded\n      });\n    }\n  }, {\n    key: \"update\",\n    value: function update() {\n      if (this.fontsReady) {\n        this.scene.start('SplashScene');\n      }\n    }\n  }, {\n    key: \"fontsLoaded\",\n    value: function fontsLoaded() {\n      this.fontsReady = true;\n    }\n  }]);\n\n  return _default;\n}(phaser__WEBPACK_IMPORTED_MODULE_0___default.a.Scene);\n\n\n\n//# sourceURL=webpack:///./src/scenes/BootScene.js?");

/***/ }),

/***/ "./src/scenes/GameScene.js":
/*!*********************************!*\
  !*** ./src/scenes/GameScene.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return _default; });\n/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! phaser */ \"./node_modules/phaser/src/phaser.js\");\n/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(phaser__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils */ \"./src/utils.js\");\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../constants */ \"./src/constants.js\");\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n/* globals __DEV__ */\n\n\n\n\nvar _default =\n/*#__PURE__*/\nfunction (_Phaser$Scene) {\n  _inherits(_default, _Phaser$Scene);\n\n  function _default() {\n    var _this;\n\n    _classCallCheck(this, _default);\n\n    _this = _possibleConstructorReturn(this, _getPrototypeOf(_default).call(this, {\n      key: 'GameScene'\n    }));\n\n    _defineProperty(_assertThisInitialized(_this), \"handleSpikesAndCrystalsCreation\", function (body, top, bottom, left, right) {\n      if (top) {\n        body.setVelocity(0, _this.config.speed);\n      } else if (bottom && body.gameObject.name === 'triggerSpikes') {\n        body.gameObject.destroy();\n        /*\n         * console.log('generate new spike!!');\n         * console.log('current group:', this.lastUsedGroup);\n         * alert(`group: ${this.lastUsedGroup}`);\n         */\n\n        switch (_this.lastUsedGroup) {\n          case _constants__WEBPACK_IMPORTED_MODULE_2__[\"QUATERNARY_SPIKES_GROUP\"]:\n            {\n              _this.lastUsedGroup = _constants__WEBPACK_IMPORTED_MODULE_2__[\"MAIN_SPIKES_GROUP\"];\n\n              _this.generateSpikes(_this.mainSpikeGroup, _this.config.spikeQuantity);\n\n              _this.generateCrystals(_this.mainCrystalGroup);\n\n              _this.mainSpikeGroup.setVelocity(0, _this.config.speed);\n\n              _this.secondarySpikeGroup.clear(true, true);\n\n              break;\n            }\n\n          case _constants__WEBPACK_IMPORTED_MODULE_2__[\"TERTIARY_SPIKES_GROUP\"]:\n            {\n              _this.lastUsedGroup = _constants__WEBPACK_IMPORTED_MODULE_2__[\"QUATERNARY_SPIKES_GROUP\"];\n\n              _this.generateSpikes(_this.quaternarySpikeGroup, _this.config.spikeQuantity);\n\n              _this.generateCrystals(_this.quaternaryCrystalGroup);\n\n              _this.quaternarySpikeGroup.setVelocity(0, _this.config.speed);\n\n              _this.mainSpikeGroup.clear(true, true);\n\n              break;\n            }\n\n          case _constants__WEBPACK_IMPORTED_MODULE_2__[\"SECONDARY_SPIKES_GROUP\"]:\n            {\n              _this.lastUsedGroup = _constants__WEBPACK_IMPORTED_MODULE_2__[\"TERTIARY_SPIKES_GROUP\"];\n\n              _this.generateSpikes(_this.tertiarySpikeGroup, _this.config.spikeQuantity);\n\n              _this.generateCrystals(_this.tertiaryCrystalGroup);\n\n              _this.tertiarySpikeGroup.setVelocity(0, _this.config.speed);\n\n              _this.quaternarySpikeGroup.clear(true, true);\n\n              break;\n            }\n\n          case _constants__WEBPACK_IMPORTED_MODULE_2__[\"MAIN_SPIKES_GROUP\"]:\n            {\n              _this.lastUsedGroup = _constants__WEBPACK_IMPORTED_MODULE_2__[\"SECONDARY_SPIKES_GROUP\"];\n\n              _this.generateSpikes(_this.secondarySpikeGroup, _this.config.spikeQuantity);\n\n              _this.generateCrystals(_this.secondaryCrystalGroup);\n\n              _this.secondarySpikeGroup.setVelocity(0, _this.config.speed);\n\n              _this.tertiarySpikeGroup.clear(true, true);\n\n              break;\n            }\n\n          default:\n            {\n              break;\n            }\n        }\n      }\n    });\n\n    _defineProperty(_assertThisInitialized(_this), \"generateSpikes\", function (group, quantity) {\n      var spikeConfig = {\n        height: 7,\n        width: 11,\n        x: 16,\n        y: 30,\n        key: 'spike',\n        origin: {\n          x: 0,\n          y: 0\n        }\n      };\n      var spikesArray = Object(_utils__WEBPACK_IMPORTED_MODULE_1__[\"generateRandomSpikePositionsArray\"])(quantity, _this.config.spikeGenerationFactor);\n      var spikePosition = -_this.config.screenSizeDifference;\n      var side = _constants__WEBPACK_IMPORTED_MODULE_2__[\"SPIKE_TO_LEFT_SIDE\"];\n\n      if (_this.lastGroupSpikePosition === side) {\n        side = _constants__WEBPACK_IMPORTED_MODULE_2__[\"SPIKE_TO_RIGHT_SIDE\"];\n      } // loop spikes for both sides\n\n\n      for (var spikeIndex in spikesArray) {\n        spikePosition += _this.config.spaceBetweenSpikes; // group.add(this.add.text(20, spikePosition, `${spikesArray[spikeIndex]}I${spikeIndex}S${side}`).setDepth(999));\n\n        if (spikesArray[spikeIndex] === 0) {\n          continue;\n        } else if (spikesArray[spikeIndex] === -1) {\n          var text = _this.add.text(-10, spikePosition, '---------------').setDepth(999);\n\n          group.add(text);\n          text.body.onWorldBounds = true;\n          text.body.setCollideWorldBounds(true);\n          text.body.setImmovable();\n          text.setName('triggerSpikes');\n\n          if (!_this.game.config.physics.arcade.debug) {\n            text.setVisible(false);\n          }\n\n          continue;\n        }\n        /*\n         * console.log('position', spikePosition);\n         * console.log('side', side);\n         */\n\n\n        var spike = void 0;\n        var originalSide = side;\n\n        if (side === _constants__WEBPACK_IMPORTED_MODULE_2__[\"SPIKE_TO_LEFT_SIDE\"]) {\n          spike = _this.make.sprite(_objectSpread({}, spikeConfig, {\n            y: spikePosition\n          }));\n          group.add(spike);\n          spike.body.setOffset(0, 2).setImmovable();\n          side = _constants__WEBPACK_IMPORTED_MODULE_2__[\"SPIKE_TO_RIGHT_SIDE\"];\n        } else {\n          spike = _this.make.sprite(_objectSpread({}, spikeConfig, {\n            y: spikePosition,\n            x: 108,\n            flipX: true\n          }));\n          group.add(spike);\n          spike.body.setOffset(0, 2).setImmovable();\n          side = _constants__WEBPACK_IMPORTED_MODULE_2__[\"SPIKE_TO_LEFT_SIDE\"];\n        }\n\n        spike.body.height = 12; // this is actually the width\n\n        _this.lastGroupSpikePosition = originalSide;\n      }\n      /*\n       * group.add(this.add.text(35, spikePosition, `A: ${this.lastUsedGroup}`).setDepth(999));\n       * const text = this.add.text(-10, spikePosition, '-----------------------------------------------------------')\n       *     .setDepth(999);\n       * group.add(text);\n       * text.body.setImmovable();\n       */\n\n    });\n\n    _defineProperty(_assertThisInitialized(_this), \"gameOver\", function (hero, foe) {\n      if (foe.name === 'triggerSpikes' || _this.isGameOver) {\n        return;\n      } // console.log('game over!');\n\n\n      _this.hero.anims.stop();\n\n      _this.hero.setFrame('drop_01');\n\n      _this.isGameOver = true;\n\n      _this.scoreText.destroy();\n\n      _this.input.on('pointerdown', function () {\n        return null;\n      });\n\n      clearInterval(_this.scoring);\n\n      _this.setVelocityToAllGroups(0);\n\n      var messageBox = new phaser__WEBPACK_IMPORTED_MODULE_0___default.a.Geom.Rectangle(25, 100, 100, 80);\n\n      var graphics = _this.add.graphics({\n        fillStyle: {\n          color: 0x095165\n        }\n      });\n\n      graphics.fillRectShape(messageBox);\n\n      _this.add.text(35, 110, \"Score:\\n\".concat(_this.getScore())).setDepth(999);\n\n      _this.add.text(35, 145, \"Tapped:\\n\".concat(_this.tapCount, \" times\")).setDepth(999); // shake the camera\n\n\n      _this.cameras.main.shake(500); // restart game\n\n\n      _this.time.delayedCall(500, function () {\n        _this.input.on('pointerdown', function () {\n          return _this.scene.restart();\n        });\n      });\n    });\n\n    _defineProperty(_assertThisInitialized(_this), \"moveHero\", function () {\n      _this.hero.anims.play('jumping'); // console.log(this.hero.scale);\n\n\n      if (_this.hero.scale === 1) {\n        _this.hero.setVelocityX(-_this.config.jumpSpeed);\n      } else {\n        _this.hero.setVelocityX(_this.config.jumpSpeed);\n      }\n    });\n\n    _defineProperty(_assertThisInitialized(_this), \"getScore\", function () {\n      return \"\".concat(_this.score).padStart(8, '0');\n    });\n\n    _defineProperty(_assertThisInitialized(_this), \"increaseDifficulty\", function () {\n      if (!_this.doneIncreasingSpikeSpawningSpeed) {\n        if (_this.score > 2500) {\n          _this.config.speed = 200;\n          _this.doneIncreasingSpikeSpawningSpeed = true;\n        } else if (_this.score > 1500) {\n          _this.config.speed = 170;\n        } else if (_this.score > 1000) {\n          _this.config.speed = 150;\n        } else if (_this.score > 700) {\n          _this.config.spikeGenerationFactor = 0.4;\n          _this.config.speed = 140;\n        } else if (_this.score > 600) {\n          _this.config.spikeGenerationFactor = 0.3;\n          _this.config.speed = 130;\n        } else if (_this.score > 500) {\n          _this.config.spikeGenerationFactor = 0.2;\n          _this.config.speed = 120;\n        } else if (_this.score > 400) {\n          _this.config.spikeGenerationFactor = 0.1;\n          _this.config.speed = 110;\n        } else if (_this.score > 300) {\n          _this.config.spikeGenerationFactor = 0;\n          _this.config.speed = 100;\n        } else if (_this.score > 200) {\n          _this.config.spikeGenerationFactor = -0.1;\n          _this.config.speed = 90;\n        } else if (_this.score > 100) {\n          _this.config.spikeGenerationFactor = -0.2;\n          _this.config.speed = 80;\n        }\n\n        _this.setVelocityToAllGroups(_this.config.speed);\n      }\n    });\n\n    _defineProperty(_assertThisInitialized(_this), \"setVelocityToAllGroups\", function (velocity) {\n      _this.blocksGroup.setVelocity(0, velocity);\n\n      _this.mainSpikeGroup.setVelocity(0, velocity);\n\n      _this.secondarySpikeGroup.setVelocity(0, velocity);\n\n      _this.tertiarySpikeGroup.setVelocity(0, velocity);\n\n      _this.quaternarySpikeGroup.setVelocity(0, velocity);\n\n      _this.mainCrystalGroup.setVelocity(0, velocity);\n\n      _this.secondaryCrystalGroup.setVelocity(0, velocity);\n\n      _this.tertiaryCrystalGroup.setVelocity(0, velocity);\n\n      _this.quaternaryCrystalGroup.setVelocity(0, velocity);\n    });\n\n    _defineProperty(_assertThisInitialized(_this), \"generateCrystals\", function (group) {\n      var crystalsArray = Object(_utils__WEBPACK_IMPORTED_MODULE_1__[\"generateRandomCrystalPositionsArray\"])();\n      var crystalPosition = -_this.config.screenSizeDifference;\n\n      for (var crystalIndex in crystalsArray) {\n        crystalPosition += _this.config.spaceBetweenSpikes;\n\n        if (crystalsArray[crystalIndex] === 0) {\n          continue;\n        }\n\n        var crystal = _this.createCrystal(_this.game.config.width / 2, crystalPosition, crystalsArray[crystalIndex]);\n\n        group.add(crystal);\n        crystal.body.setImmovable();\n        /*\n         * crystal.anims.play(\n         *     `crystal_0${crystalsArray[crystalIndex]}_flipping`\n         * );\n         */\n      }\n    });\n\n    _defineProperty(_assertThisInitialized(_this), \"createCrystal\", function (x, y, cristalNumber) {\n      var frameName = \"crystal_0\".concat(cristalNumber);\n      var frameRate = 4;\n\n      var crystal = _this.make.sprite({\n        height: 16,\n        width: 16,\n        x: x,\n        y: y,\n        key: 'crystals',\n        frame: frameName\n      });\n\n      crystal.setName(cristalNumber);\n\n      if (!_this.anims.exists(\"\".concat(frameName, \"_flipping_normal\"))) {\n        _this.anims.create({\n          key: \"\".concat(frameName, \"_flipping_normal\"),\n          frames: _this.anims.generateFrameNames('crystals', {\n            frames: [\"\".concat(frameName, \"_flip_01\"), frameName, \"\".concat(frameName, \"_flip_01\"), \"\".concat(frameName, \"_flip_02\")]\n          }),\n          frameRate: frameRate\n        });\n      }\n\n      if (!_this.anims.exists(\"\".concat(frameName, \"_flipping_reverse\"))) {\n        _this.anims.create({\n          key: \"\".concat(frameName, \"_flipping_reverse\"),\n          frames: _this.anims.generateFrameNames('crystals', {\n            frames: [\"\".concat(frameName, \"_flip_01\"), frameName, \"\".concat(frameName, \"_flip_01\"), \"\".concat(frameName, \"_flip_02\")]\n          }),\n          frameRate: frameRate\n        });\n      }\n\n      crystal.on('animationcomplete', function () {\n        var scale = crystal.scale;\n        crystal.setScale(scale * -1);\n\n        if (scale === 1) {\n          crystal.anims.play(\"\".concat(frameName, \"_flipping_reverse\"));\n          crystal.setFlipY(true);\n        } else {\n          crystal.anims.play(\"\".concat(frameName, \"_flipping_normal\"));\n          crystal.setFlipY(false);\n        }\n      });\n      crystal.anims.play(\"\".concat(frameName, \"_flipping_normal\"));\n      return crystal;\n    });\n\n    _defineProperty(_assertThisInitialized(_this), \"crystalAcquired\", function (hero, crystal) {\n      if (crystal.texture.key === 'crystals') {\n        _this.score += crystal.name * 25;\n        crystal.destroy();\n      }\n    });\n\n    _defineProperty(_assertThisInitialized(_this), \"updateScore\", function () {\n      // TODO\n      _this.score += 1;\n\n      _this.scoreText.setText(_this.getScore());\n    });\n\n    return _this;\n  }\n\n  _createClass(_default, [{\n    key: \"init\",\n    value: function init() {\n      var _this2 = this;\n\n      // TODO\n      this.spacebarKey = this.input.keyboard.addKey('SPACE');\n      this.input.on('pointerdown', function () {\n        _this2.tapCount += 1;\n\n        if (_this2.tapCount === 4) {\n          _this2.tapIcon.destroy();\n        }\n\n        _this2.moveHero();\n      });\n      this.hero = {};\n      this.tapIcon = {};\n      this.lastUsedGroup = _constants__WEBPACK_IMPORTED_MODULE_2__[\"MAIN_SPIKES_GROUP\"];\n      this.lastGroupSpikePosition = null;\n      this.score = 0;\n      this.tapCount = 0;\n      this.scoring = null;\n      this.isGameOver = false;\n      this.doneIncreasingSpikeSpawningSpeed = false;\n      this.config = {\n        tileSize: 16,\n        screenSizeDifference: 370,\n        spikeQuantity: 4,\n        spaceBetweenSpikes: 16,\n        jumpSpeed: 800,\n        speed: 70,\n        spikeGenerationFactor: -0.3\n      };\n      this.config = _objectSpread({}, this.config, {\n        heroXPosition: this.game.config.width - this.config.tileSize,\n        heroYPosition: this.game.config.height - 110,\n        chunkSize: this.config.tileSize * 20\n      });\n    }\n  }, {\n    key: \"preload\",\n    value: function preload() {// TODO\n    }\n  }, {\n    key: \"create\",\n    value: function create() {\n      var _this3 = this;\n\n      // add background image\n      this.add.image(0, 0, 'background').setOrigin(0, 0);\n      this.tapIcon = this.add.image(this.game.config.width / 2, this.game.config.height - 60, 'tap');\n      this.scoreText = this.add.text(35, this.game.config.height - 20, '00000000').setDepth(999);\n      this.scoring = setInterval(function () {\n        return _this3.updateScore();\n      }, 300); // console.log(this.config);\n      // this.add.existing(this.createCrystal(50, 50, 1));\n      // add hero sprites and physics\n\n      this.hero = this.physics.add.sprite(this.config.heroXPosition, this.config.heroYPosition, 'hero', 'drop_03').setOrigin(0, 0).setImmovable();\n      this.hero.body.width = 30; // actually height\n\n      this.hero.body.height = 26; // actually width\n\n      this.hero.body.setOffset(0, 2);\n      this.physics.world.setBoundsCollision(); // console.log(this.hero.body);\n      // add blocks physics and groups\n\n      this.blocksGroup = this.physics.add.group();\n      this.mainSpikeGroup = this.physics.add.group();\n      this.secondarySpikeGroup = this.physics.add.group();\n      this.tertiarySpikeGroup = this.physics.add.group();\n      this.quaternarySpikeGroup = this.physics.add.group(); // crystal groups\n\n      this.mainCrystalGroup = this.physics.add.group();\n      this.secondaryCrystalGroup = this.physics.add.group();\n      this.tertiaryCrystalGroup = this.physics.add.group();\n      this.quaternaryCrystalGroup = this.physics.add.group();\n      var height = this.config.chunkSize;\n      var y = -(height + this.config.screenSizeDifference);\n\n      for (var i = 0; i < 4; i++) {\n        var leftBlock = this.make.tileSprite({\n          x: 0,\n          y: y,\n          height: height,\n          width: this.config.tileSize,\n          // angle: 90,\n          key: 'tile',\n          origin: {\n            x: 0,\n            y: 0\n          }\n        });\n        var rightBlock = this.make.tileSprite({\n          x: this.config.heroXPosition,\n          y: y,\n          height: height,\n          width: this.config.tileSize,\n          // angle: 90,\n          key: 'tile',\n          flipX: true,\n          origin: {\n            x: 0,\n            y: 0\n          }\n        });\n        this.blocksGroup.add(leftBlock);\n        this.blocksGroup.add(rightBlock);\n        leftBlock.body.setImmovable();\n        rightBlock.body.setImmovable();\n        y += height - this.config.tileSize;\n      } // console.log(this.blocksGroup);\n      // console.log(this.hero);\n      // generate spikes\n\n\n      this.generateSpikes(this.mainSpikeGroup, this.config.spikeQuantity); // set group speed\n\n      this.blocksGroup.setVelocity(0, this.config.speed);\n      this.mainSpikeGroup.setVelocity(0, this.config.speed); // this.secondarySpikeGroup.setVelocity(0, this.config.speed);\n      // creates hero animation\n\n      this.anims.create({\n        key: 'walking',\n        frames: this.anims.generateFrameNames('hero', {\n          frames: ['drop_01', 'drop_02', 'drop_03']\n        }),\n        frameRate: 6,\n        yoyo: true,\n        repeat: -1\n      });\n      this.anims.create({\n        key: 'jumping',\n        frames: this.anims.generateFrameNames('hero', {\n          frames: ['drop_jump_01']\n        }),\n        frameRate: 1\n      }); // plays animation\n\n      this.hero.anims.play('walking'); // set collision\n\n      this.physics.add.collider(this.hero, this.blocksGroup);\n      this.physics.add.collider(this.hero, this.mainSpikeGroup, this.gameOver);\n      this.physics.add.collider(this.hero, this.secondarySpikeGroup, this.gameOver);\n      this.physics.add.collider(this.hero, this.tertiarySpikeGroup, this.gameOver);\n      this.physics.add.collider(this.hero, this.quaternarySpikeGroup, this.gameOver); // set crystal collision\n\n      this.physics.add.collider(this.hero, this.mainCrystalGroup, this.crystalAcquired);\n      this.physics.add.collider(this.hero, this.secondaryCrystalGroup, this.crystalAcquired);\n      this.physics.add.collider(this.hero, this.tertiaryCrystalGroup, this.crystalAcquired);\n      this.physics.add.collider(this.hero, this.quaternaryCrystalGroup, this.crystalAcquired);\n      this.physics.world.on('worldbounds', this.handleSpikesAndCrystalsCreation); // console.log(this.cameras.main);\n    }\n  }, {\n    key: \"update\",\n    value: function update() {\n      if (this.isGameOver) {\n        return;\n      }\n\n      this.increaseDifficulty(); // hero moving commands\n\n      if (phaser__WEBPACK_IMPORTED_MODULE_0___default.a.Input.Keyboard.JustDown(this.spacebarKey)) {\n        this.moveHero();\n      }\n\n      if (this.hero.x < this.config.tileSize) {\n        // left side\n        this.hero.setVelocityX(0);\n        this.hero.x = this.config.tileSize; // this.hero.y = this.hero.y + 15;\n\n        this.hero.body.setOffset(30, -2);\n        this.hero.setScale(-1);\n        this.hero.setFlipY(true);\n        this.hero.anims.play('walking');\n      }\n\n      if (this.hero.x > this.config.heroXPosition) {\n        // right side\n        this.hero.setVelocityX(0);\n        this.hero.x = this.config.heroXPosition; // this.hero.y = this.config.heroYPosition;\n\n        this.hero.body.setOffset(0, 2);\n        this.hero.setScale(1);\n        this.hero.setFlipY(false);\n        this.hero.anims.play('walking');\n      } // calculates the restart of the blocks chink\n\n\n      var _iteratorNormalCompletion = true;\n      var _didIteratorError = false;\n      var _iteratorError = undefined;\n\n      try {\n        for (var _iterator = this.blocksGroup.children.entries[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {\n          var blockChunk = _step.value;\n\n          if (blockChunk.y - 320 >= this.game.config.height) {\n            blockChunk.y = -(this.config.chunkSize / 2 + this.config.screenSizeDifference);\n          }\n        }\n      } catch (err) {\n        _didIteratorError = true;\n        _iteratorError = err;\n      } finally {\n        try {\n          if (!_iteratorNormalCompletion && _iterator.return != null) {\n            _iterator.return();\n          }\n        } finally {\n          if (_didIteratorError) {\n            throw _iteratorError;\n          }\n        }\n      }\n    }\n  }]);\n\n  return _default;\n}(phaser__WEBPACK_IMPORTED_MODULE_0___default.a.Scene);\n\n\n\n//# sourceURL=webpack:///./src/scenes/GameScene.js?");

/***/ }),

/***/ "./src/scenes/SplashScene.js":
/*!***********************************!*\
  !*** ./src/scenes/SplashScene.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return _default; });\n/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! phaser */ \"./node_modules/phaser/src/phaser.js\");\n/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(phaser__WEBPACK_IMPORTED_MODULE_0__);\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\n\n\nvar _default =\n/*#__PURE__*/\nfunction (_Phaser$Scene) {\n  _inherits(_default, _Phaser$Scene);\n\n  function _default() {\n    _classCallCheck(this, _default);\n\n    return _possibleConstructorReturn(this, _getPrototypeOf(_default).call(this, {\n      key: 'SplashScene'\n    }));\n  }\n\n  _createClass(_default, [{\n    key: \"preload\",\n    value: function preload() {\n      /*\n       *\n       * load your assets\n       *\n       */\n      // this.load.image('blocks', 'assets/images/blocks.png');\n      this.load.image('background', 'assets/images/background.png');\n      this.load.image('tap', 'assets/images/tap.png'); // this.load.image('tiles', 'assets/images/tiles.png');\n\n      this.load.image('tile', 'assets/images/tile.png');\n      this.load.image('spike', 'assets/images/spike.png');\n      this.load.atlas('hero', 'assets/images/drop.png', 'assets/atlas/drop_atlas.json');\n      this.load.atlas('crystals', 'assets/images/crystals.png', 'assets/atlas/crystals_atlas.json');\n    }\n  }, {\n    key: \"create\",\n    value: function create() {\n      this.scene.start('GameScene');\n    }\n  }, {\n    key: \"update\",\n    value: function update() {// TODO\n    }\n  }]);\n\n  return _default;\n}(phaser__WEBPACK_IMPORTED_MODULE_0___default.a.Scene);\n\n\n\n//# sourceURL=webpack:///./src/scenes/SplashScene.js?");

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/*! exports provided: generateRandomSpikePositionsArray, generateRandomCrystalPositionsArray */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"generateRandomSpikePositionsArray\", function() { return generateRandomSpikePositionsArray; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"generateRandomCrystalPositionsArray\", function() { return generateRandomCrystalPositionsArray; });\nvar generateRandomSpikePositionsArray = function generateRandomSpikePositionsArray() {\n  var quantity = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 4;\n  var factor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.2;\n\n  /*\n   * 1 - means there will be a spike there\n   * 0 - means no spike\n   */\n  var array = [getSpikeOrNot(factor + 0.2), 0];\n\n  for (var i = 0; i < quantity; i++) {\n    array.push(0, getSpikeOrNot(factor), 0);\n  } // -1 is the trigger for spawning new spikes\n\n\n  array.push(0, -1);\n  return array;\n};\nvar generateRandomCrystalPositionsArray = function generateRandomCrystalPositionsArray() {\n  var factor = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0.95;\n  var quantity = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 16;\n\n  /*\n   * 0 > means there will be a crystal there\n   * 0 <= means no crystal\n   */\n  var array = [];\n\n  for (var i = 0; i < quantity; i++) {\n    array.push(getCrystalOrNot(factor));\n  }\n\n  return array;\n};\n\nvar getCrystalOrNot = function getCrystalOrNot(factor) {\n  /* eslint-disable array-element-newline */\n  var crystalTypesArray = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 4];\n\n  if (Math.random() >= factor) {\n    return crystalTypesArray[Math.floor(Math.random() * crystalTypesArray.length)];\n  }\n\n  return 0;\n};\n\nvar getSpikeOrNot = function getSpikeOrNot(factor) {\n  return Math.round(Math.random() + factor) <= 0 ? 0 : 1;\n};\n\n//# sourceURL=webpack:///./src/utils.js?");

/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! C:\\Users\\monte\\Documents\\Projects\\gotinha\\src\\main.js */\"./src/main.js\");\n\n\n//# sourceURL=webpack:///multi_./src/main.js?");

/***/ })

/******/ });