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
	const Util = __webpack_require__(4);
	
	class Game {
	  constructor(stage) {
	    // this.draw(stage);
	    this.hero = [];
	    this.fish = [];
	    this.borders = [];
	    this.createHero(stage);
	    this.createFish.bind(this)(stage);
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
	    for (let i = 0; i < 5; i++) {
	      const fish = new Fish(stage);
	      this.fish = this.fish.concat(fish);
	    }
	    stage.update();
	  }
	
	  allObjects() {
	    return [].concat(this.hero).concat(this.fish);
	  }
	
	  detectCollision(stage) {
	    createjs.Ticker.addEventListener("tick", handleTick.bind(this));
	    function handleTick(e) {
	      createjs.Ticker.timingMode = createjs.Ticker.RAF_SYNCHED;
	      createjs.Ticker.setFPS(40);
	      this.borders.forEach( border => {
	        stage.removeChild(border);
	      });
	      let newFish;
	      this.fish.forEach((el, idx) => {
	        el.fish.width = el.fish.image.width*el.fish.scaleX;
	        el.fish.height = el.fish.image.height*el.fish.scaleX;
	        // debugger;
	        el.fish.x += el.fishX;
	        if (Util.wrap(el, stage)) {
	          stage.removeChild(el.fish);
	          newFish = [].concat(this.fish.splice(0,idx).concat(this.fish.splice(1)));
	          this.fish = newFish;
	        }
	        if (Util.collision(el, this.hero[0])) {
	          console.log('collision!');
	          if (el.fish.width > this.hero[0].hero.width) {
	            createjs.Ticker.reset();
	            const lose = new createjs.Text("Game Over", "40px Arial", "#05B");
	            lose.x = 300;
	            lose.y = 200;
	            stage.addChild(lose);
	            stage.removeChild(this.hero[0].hero);
	            stage.update();
	            return;
	          }
	          if (this.hero[0].hero.width > stage.canvas.width) {
	            createjs.Ticker.reset();
	            const win = new createjs.Text("You Won!", "40px Arial", "#05B");
	            win.x = 300;
	            win.y = 200;
	            stage.addChild(win);
	            // stage.removeChild(this.hero[0].hero);
	            this.fish.forEach((el) => {
	              stage.removeChild(el.fish);
	            });
	            stage.update();
	            return;
	          }
	          stage.removeChild(el.fish);
	          newFish = [].concat(this.fish.splice(0,idx).concat(this.fish.splice(1)));
	          this.fish = newFish;
	          this.hero[0].hero.scaleX += .025;
	          this.hero[0].hero.scaleY += .025;
	        }
	      // this.borders = this.borders.concat(Util.createFishBorder(el, stage));
	
	      });
	      if (Math.floor(Math.random() * 12) === 3) {
	        console.log(stage.children.length);
	        if (stage.children.length < 10) {
	          const fish = new Fish(stage);
	          this.fish = this.fish.concat(fish);
	        }
	      }
	      // this.borders = this.borders.concat(Util.createHeroBorder(this.hero[0], stage));
	      stage.update();
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
	        if (this.heroX > -8) {
	          this.heroX -= 2.5;
	          if (this.hero.rotation > 0) {
	            this.hero.rotation = 0;
	            this.hero.skewX = 0;
	            // this.hero.x -= 75;
	            this.hero.x -= (this.hero.image.width*this.hero.scaleX);
	          }
	        }
	      } else if (e.key === 'd') {
	        if (this.heroX < 8) {
	          this.heroX += 2.5;
	          if (this.hero.rotation === 0) {
	            this.hero.rotation = 180;
	            this.hero.skewX = 180;
	            // this.hero.x += 75;
	            this.hero.x += (this.hero.image.width*this.hero.scaleX);
	          }
	        }
	      } else if (e.key === 'w') {
	        if (this.heroY > -8) {
	          this.heroY -= 2.5;
	        }
	      } else if (e.key === 's') {
	        if (this.heroY < 8) {
	          this.heroY += 2.5;
	        }
	      }
	      // console.log(this.hero);
	      stage.update();
	    });
	    createjs.Ticker.addEventListener("tick", handleTick.bind(this));
	    function handleTick(e) {
	      // console.log(e);
	      // console.log(stage.canvas.height);
	
	      hero.x += this.heroX;
	      hero.y += this.heroY;
	      hero.width = hero.image.width * hero.scaleX;
	      hero.height = hero.image.height * hero.scaleY;
	      const heroCenterX = hero.x + hero.width/2;
	      const heroCenterY = hero.y + hero.height/2;
	      // debugger
	      // console.log(hero.x);
	      // console.log(heroCenterX);
	      // console.log(stage.canvas.width);
	      if (this.hero.rotation===0){
	        if (heroCenterX > stage.canvas.width) {
	          hero.x = 0;
	        } else if (heroCenterX < 0) {
	          hero.x = stage.canvas.width - hero.width/2;
	        }
	      } else {
	        // console.log(hero.x - hero.width/2);
	        if (hero.x - hero.width/2 > stage.canvas.width) {
	          hero.x = hero.width/2;
	        } else if (heroCenterX < 0) {
	          hero.x = stage.canvas.width - hero.width/2;
	        }
	      }
	      // if (hero.x > stage.canvas.width) {
	      //   hero.x = 0;
	      // } else if (hero.x < 0) {
	      //   hero.x = stage.canvas.width;
	      // }
	      if (hero.y > stage.canvas.height-hero.height/2) {
	        hero.y = stage.canvas.height-hero.height/2;
	        this.heroY = 0;
	      } else if (hero.y < 0-hero.height/2) {
	        hero.y = 0-hero.height/2;
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
	    let size = Math.random();
	    if (size < .1) {
	      size += .1;
	    }
	    return size;
	  }
	
	  randomPosition(stage) {
	    let x = Math.floor(Math.random() + .5);
	    // console.log(x);
	    if (x === 1) {
	      x = stage.canvas.width;
	    }
	    const y = Math.random() * (stage.canvas.height-50);
	    return [x,y];
	  }
	
	  setVelocity(fish) {
	    // console.log(fish);
	    if (fish.x === 0) {
	      this.fishX = Math.random() * 4;
	      fish.rotation = 180;
	      fish.skewX = 180;
	      fish.x -= fish.width/2;
	    } else {
	      this.fishX = 0 - Math.random() * 4;
	    }
	    if (this.fishX <= 0) {
	      this.fishX -= .5;
	    } else {
	      this.fishX += .5;
	    }
	  }
	
	  draw(stage) {
	    const fish = new createjs.Bitmap("./images/transparent.png");
	    fish.scaleX=this.size;
	    fish.scaleY=this.size;
	    fish.width = 100*this.size;
	    fish.height = 70*this.size;
	    const pos = this.randomPosition.bind(this)(stage);
	    fish.x = pos[0];
	    fish.y = pos[1];
	
	    this.setVelocity.bind(this)(fish);
	    stage.addChild(fish);
	    return fish;
	  }
	
	}
	
	module.exports = Fish;


