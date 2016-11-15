const Hero = require("./hero.js");
const Fish = require("./fish.js");

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
