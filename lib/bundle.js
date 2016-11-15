/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const Game = __webpack_require__(1);
	
	document.addEventListener("DOMContentLoaded", () => {
	  // let canvasEl = document.getElementById('canvas');
	  // const content = canvasEl.getContext("2d");
	  // content.strokeRect(0,0,1000,500);
	  // const game = new Game(content);
	  const canvas = document.getElementById("canvas");
	  const stage = new createjs.Stage(canvas);
	
	  //Create a Shape DisplayObject.
	  // const circle = new createjs.Shape();
	  // circle.graphics.beginFill("red").drawCircle(0, 0, 40);
	  // //Set position of Shape instance.
	  // circle.x = circle.y = 50;
	  // //Add Shape instance to stage display list.
	  // stage.addChild(circle);
	  // //Update stage will render next frame
	  // stage.update();
	
	  const game = new Game(stage);
	
	  // createjs.Ticker.addEventListener("tick", handleTick);
	  //
	  // function handleTick() {
	  //  //Circle will move 10 units to the right.
	  //     circle.x += 10;
	  //     createjs.Ticker.timingMode = createjs.Ticker.RAF_SYNCHED;
	  //     createjs.Ticker.setFPS(900);
	  //     //Will cause the circle to wrap back
	  //     if (circle.x > stage.canvas.width) { circle.x = 0; }
	  //     stage.update();
	  // }
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const Hero = __webpack_require__(2);
	const Fish = __webpack_require__(3);
	
	class Game {
	  constructor(stage) {
	    // this.draw(stage);
	    this.hero = [];
	    this.fish = [];
	    this.createHero(stage);
	    this.createFish(stage);
	    this.detectCollision(stage);
	  }
	
	  draw(canvas) {
	    // canvas.strokeRect(0,0,100,50);
	  }
	
	  createHero(stage) {
	    const hero = new Hero(stage);
	    this.hero = [hero];
	  }
	
	  createFish(stage) {
	    for (let i = 0; i < 1; i++) {
	      const fish = new Fish(stage);
	      this.fish = this.fish.concat(fish);
	      console.log(fish.fish);
	      this.fish.alpha = 0;
	      console.log(fish.fish.alpha);
	    }
	    stage.update();
	  }
	
	  allObjects() {
	    // console.log(this.hero[0].hero.x);
	    // console.log(this.fish[0].fish.x);
	    return [].concat(this.hero).concat(this.fish);
	  }
	
	  detectCollision(stage) {
	    // console.log(this.hero[0].hero.x);
	    createjs.Ticker.addEventListener("tick", handleTick.bind(this));
	    function handleTick(e) {
	      this.fish.forEach(el => {
	        el.fish.width = el.fish.image.width*el.fish.scaleX;
	        el.fish.height = el.fish.image.height*el.fish.scaleX;
	        // console.log(el.fish.scaleX);
	        // console.log(this.hero[0].hero.x);
	        // console.log(el.fish);
	        // console.log(el.fish.width);
	        // console.log(this.hero[0].hero.width);
	        console.log(Math.abs(this.hero[0].hero.x - el.fish.x));
	        if ((Math.abs(this.hero[0].hero.x - el.fish.x) < ((el.fish.width > this.hero[0].hero.width ? (el.fish.width/2) : (this.hero[0].hero.width/2)))) && (Math.abs(this.hero[0].hero.y - el.fish.y) < (100 * el.fish.scaleY))) {
	          console.log('collision!');
	          el.fish.x += 100000;
	          el.fish.y += 100000;
	          stage.removeChild(el.fish);
	          this.hero[0].hero.scaleX += .05;
	          this.hero[0].hero.scaleY += .05;
	        }
	      // if ((Math.abs(el.fish.x - this.hero[0].hero.x) < 50) && (Math.abs(el.fish.y - this.hero[0].hero.y) < 50)) {
	      //     console.log('collision!');
	      //     el.fish.x += 100000;
	      //     stage.removeChild(el.fish);
	      //     this.hero[0].hero.scaleX += .05;
	      //     this.hero[0].hero.scaleY += .05;
	      // }
	      });
	      // if (Math.floor(Math.random() * 15) === 3) {
	      //   // console.log(stage.children);
	      //   if (stage.children.length < 15) {
	      //     const fish = new Fish(stage);
	      //     this.fish = this.fish.concat(fish);
	      //   }
	      // }
	    }
	  }
	
	}
	
	module.exports = Game;


/***/ },
/* 2 */
/***/ function(module, exports) {

	
	class Hero {
	  constructor(stage) {
	    this.hero = this.draw(stage);
	    this.heroX = 0;
	    this.heroY = 0;
	  }
	
	  draw(stage) {
	    const hero = new createjs.Bitmap("./images/hero_transparent.png");
	    hero.scaleX=0.2;
	    hero.scaleY=0.2;
	    hero.x = stage.canvas.width / 2;
	    hero.y = stage.canvas.height / 2;
	
	    console.log(hero);
	    // debugger
	
	    stage.addChild(hero);
	    addEventListener('keypress', (e) => {
	      // console.log(e);
	      if (e.key === 'a') {
	        // debugger
	        if (this.heroX > -10) {
	          this.heroX -= 3;
	          if (this.hero.rotation > 0) {
	            this.hero.rotation = 0;
	            this.hero.skewX = 0;
	            // this.hero.x -= 75;
	            this.hero.x -= (this.hero.image.width*this.hero.scaleX);
	          }
	        }
	      } else if (e.key === 'd') {
	        if (this.heroX < 10) {
	          this.heroX += 3;
	          if (this.hero.rotation === 0) {
	            this.hero.rotation = 180;
	            this.hero.skewX = 180;
	            // this.hero.x += 75;
	            this.hero.x += (this.hero.image.width*this.hero.scaleX);
	          }
	        }
	      } else if (e.key === 'w') {
	        if (this.heroY > -10) {
	          this.heroY -= 3;
	        }
	      } else if (e.key === 's') {
	        if (this.heroY < 10) {
	          this.heroY += 3;
	        }
	      }
	      // console.log(this.hero);
	      stage.update();
	    });
	    createjs.Ticker.addEventListener("tick", handleTick.bind(this));
	    function handleTick(e) {
	      // console.log(event);
	      // console.log(stage.canvas.height);
	
	      hero.x += this.heroX;
	      hero.y += this.heroY;
	      hero.width = hero.image.width * hero.scaleX;
	      hero.height = hero.image.height * hero.scaleY;
	      // debugger
	      if (hero.x > stage.canvas.width) {
	        hero.x = 0;
	        this.heroX = 0;
	      } else if (hero.x < 0) {
	        hero.x = stage.canvas.width;
	        this.heroX = 0;
	      }
	      if (hero.y > stage.canvas.height-20) {
	        hero.y = stage.canvas.height-20;
	        this.heroY = 0;
	      } else if (hero.y < 0) {
	        hero.y = 0;
	        this.heroY = 0;
	      }
	
	      if (this.heroX > 0) {
	        this.heroX -= .1;
	      } else if (this.heroX < 0) {
	        this.heroX += .1;
	      }
	      if (this.heroY > 0) {
	        this.heroY -= .1;
	      } else if (this.heroY < 0) {
	        this.heroY += .1;
	      }
	
	      stage.update();
	    }
	    return hero;
	  }
	
	  move() {
	    const nextX = this.pos[0] + 1;
	    const nextY = this.pos[1] + 1;
	    this.pos = [nextX, nextY];
	  }
	}
	
	module.exports = Hero;


/***/ },
/* 3 */
/***/ function(module, exports) {

	
	class Fish {
	  constructor(stage) {
	    this.fishX = -1;
	    this.size = this.randomSize();
	    this.fish = this.draw(stage);
	  }
	
	  randomSize() {
	    return Math.random();
	  }
	
	  randomPosition(stage) {
	    let x = Math.floor(Math.random() + .5);
	    // console.log(x);
	    if (x === 1) {
	      x = stage.canvas.width;
	    }
	    const y = Math.random() * stage.canvas.height;
	    return [x,y];
	  }
	
	  setVelocity(fish) {
	    // console.log(fish);
	    if (fish.x === 0) {
	      this.fishX = Math.random() * 3;
	      fish.rotation = 180;
	      fish.skewX = 180;
	      fish.x += 75;
	    } else {
	      this.fishX = 0 - Math.random() * 3;
	    }
	    // console.log(this.fishX);
	  }
	
	  draw(stage) {
	    const fish = new createjs.Bitmap("./images/transparent.png");
	    fish.scaleX=this.size;
	    fish.scaleY=this.size;
	    fish.width = 100*this.size;
	    fish.height = 70*this.size;
	    // debugger
	    // fish.x = stage.canvas.width / 2;
	    // fish.y = stage.canvas.height / 4;
	    const pos = this.randomPosition.bind(this)(stage);
	    fish.x = pos[0];
	    fish.y = pos[1];
	    this.setVelocity.bind(this)(fish);
	    stage.addChild(fish);
	    // debugger
	    console.log(fish);
	    createjs.Ticker.addEventListener("tick", handleTick.bind(this));
	    function handleTick(e) {
	      // console.log(event);
	      // console.log(stage.canvas.height);
	
	      fish.x += this.fishX;
	      if (fish.x > stage.canvas.width) {
	        fish.x = 0;
	        stage.removeChild(fish);
	      } else if (fish.x < 0) {
	        fish.x = stage.canvas.width;
	      }
	
	      stage.update();
	    }
	    return fish;
	  }
	
	  move() {
	  }
	}
	
	module.exports = Fish;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map