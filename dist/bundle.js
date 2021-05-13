/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/apple.js":
/*!**********************!*\
  !*** ./src/apple.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Apple)\n/* harmony export */ });\nclass Apple {\r\n    constructor(position = [10,10]) {   // Valeur par défaut\r\n        this.position = position;\r\n    }\r\n\r\n    setNewPosition(widthInBlocks, heightInBlocks){\r\n        // l'objet Math et la fonction random permet de donner un chiffre aléatoire entre 0 et 1 sauf que moi je veux entre 0 et le nombre de block qu'il y a dans la largeur -1. Mais ça peut me donner un nombre à virgure et ça je ne veux pas, je veux des chiffres entier donc il faut utiliser l'objet Math et la fonction round\r\n        const newX = Math.round(Math.random()*(widthInBlocks-1));\r\n        const newY = Math.round(Math.random()*(heightInBlocks-1));\r\n        this.position = [newX, newY];\r\n    };\r\n    isOnSnake(snakeToCheck){\r\n        let isOnSnake = false;\r\n        //for(let i = 0 ; i < snakeToCheck.body.length ; i++){  // utilisation du for normal\r\n        for(let block of snakeToCheck.body){    // utilisation du for of\r\n            //if(this.position[0] === snakeToCheck.body[i][0] && this.position[1] === snakeToCheck.body[i][1]){ // Utilisation du for normal\r\n            if(this.position[0] === block[0] && this.position[1] === block[1]){   // Utilisation du for of\r\n                isOnSnake = true;\r\n            }\r\n        }\r\n        return isOnSnake;\r\n    };\r\n}\n\n//# sourceURL=webpack://snake-project/./src/apple.js?");

/***/ }),