/***/ },
/* 4 */
/***/ function(module, exports) {

	const Util = {
	  collision (el, hero) {
	    // console.log(hero);
	    let heroCenterX;
	    let fishCenterX;
	    const heroCenterY = hero.hero.y + hero.hero.height/2.2;
	    const fishCenterY = el.fish.y + el.fish.height/2.2;
	    const fishWidth = el.fish.width;
	    const fishHeight = el.fish.height;
	    const heroWidth = hero.hero.width;
	    const heroHeight = hero.hero.height;
	    if (hero.hero.rotation === 0){
	      heroCenterX = hero.hero.x + hero.hero.width/2;
	    } else {
	      heroCenterX = hero.hero.x - hero.hero.width/2;
	    }
	    if (el.fish.rotation === 0){
	      fishCenterX = el.fish.x + el.fish.width/2;
	    } else {
	      fishCenterX = el.fish.x - el.fish.width/2;
	    }
	    if ((Math.abs(heroCenterX - fishCenterX) < (fishWidth/2.5 + heroWidth/2.5)) && (Math.abs(heroCenterY - fishCenterY) < (fishHeight/3 + heroHeight/3))) {
	      return true;
	    } else {
	      return false;
	    }
	  },
	  createFishBorder(el, stage) {
	    const fishWidth = el.fish.width;
	    const fishHeight = el.fish.height;
	    const fishBorder = new createjs.Shape();
	    if (el.fish.rotation === 0) {
	      fishBorder.graphics.beginStroke("white").drawRect((el.fish.x + fishWidth/8), (el.fish.y + fishHeight/6 - fishHeight/20), (fishWidth/8*6), (fishHeight/3*2));
	    } else {
	      fishBorder.graphics.beginStroke("white").drawRect((el.fish.x - (fishWidth/8)), (el.fish.y + fishHeight/6 - fishHeight/20), 0-(fishWidth/8*6), (fishHeight/3*2));
	    }
	    stage.addChild(fishBorder);
	    return fishBorder;
	  },
	  createHeroBorder(hero, stage) {
	    const heroWidth = hero.hero.width;
	    const heroHeight = hero.hero.height;
	    const heroBorder = new createjs.Shape();
	    if (hero.hero.rotation === 0) {
	      heroBorder.graphics.beginStroke("white").drawRect((hero.hero.x + heroWidth/8), (hero.hero.y + heroHeight/6 - heroHeight/20), (heroWidth/8*6), (heroHeight/3*2));
	      // heroBorder.graphics.beginStroke("white").drawRect(hero.hero.x, hero.hero.y, hero.hero.width, hero.hero.height);
	    } else {
	      heroBorder.graphics.beginStroke("white").drawRect((hero.hero.x - heroWidth/8), (hero.hero.y + heroHeight/6 - heroHeight/20), (0-(heroWidth/8*6)), (heroHeight/3*2));
	      // heroBorder.graphics.beginStroke("white").drawRect(hero.hero.x, hero.hero.y, (0-hero.hero.width), (hero.hero.height));
	    }
	    stage.addChild(heroBorder);
	    return heroBorder;
	  },
	  wrap (el, stage) {
	    if (((el.fish.x - el.fish.width/2) > stage.canvas.width) || ((el.fish.x + el.fish.width/2) < 0)) {
	      return true;
	    } else {
	      return false;
	    }
	  }
	};
	
	module.exports = Util;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map