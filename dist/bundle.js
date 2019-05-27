/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
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
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/typescript/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/typescript/Game sync recursive ^\\.\\/.*$":
/*!*******************************************!*\
  !*** ./src/typescript/Game sync ^\.\/.*$ ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var map = {\n\t\"./Game\": \"./src/typescript/Game/Game.ts\",\n\t\"./Game.ts\": \"./src/typescript/Game/Game.ts\",\n\t\"./entities.json\": \"./src/typescript/Game/entities.json\",\n\t\"./ghostred-a_0.png\": \"./src/typescript/Game/ghostred-a_0.png\",\n\t\"./ghostred-a_1.png\": \"./src/typescript/Game/ghostred-a_1.png\",\n\t\"./ghostred-a_2.png\": \"./src/typescript/Game/ghostred-a_2.png\",\n\t\"./ghostred-a_3.png\": \"./src/typescript/Game/ghostred-a_3.png\",\n\t\"./ghostred-b_0.png\": \"./src/typescript/Game/ghostred-b_0.png\",\n\t\"./ghostred-b_1.png\": \"./src/typescript/Game/ghostred-b_1.png\",\n\t\"./ghostred-b_2.png\": \"./src/typescript/Game/ghostred-b_2.png\",\n\t\"./ghostred-b_3.png\": \"./src/typescript/Game/ghostred-b_3.png\",\n\t\"./level-data.json\": \"./src/typescript/Game/level-data.json\",\n\t\"./pacman-a_0.png\": \"./src/typescript/Game/pacman-a_0.png\",\n\t\"./pacman-a_1.png\": \"./src/typescript/Game/pacman-a_1.png\",\n\t\"./pacman-a_2.png\": \"./src/typescript/Game/pacman-a_2.png\",\n\t\"./pacman-a_3.png\": \"./src/typescript/Game/pacman-a_3.png\",\n\t\"./pacman-b_0.png\": \"./src/typescript/Game/pacman-b_0.png\",\n\t\"./pacman-b_1.png\": \"./src/typescript/Game/pacman-b_1.png\",\n\t\"./pacman-b_2.png\": \"./src/typescript/Game/pacman-b_2.png\",\n\t\"./pacman-b_3.png\": \"./src/typescript/Game/pacman-b_3.png\",\n\t\"./pacman-c_0.png\": \"./src/typescript/Game/pacman-c_0.png\",\n\t\"./pacman-c_1.png\": \"./src/typescript/Game/pacman-c_1.png\",\n\t\"./pacman-c_2.png\": \"./src/typescript/Game/pacman-c_2.png\",\n\t\"./pacman-c_3.png\": \"./src/typescript/Game/pacman-c_3.png\",\n\t\"./sprites.json\": \"./src/typescript/Game/sprites.json\",\n\t\"./states.json\": \"./src/typescript/Game/states.json\"\n};\n\n\nfunction webpackContext(req) {\n\tvar id = webpackContextResolve(req);\n\treturn __webpack_require__(id);\n}\nfunction webpackContextResolve(req) {\n\tvar id = map[req];\n\tif(!(id + 1)) { // check for number or string\n\t\tvar e = new Error(\"Cannot find module '\" + req + \"'\");\n\t\te.code = 'MODULE_NOT_FOUND';\n\t\tthrow e;\n\t}\n\treturn id;\n}\nwebpackContext.keys = function webpackContextKeys() {\n\treturn Object.keys(map);\n};\nwebpackContext.resolve = webpackContextResolve;\nmodule.exports = webpackContext;\nwebpackContext.id = \"./src/typescript/Game sync recursive ^\\\\.\\\\/.*$\";\n\n//# sourceURL=webpack:///./src/typescript/Game_sync_^\\.\\/.*$?");

/***/ }),