/***/ "./src/drawing.js":
/*!************************!*\
  !*** ./src/drawing.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Drawing)\n/* harmony export */ });\nclass Drawing {\r\n\r\n    static gameOver(ctx, centerX, centerY) {\r\n        ctx.save();\r\n\r\n        ctx.font = \"bold 70px sans-serif\";\r\n        ctx.fillStyle = \"black\";\r\n        ctx.textAlign = \"center\";\r\n        ctx.textBaseline = \"middle\";        // Sinon il n'est pas vraiment au milieu car il prend le dessous du chiffre. La, il va l'afficher par rapport au milieu.\r\n        ctx.strokeStyle = \"white\";          // Donne un style blanc autour du text.\r\n        ctx.lineWidth = 5;                  // C'est l'épaisseur du strokeStyle.\r\n        /* const centerX = canvasWidth / 2;\r\n        const centerY = canvasHeight / 2; */\r\n\r\n        ctx.strokeText(\"Game Over\", centerX, centerY - 180); // Permet de remplir le stroke qu'on a renseigné plus haut pour le voir.\r\n        ctx.fillText(\"Game Over\", centerX, centerY - 180);   // la fonction fillText() => Permet d'écrire à l'écran. Il possède 2 arguments, le text et l'endroit.\r\n        \r\n        ctx.font = \"bold 30px sans-serif\";\r\n        ctx.strokeText(\"Appuyer sur la touche Espace pour rejouer\", centerX, centerY - 120);\r\n        ctx.fillText(\"Appuyer sur la touche Espace pour rejouer\", centerX, centerY - 120);\r\n\r\n        ctx.restore();\r\n    }\r\n\r\n    static drawScore(ctx, centerX, centerY, score) {\r\n        ctx.save();\r\n        ctx.font = \"bold 200px sans-serif\";\r\n        ctx.fillStyle = \"gray\";\r\n        ctx.textAlign = \"center\";\r\n        ctx.textBaseline = \"middle\"; \r\n        /* const centerX = canvasWidth / 2;\r\n        const centerY = canvasHeight / 2; */\r\n        ctx.fillText(score.toString(), centerX, centerY );\r\n        ctx.restore();\r\n    }\r\n\r\n    static drawSnake(ctx, blockSize, snake){  // Va déssiner le corp du serpent.\r\n        ctx.save();         // Je sauvegarde son contenu de comme il était avant.\r\n        ctx.fillStyle = \"#ff0000\";\r\n        //  for(let i = 0; i < this.body.length; i++){ // Utilisation du for normal\r\n        for (let block of snake.body) {   // Utilisation du for of\r\n            // drawBlock(ctx, this.body[i]); // Permet de déssiner un block. On lui donne le context du canvas sur lequel il doit déssiner et la position du block à déssiner.\r\n            this.drawBlock(ctx, block, blockSize);  // Nouvelle version suite au for of\r\n        }\r\n        ctx.restore();      // Permet de le remettre comme il était avant.\r\n    };\r\n\r\n    static drawApple(ctx, blockSize, apple){\r\n        const radius = blockSize/2;\r\n        const x = apple.position[0]*blockSize + radius;\r\n        const y = apple.position[1]*blockSize + radius;\r\n\r\n        ctx.save();\r\n\r\n        ctx.fillStyle = \"#33cc33\";\r\n        ctx.beginPath();\r\n\r\n        ctx.arc(x, y, radius, 0, Math.PI*2, true);  // Fonction qui permet de déssiner un cercle.\r\n        ctx.fill(); // Ensuite on le rempli\r\n\r\n        ctx.restore();\r\n    };\r\n    \r\n    static drawBlock(ctx, position, blockSize) {\r\n        // 1ere version\r\n        // const x = position[0] * blockSize;\r\n        // const y = position[1] * blockSize;\r\n        // ctx.fillRect(x, y, blockSize, blockSize);\r\n\r\n        // Version avec le Destructuring\r\n        const [x,y] = position;\r\n        ctx.fillRect(x*blockSize, y*blockSize, blockSize, blockSize);\r\n    }\r\n}\n\n//# sourceURL=webpack://snake-project/./src/drawing.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Game)\n/* harmony export */ });\n/* harmony import */ var _snake_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./snake.js */ \"./src/snake.js\");\n/* harmony import */ var _apple_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./apple.js */ \"./src/apple.js\");\n/* harmony import */ var _drawing_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./drawing.js */ \"./src/drawing.js\");\n\r\n\r\n\r\n\r\nclass Game {\r\n\r\n    constructor(canvasWidth = 900, canvasHeight = 600) {\r\n        this.canvasWidth = canvasWidth;\r\n        this.canvasHeight = canvasHeight;\r\n        this.blockSize = 30; // le block fait 30px sur 30px\r\n        this.canvas = document.createElement('canvas');\r\n        this.ctx = this.canvas.getContext('2d'); \r\n        this.widthInBlocks = this.canvasWidth/this.blockSize;\r\n        this.heightInBlocks = this.canvasHeight/this.blockSize;\r\n        this.centerX = this.canvasWidth / 2;\r\n        this.centerY = this.canvasHeight / 2;\r\n        this.delay;\r\n        this.snakee;\r\n        this.applee;\r\n        this.score;\r\n        this.timeout;\r\n    }\r\n\r\n    init() {\r\n        /* const canvas = document.createElement('canvas'); */\r\n        this.canvas.width = this.canvasWidth;\r\n        this.canvas.height = this.canvasHeight;\r\n        this.canvas.style.border = \"30px solid grey\";\r\n        this.canvas.style.margin = \"50px auto\";\r\n        this.canvas.style.display = \"block\";\r\n        this.canvas.style.backgroundColor = \"#ddd\";\r\n        document.body.appendChild(this.canvas);  // document => c'est le document entier de la page html | il va prendre son body | appendChild => permet d'accrocher un tag à ce body\r\n    \r\n        // Comment \"dessiner\" dans ce canvas. On va essayer de faire un rectangle.\r\n        // Pour dessiner dans le canvas on à besoin d'utiliser le context\r\n        // Pour l'utiliser, on va créer une variable et je vais attraper le context de notre canvas qu'on vient de mettre.\r\n        // Il y a plusieurs façon de dessiner dans un canvas, la on va déssiner en 2D.\r\n        /* ctx = canvas.getContext('2d');  */ \r\n\r\n        // Création du serpent qui possède un body\r\n        /* snakee = new Snake([[6,4], [5,4], [4,4], [3,4], [2,4]], \"right\"); */\r\n\r\n        // Création de la pomme\r\n        /* applee = new Apple([10,10]);\r\n\r\n        score = 0; */\r\n\r\n        // A la fin de ma fonction init je veux appeler ma fonction refreshCanvas.\r\n        /* refreshCanvas(); */\r\n        this.launch();\r\n    }\r\n\r\n    launch() {\r\n        // Création du serpent qui possède un body\r\n        this.snakee = new _snake_js__WEBPACK_IMPORTED_MODULE_0__.default(\"right\", [6,4], [5,4], [4,4], [3,4], [2,4]);\r\n\r\n        // Création de la pomme\r\n        this.applee = new _apple_js__WEBPACK_IMPORTED_MODULE_1__.default();\r\n\r\n        this.score = 0;\r\n        clearTimeout(this.timeout);\r\n        this.delay = 100;\r\n        // A la fin de ma fonction init je veux appeler ma fonction refreshCanvas.\r\n        this.refreshCanvas();\r\n    }\r\n\r\n    refreshCanvas() {\r\n        this.snakee.advance();\r\n        if(this.snakee.checkCollision(this.widthInBlocks, this.heightInBlocks)){\r\n            _drawing_js__WEBPACK_IMPORTED_MODULE_2__.default.gameOver(this.ctx, this.centerX, this.centerY);\r\n        } else {\r\n            if(this.snakee.isEatingApple(this.applee)) {\r\n                this.score++;\r\n                this.snakee.eatApple = true;\r\n\r\n                do {\r\n                    this.applee.setNewPosition(this.widthInBlocks, this.heightInBlocks);\r\n                } while(this.applee.isOnSnake(this.snakee)) // Si la nouvelle position est sur le serpent snakee, ça va renvoyer true et il va revenir au do et recréer une nouvelle position.\r\n\r\n                if(this.score % 5 == 0){\r\n                    this.speedUp();\r\n                }\r\n            }\r\n            this.ctx.clearRect(0,0,this.canvasWidth, this.canvasHeight);\r\n            _drawing_js__WEBPACK_IMPORTED_MODULE_2__.default.drawScore(this.ctx, this.centerX, this.centerY, this.score);\r\n            _drawing_js__WEBPACK_IMPORTED_MODULE_2__.default.drawSnake(this.ctx, this.blockSize, this.snakee);\r\n            _drawing_js__WEBPACK_IMPORTED_MODULE_2__.default.drawApple(this.ctx, this.blockSize, this.applee);\r\n            this.timeout = setTimeout(this.refreshCanvas.bind(this), this.delay); // Permet d'excecuter une certaine fonction à chaque qu'un certains délais est passé.\r\n        }\r\n\r\n    }\r\n\r\n    speedUp() {\r\n        this.delay /= 1.3;\r\n    }\r\n\r\n}\n\n//# sourceURL=webpack://snake-project/./src/game.js?");

/***/ }),

