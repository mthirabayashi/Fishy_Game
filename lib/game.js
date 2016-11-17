const Hero = require("./hero.js");
const Fish = require("./fish.js");
const Util = require("./util");
const $ = require("jquery");

class Game {
  constructor(stage) {
    // this.draw(stage);
    this.hero = [];
    this.fish = [];
    this.borders = [];
    this.createHero(stage);
    this.createFish.bind(this)(stage);
    this.detectCollision(stage);
    // this.start(stage);
  }

  // init() {
  //
  // }

  start(stage) {
    $('#replay').addClass('hidden');
    $('#replay').click( () => {
      console.log('replay game');
      stage.removeAllChildren();
      // createjs.Ticker.init();
      stage.update();
      new Game(stage);
    });
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
            lose.x = 280;
            lose.y = 200;
            stage.addChild(lose);
            stage.removeChild(this.hero[0].hero);
            stage.update();
            $('#replay').removeClass('hidden');
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
            $('#replay').removeClass('hidden');
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