/***/ "./src/typescript/Game/Game.ts":
/*!*************************************!*\
  !*** ./src/typescript/Game/Game.ts ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _states_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./states.json */ \"./src/typescript/Game/states.json\");\nvar _states_json__WEBPACK_IMPORTED_MODULE_0___namespace = /*#__PURE__*/__webpack_require__.t(/*! ./states.json */ \"./src/typescript/Game/states.json\", 1);\n/* harmony import */ var _entities_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./entities.json */ \"./src/typescript/Game/entities.json\");\nvar _entities_json__WEBPACK_IMPORTED_MODULE_1___namespace = /*#__PURE__*/__webpack_require__.t(/*! ./entities.json */ \"./src/typescript/Game/entities.json\", 1);\n/* harmony import */ var _sprites_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./sprites.json */ \"./src/typescript/Game/sprites.json\");\nvar _sprites_json__WEBPACK_IMPORTED_MODULE_2___namespace = /*#__PURE__*/__webpack_require__.t(/*! ./sprites.json */ \"./src/typescript/Game/sprites.json\", 1);\n\n\n\nclass Game {\n    constructor() {\n        this.canvas = document.getElementById('canvas');\n        this.canvas.width = 1024;\n        this.canvas.height = 720;\n        this.ctx = this.canvas.getContext('2d');\n        this.states = _states_json__WEBPACK_IMPORTED_MODULE_0__;\n        this.entities = _entities_json__WEBPACK_IMPORTED_MODULE_1__;\n        this.sprites = _sprites_json__WEBPACK_IMPORTED_MODULE_2__;\n        this.images = {};\n        this.objects = {};\n        this.x = 0;\n        this.y = 0;\n        this.dx = 0;\n        this.dy = 0;\n        this.tics = 0;\n        this.direction = 0;\n        this.currentState = this.states[this.entities['pacman'].initState];\n    }\n    start() {\n        this.init()\n            .then(() => {\n            this.step();\n        });\n    }\n    init() {\n        this.initObjects();\n        document.addEventListener('keydown', (event) => {\n            this.input(event);\n        });\n        const imageNames = Object.keys(_sprites_json__WEBPACK_IMPORTED_MODULE_2__);\n        const promises = imageNames.map((imageName) => {\n            const imageSrc = __webpack_require__(\"./src/typescript/Game sync recursive ^\\\\.\\\\/.*$\")(`./${imageName}`);\n            return new Promise((resolve) => {\n                const image = new Image();\n                image.onload = () => {\n                    const result = {};\n                    result[imageName] = image;\n                    resolve(result);\n                };\n                image.src = imageSrc;\n            });\n        });\n        return Promise.all(promises).then((values) => {\n            values.forEach((value) => {\n                this.images[Object.keys(value)[0]] = value[Object.keys(value)[0]];\n            });\n        });\n    }\n    initObjects() {\n        for (const key in this.entities) {\n            const entity = this.entities[key];\n            entity.x = 0;\n            entity.y = 0;\n            entity.dx = 0;\n            entity.dy = 0;\n            entity.tics = 0;\n            entity.direction = 0;\n            entity.currentState = this.states[entity.initState];\n            this.objects[key] = entity;\n        }\n        console.log(this.objects);\n    }\n    input(event) {\n        const pacman = this.objects['pacman'];\n        switch (event.key) {\n            case 'ArrowRight':\n                pacman.direction = 0;\n                return;\n            case 'ArrowDown':\n                pacman.direction = 1;\n                return;\n            case 'ArrowLeft':\n                pacman.direction = 2;\n                return;\n            case 'ArrowUp':\n                pacman.direction = 3;\n                return;\n        }\n        const ghostRed = this.objects['ghost-red'];\n        switch (event.key) {\n            case 'd':\n                ghostRed.direction = 0;\n                return;\n            case 's':\n                ghostRed.direction = 1;\n                return;\n            case 'a':\n                ghostRed.direction = 2;\n                return;\n            case 'w':\n                ghostRed.direction = 3;\n                return;\n        }\n    }\n    update() {\n        for (const key in this.objects) {\n            const entity = this.objects[key];\n            if (entity.direction === 3) {\n                entity.dx = 0;\n                entity.dy = -entity.speed;\n            }\n            else if (entity.direction === 1) {\n                entity.dx = 0;\n                entity.dy = entity.speed;\n            }\n            else if (entity.direction === 2) {\n                entity.dx = -entity.speed;\n                entity.dy = 0;\n            }\n            else if (entity.direction === 0) {\n                entity.dx = entity.speed;\n                entity.dy = 0;\n            }\n            else {\n                entity.dx = entity.dy = 0;\n            }\n            entity.x += Math.floor(entity.dx);\n            entity.y += Math.floor(entity.dy);\n            if (entity.tics >= entity.currentState.tics) {\n                entity.tics = 0;\n                entity.currentState = this.states[entity.currentState.nextState];\n            }\n            entity.tics++;\n        }\n    }\n    draw() {\n        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);\n        for (const key in this.objects) {\n            const entity = this.objects[key];\n            this.ctx.save();\n            this.ctx.translate(entity.x + 25, entity.y + 25);\n            const path = `${entity.currentState.sprite}_${entity.direction}.png`;\n            console.log('path = ', path);\n            const image = this.images[path];\n            this.ctx.drawImage(image, -25, -25, 50, 50);\n            this.ctx.restore();\n        }\n    }\n    step() {\n        requestAnimationFrame(this.step.bind(this));\n        this.update();\n        this.draw();\n    }\n}\n/* harmony default export */ __webpack_exports__[\"default\"] = (Game);\n\n\n//# sourceURL=webpack:///./src/typescript/Game/Game.ts?");