/***/ "./src/script.js":
/*!***********************!*\
  !*** ./src/script.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _game_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game.js */ \"./src/game.js\");\n\r\n\r\nwindow.onload = () => {  // window.onload => Permet de lancer la fonction lorsque la page sera chargé.\r\n\r\n    let myGame = new _game_js__WEBPACK_IMPORTED_MODULE_0__.default();\r\n    myGame.init();\r\n\r\n    document.onkeydown = (e) => {\r\n        const key = e.keyCode;\r\n        let newDirection;\r\n        switch(key)\r\n        {\r\n            case 81:\r\n                newDirection = \"left\";\r\n                break;\r\n            case 90:\r\n                newDirection = \"up\";\r\n                break;\r\n            case 68:\r\n                newDirection = \"right\";\r\n                break;\r\n            case 83:\r\n                newDirection = \"down\";\r\n                break;\r\n            case 32:\r\n                myGame.launch();\r\n                return;\r\n            default:\r\n                return;\r\n        }\r\n        myGame.snakee.setDirection(newDirection);\r\n    }\r\n\r\n\r\n}\n\n//# sourceURL=webpack://snake-project/./src/script.js?");

/***/ }),

/***/ "./src/snake.js":
/*!**********************!*\
  !*** ./src/snake.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Snake)\n/* harmony export */ });\nclass Snake {\r\n        //  ...body => utilisation du parametre Rest\r\n    constructor(direction, ...body){   // Cette fonction prend le corp du serpent. | Ceci est le constructeur de la fonction\r\n    this.body = body;       // Le serpent ç un corp qui prend le corp que je fournis à ma fonction constructeur.\r\n    this.direction = direction;\r\n    this.ateApple = false;\r\n    }\r\n\r\n    advance(){\r\n    const nextPosition = this.body[0].slice();    // Slice => permet de copier un élément\r\n    switch(this.direction){\r\n    case \"left\":\r\n        nextPosition[0] -= 1;\r\n        break;\r\n    case \"right\":\r\n        nextPosition[0] += 1;\r\n        break;\r\n    case \"down\":\r\n        nextPosition[1] += 1;\r\n        break;\r\n    case \"up\":\r\n        nextPosition[1] -= 1;\r\n        break;\r\n    default:\r\n        throw(\"Invalid Direction\");    // throw => fonction permet de dire qu'il y a une erreur et de donner un message d'erreur.\r\n    }\r\n    this.body.unshift(nextPosition); // unshift => permet dans un array de rajouter ce que je met entre () à la 1ere place.\r\n    if(!this.eatApple)\r\n    this.body.pop(); // pop => permet de supprimer le dernier élément d'un array\r\n    else\r\n    this.eatApple = false;\r\n    };\r\n    setDirection(newDirection){\r\n    let allowedDirections;\r\n    switch(this.direction){\r\n    case \"left\":\r\n    case \"right\":\r\n        allowedDirections = [\"up\", \"down\"];\r\n        break;\r\n    case \"down\":\r\n    case \"up\":\r\n        allowedDirections = [\"left\", \"right\"];\r\n        break;\r\n    default:\r\n        throw(\"Invalid Direction\");\r\n    }\r\n    if(allowedDirections.includes(newDirection)){\r\n    this.direction = newDirection;\r\n    }\r\n    };\r\n    checkCollision(widthInBlocks, heightInBlocks){\r\n    let wallCollision = false;\r\n    let snakeCollision = false;\r\n    // const head = this.body[0];  //Version 1\r\n    // const rest = this.body.slice(1); // slice => permet de sauter le 1er élément et à partir de l'index 1 je prend tout ce qu'il y a dans le body.   //Version 1\r\n    const [head,...rest] = this.body;     // Version avec destructuring et j'utilise les paramètres Rest avec : ...rest | attention l'array s'appelle aussi rest ici, ne pas confondre.\r\n    // const snakeX = head[0];  //Version 1\r\n    // const snakeY = head[1];  //Version 1\r\n    const [snakeX,snakeY] = head;   //Version avec destructuring\r\n    const minX = 0;\r\n    const minY = 0;\r\n    const maxX = widthInBlocks - 1;\r\n    const maxY = heightInBlocks - 1;\r\n    const isNotBetweenHorizontalWalls = snakeX < minX || snakeX > maxX;\r\n    const isNotBetweenVerticalWalls = snakeY < minY || snakeY > maxY;\r\n\r\n    if(isNotBetweenHorizontalWalls || isNotBetweenVerticalWalls){\r\n    wallCollision = true;\r\n    }\r\n\r\n    //for(let i = 0; i < rest.length; i++){ // Utilisation du for normal\r\n    for(let block of rest){   // Utilisation du for of\r\n    //if(snakeX === rest[i][0] && snakeY === rest[i][1])    // Utilisation du for\r\n    if(snakeX === block[0] && snakeY === block[1])  // Utilisation du for of\r\n        snakeCollision = true;\r\n    }\r\n    return wallCollision || snakeCollision;\r\n    };\r\n    isEatingApple(appleToEat){\r\n    const head = this.body[0];\r\n    if(head[0] === appleToEat.position[0] && head[1] === appleToEat.position[1])\r\n    return true;\r\n    else\r\n    return false;\r\n    };\r\n}\n\n//# sourceURL=webpack://snake-project/./src/snake.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/script.js");
/******/ 	
/******/ })()
;