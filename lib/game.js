const Hero = require("./hero.js");
const Fish = require("./fish.js");

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
      // console.log(fish.fish);
      // this.fish.alpha = 0;
      // console.log(fish.fish.alpha);
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
      this.borders.forEach( border => {
        stage.removeChild(border);
      });
      let newFish;
      this.fish.forEach((el, idx) => {
        el.fish.width = el.fish.image.width*el.fish.scaleX;
        el.fish.height = el.fish.image.height*el.fish.scaleX;
        // debugger;
        // console.log(idx);
        // console.log(el.fish.scaleX);
        // console.log(this.hero[0].hero.x);
        // console.log(el.fish);
        // console.log(el.fish.width);
        // const hitbox = new createjs.Rectangle(el.fish.x, el.fish.y, el.fish.width, el.fish.height);
        // stage.addChild(hitbox);
        // debugger
        el.fish.x += el.fishX;
        // if (el.fish.x > stage.canvas.width) {
        //   stage.removeChild(el.fish);
        //   newFish = [].concat(this.fish.splice(0,idx).concat(this.fish.splice(idx+1)));
          // this.fish = newFish;

        // } else if (el.fish.x < 0) {
        //   stage.removeChild(el.fish);
        //   newFish = [].concat(this.fish.splice(0,idx).concat(this.fish.splice(idx+1)));
          // this.fish = newFish;
        // }
        // stage.update();
        // console.log(this.hero[0].hero.width);
        // let pt = el.fish.localToLocal(100,0,this.hero[0].hero);
        // console.log(pt);
        // console.log(this.hero[0].hero.hitTest(pt.x, pt.y));
        // console.log(Math.abs(this.hero[0].hero.x - el.fish.x));
        const fishCenterX = el.fish.x + el.fish.width/2;
        const fishCenterY = el.fish.y + el.fish.height/2;
        let heroCenterX;
        // let heroCenterY;
        if (this.hero[0].hero.rotation === 0){
          heroCenterX = this.hero[0].hero.x + this.hero[0].hero.width/2;
        } else {
          heroCenterX = this.hero[0].hero.x - this.hero[0].hero.width/2;
        }
        // const heroCenterX = this.hero[0].hero.x + this.hero[0].hero.width/2;
        const heroCenterY = this.hero[0].hero.y + this.hero[0].hero.height/2;
        // debugger
        const fishWidth = el.fish.width/1.4;
        const fishHeight = el.fish.height/1.35;
        const heroWidth = this.hero[0].hero.width/1.4;
        const heroHeight = this.hero[0].hero.height/1.35;


        if ((Math.abs(heroCenterX - fishCenterX) < ((fishWidth > heroWidth ? (fishWidth) : (heroWidth)))) && (Math.abs(heroCenterY - fishCenterY) < (fishHeight > heroHeight ? fishHeight : heroHeight))) {
          console.log('collision!');
          // el.fish.x += 100000;
          // el.fish.y += 100000;
          // debugger
          stage.removeChild(el.fish);
          newFish = [].concat(this.fish.splice(0,idx).concat(this.fish.splice(1)));
          // console.log(newFish);
          // debugger
          this.fish = newFish;
          this.hero[0].hero.scaleX += .02;
          this.hero[0].hero.scaleY += .02;
        }
      // if ((Math.abs(el.fish.x - this.hero[0].hero.x) < 50) && (Math.abs(el.fish.y - this.hero[0].hero.y) < 50)) {
      //     console.log('collision!');
      //     el.fish.x += 100000;
      //     stage.removeChild(el.fish);
      //     this.hero[0].hero.scaleX += .05;
      //     this.hero[0].hero.scaleY += .05;
      // }
      const fishBorder = new createjs.Shape();
      fishBorder.graphics.beginStroke("white").drawRect(el.fish.x, el.fish.y, el.fish.width, el.fish.height);
      stage.addChild(fishBorder);
      this.borders = this.borders.concat(fishBorder);

      });
      // debugger
      if (newFish) {
        // this.fish = newFish;
      }
      if (Math.floor(Math.random() * 15) === 3) {
        // console.log(stage.children);
        if (stage.children.length < 15) {
          const fish = new Fish(stage);
          this.fish = this.fish.concat(fish);
        }
      }
      const heroBorder = new createjs.Shape();
      if (this.hero[0].hero.rotation === 0) {
        heroBorder.graphics.beginStroke("white").drawRect(this.hero[0].hero.x, this.hero[0].hero.y, this.hero[0].hero.width, this.hero[0].hero.height);
      } else {
        heroBorder.graphics.beginStroke("white").drawRect(this.hero[0].hero.x, this.hero[0].hero.y, (0-this.hero[0].hero.width), (this.hero[0].hero.height));
      }
      stage.addChild(heroBorder);
      this.borders = this.borders.concat(heroBorder);
      stage.update();
    }
  }

}

module.exports = Game;