/***/ }),

/***/ "./src/typescript/Game/entities.json":
/*!*******************************************!*\
  !*** ./src/typescript/Game/entities.json ***!
  \*******************************************/
/*! exports provided: pacman, ghost-red, default */
/***/ (function(module) {

eval("module.exports = {\"pacman\":{\"initState\":\"PACMAN_RUN\",\"speed\":3.5},\"ghost-red\":{\"initState\":\"GHOSTRED_RUN\",\"speed\":3.5}};\n\n//# sourceURL=webpack:///./src/typescript/Game/entities.json?");

/***/ }),

/***/ "./src/typescript/Game/ghostred-a_0.png":
/*!**********************************************!*\
  !*** ./src/typescript/Game/ghostred-a_0.png ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"edbd5b80cc9bed887e93aaf9b401c3bc.png\";\n\n//# sourceURL=webpack:///./src/typescript/Game/ghostred-a_0.png?");

/***/ }),

/***/ "./src/typescript/Game/ghostred-a_1.png":
/*!**********************************************!*\
  !*** ./src/typescript/Game/ghostred-a_1.png ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"fd8811c5beb64f1b7c7dd65d33ac138a.png\";\n\n//# sourceURL=webpack:///./src/typescript/Game/ghostred-a_1.png?");

/***/ }),

/***/ "./src/typescript/Game/ghostred-a_2.png":
/*!**********************************************!*\
  !*** ./src/typescript/Game/ghostred-a_2.png ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"d84cf7756bff46a6106b4c511b92893e.png\";\n\n//# sourceURL=webpack:///./src/typescript/Game/ghostred-a_2.png?");

/***/ }),

/***/ "./src/typescript/Game/ghostred-a_3.png":
/*!**********************************************!*\
  !*** ./src/typescript/Game/ghostred-a_3.png ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"81b74f507c4242e142ca15251a5db7af.png\";\n\n//# sourceURL=webpack:///./src/typescript/Game/ghostred-a_3.png?");

/***/ }),

/***/ "./src/typescript/Game/ghostred-b_0.png":
/*!**********************************************!*\
  !*** ./src/typescript/Game/ghostred-b_0.png ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"9be2e6cc39305eed76e0a019cb5db21d.png\";\n\n//# sourceURL=webpack:///./src/typescript/Game/ghostred-b_0.png?");

/***/ }),

/***/ "./src/typescript/Game/ghostred-b_1.png":
/*!**********************************************!*\
  !*** ./src/typescript/Game/ghostred-b_1.png ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"8c158e0ae21919d1fce57b57067734a4.png\";\n\n//# sourceURL=webpack:///./src/typescript/Game/ghostred-b_1.png?");

/***/ }),

/***/ "./src/typescript/Game/ghostred-b_2.png":
/*!**********************************************!*\
  !*** ./src/typescript/Game/ghostred-b_2.png ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"6e9ba21b7a083dd2fbace4b02584b30b.png\";\n\n//# sourceURL=webpack:///./src/typescript/Game/ghostred-b_2.png?");

/***/ }),

/***/ "./src/typescript/Game/ghostred-b_3.png":
/*!**********************************************!*\
  !*** ./src/typescript/Game/ghostred-b_3.png ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"ee073c2a45ac81e168ff9535b1dda5fd.png\";\n\n//# sourceURL=webpack:///./src/typescript/Game/ghostred-b_3.png?");

/***/ }),

/***/ "./src/typescript/Game/level-data.json":
/*!*********************************************!*\
  !*** ./src/typescript/Game/level-data.json ***!
  \*********************************************/
/*! exports provided: gridSize, layers, default */
/***/ (function(module) {

eval("module.exports = {\"gridSize\":{\"width\":28,\"height\":31},\"layers\":{\"walls\":{\"z-index\":0,\"entries\":[{\"name\":\"top-left\",\"image\":{\"name\":\"top-left.png\",\"coordinates\":{\"x\":1,\"y\":2},\"size\":{\"width\":32,\"height\":32},\"flipped\":true,\"angle\":90}}]},\"eats\":{\"params\":{\"z-index\":0},\"entries\":[{\"name\":\"big-eat\",\"image\":{\"name\":\"big-eat.png\",\"coordinates\":{\"x\":0,\"y\":1},\"size\":{\"width\":32,\"height\":32}}}]},\"enemies\":{\"params\":{\"z-index\":3},\"entries\":[{\"name\":\"pinky\",\"image\":{\"name\":\"pinky.png\",\"coordinates\":{\"x\":0,\"y\":1},\"size\":{\"width\":32,\"height\":32}}}]},\"players\":{\"params\":{\"z-index\":2},\"entries\":[{\"name\":\"pacman\",\"image\":{\"name\":\"pacman.png\",\"coordinates\":{\"x\":10,\"y\":5},\"size\":{\"width\":14,\"height\":14}}}]}}};\n\n//# sourceURL=webpack:///./src/typescript/Game/level-data.json?");

/***/ }),

/***/ "./src/typescript/Game/pacman-a_0.png":
/*!********************************************!*\
  !*** ./src/typescript/Game/pacman-a_0.png ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"6177b4c22077141bc18acd8d2022b0fb.png\";\n\n//# sourceURL=webpack:///./src/typescript/Game/pacman-a_0.png?");

/***/ }),

/***/ "./src/typescript/Game/pacman-a_1.png":
/*!********************************************!*\
  !*** ./src/typescript/Game/pacman-a_1.png ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"6177b4c22077141bc18acd8d2022b0fb.png\";\n\n//# sourceURL=webpack:///./src/typescript/Game/pacman-a_1.png?");

/***/ }),

/***/ "./src/typescript/Game/pacman-a_2.png":
/*!********************************************!*\
  !*** ./src/typescript/Game/pacman-a_2.png ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"6177b4c22077141bc18acd8d2022b0fb.png\";\n\n//# sourceURL=webpack:///./src/typescript/Game/pacman-a_2.png?");

/***/ }),

/***/ "./src/typescript/Game/pacman-a_3.png":
/*!********************************************!*\
  !*** ./src/typescript/Game/pacman-a_3.png ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"6177b4c22077141bc18acd8d2022b0fb.png\";\n\n//# sourceURL=webpack:///./src/typescript/Game/pacman-a_3.png?");

/***/ }),

/***/ "./src/typescript/Game/pacman-b_0.png":
/*!********************************************!*\
  !*** ./src/typescript/Game/pacman-b_0.png ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"220d5d88b3363a025d1fb9e846d2fe57.png\";\n\n//# sourceURL=webpack:///./src/typescript/Game/pacman-b_0.png?");

/***/ }),

/***/ "./src/typescript/Game/pacman-b_1.png":
/*!********************************************!*\
  !*** ./src/typescript/Game/pacman-b_1.png ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"87f19f1a8562a695913c041df8a4510e.png\";\n\n//# sourceURL=webpack:///./src/typescript/Game/pacman-b_1.png?");

/***/ }),

/***/ "./src/typescript/Game/pacman-b_2.png":
/*!********************************************!*\
  !*** ./src/typescript/Game/pacman-b_2.png ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"08dfc9c785a4f539d7665a88c9b0f96a.png\";\n\n//# sourceURL=webpack:///./src/typescript/Game/pacman-b_2.png?");

/***/ }),

/***/ "./src/typescript/Game/pacman-b_3.png":
/*!********************************************!*\
  !*** ./src/typescript/Game/pacman-b_3.png ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"3d7dba2872beb40edcd4b311b9018ba2.png\";\n\n//# sourceURL=webpack:///./src/typescript/Game/pacman-b_3.png?");

/***/ }),

/***/ "./src/typescript/Game/pacman-c_0.png":
/*!********************************************!*\
  !*** ./src/typescript/Game/pacman-c_0.png ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"ed882a4ba4a35a5c5f34b3e3eec5edef.png\";\n\n//# sourceURL=webpack:///./src/typescript/Game/pacman-c_0.png?");

/***/ }),

/***/ "./src/typescript/Game/pacman-c_1.png":
/*!********************************************!*\
  !*** ./src/typescript/Game/pacman-c_1.png ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"27dbf242a97e533cab74b9f3c40912c8.png\";\n\n//# sourceURL=webpack:///./src/typescript/Game/pacman-c_1.png?");

/***/ }),

/***/ "./src/typescript/Game/pacman-c_2.png":
/*!********************************************!*\
  !*** ./src/typescript/Game/pacman-c_2.png ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"592d5494fa620bb2b4ce9e30d3a18d33.png\";\n\n//# sourceURL=webpack:///./src/typescript/Game/pacman-c_2.png?");

/***/ }),

/***/ "./src/typescript/Game/pacman-c_3.png":
/*!********************************************!*\
  !*** ./src/typescript/Game/pacman-c_3.png ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"0f1dd9664c05d0d76524e42dad1c5db2.png\";\n\n//# sourceURL=webpack:///./src/typescript/Game/pacman-c_3.png?");

/***/ }),

/***/ "./src/typescript/Game/sprites.json":
/*!******************************************!*\
  !*** ./src/typescript/Game/sprites.json ***!
  \******************************************/
/*! exports provided: pacman-a_0.png, pacman-a_1.png, pacman-a_2.png, pacman-a_3.png, pacman-b_0.png, pacman-b_1.png, pacman-b_2.png, pacman-b_3.png, pacman-c_0.png, pacman-c_1.png, pacman-c_2.png, pacman-c_3.png, ghostred-a_0.png, ghostred-a_1.png, ghostred-a_2.png, ghostred-a_3.png, ghostred-b_0.png, ghostred-b_1.png, ghostred-b_2.png, ghostred-b_3.png, default */
/***/ (function(module) {

eval("module.exports = {\"pacman-a_0.png\":\"pacman-a_0.png\",\"pacman-a_1.png\":\"pacman-a_1.png\",\"pacman-a_2.png\":\"pacman-a_2.png\",\"pacman-a_3.png\":\"pacman-a_3.png\",\"pacman-b_0.png\":\"pacman-b_0.png\",\"pacman-b_1.png\":\"pacman-b_1.png\",\"pacman-b_2.png\":\"pacman-b_2.png\",\"pacman-b_3.png\":\"pacman-b_3.png\",\"pacman-c_0.png\":\"pacman-c_0.png\",\"pacman-c_1.png\":\"pacman-c_1.png\",\"pacman-c_2.png\":\"pacman-c_2.png\",\"pacman-c_3.png\":\"pacman-c_3.png\",\"ghostred-a_0.png\":\"ghostred-a_0.png\",\"ghostred-a_1.png\":\"ghostred-a_1.png\",\"ghostred-a_2.png\":\"ghostred-a_2.png\",\"ghostred-a_3.png\":\"ghostred-a_3.png\",\"ghostred-b_0.png\":\"ghostred-b_0.png\",\"ghostred-b_1.png\":\"ghostred-b_1.png\",\"ghostred-b_2.png\":\"ghostred-b_2.png\",\"ghostred-b_3.png\":\"ghostred-b_3.png\"};\n\n//# sourceURL=webpack:///./src/typescript/Game/sprites.json?");

/***/ }),

/***/ "./src/typescript/Game/states.json":
/*!*****************************************!*\
  !*** ./src/typescript/Game/states.json ***!
  \*****************************************/
/*! exports provided: PACMAN_STAY, PACMAN_RUN, PACMAN_RUN_1, PACMAN_RUN_2, PACMAN_RUN_3, GHOSTRED_RUN, GHOSTRED_RUN_1, default */
/***/ (function(module) {

eval("module.exports = {\"PACMAN_STAY\":{\"sprite\":\"pacman-b\",\"tics\":0,\"nextState\":\"PACMAN_STAY\"},\"PACMAN_RUN\":{\"sprite\":\"pacman-b\",\"tics\":2,\"nextState\":\"PACMAN_RUN_1\"},\"PACMAN_RUN_1\":{\"sprite\":\"pacman-c\",\"tics\":2,\"nextState\":\"PACMAN_RUN_2\"},\"PACMAN_RUN_2\":{\"sprite\":\"pacman-b\",\"tics\":2,\"nextState\":\"PACMAN_RUN_3\"},\"PACMAN_RUN_3\":{\"sprite\":\"pacman-a\",\"tics\":2,\"nextState\":\"PACMAN_RUN\"},\"GHOSTRED_RUN\":{\"sprite\":\"ghostred-a\",\"tics\":10,\"nextState\":\"GHOSTRED_RUN_1\"},\"GHOSTRED_RUN_1\":{\"sprite\":\"ghostred-b\",\"tics\":10,\"nextState\":\"GHOSTRED_RUN\"}};\n\n//# sourceURL=webpack:///./src/typescript/Game/states.json?");

/***/ }),

/***/ "./src/typescript/index.ts":
/*!*********************************!*\
  !*** ./src/typescript/index.ts ***!
  \*********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Game_Game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Game/Game */ \"./src/typescript/Game/Game.ts\");\n\nwindow.onload = () => {\n    console.log('window onload');\n    const game = new _Game_Game__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n    game.start();\n};\n\n\n//# sourceURL=webpack:///./src/typescript/index.ts?");

/***/ })

/******/ });