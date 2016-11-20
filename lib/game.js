const Hero = require("./hero.js");
const Fish = require("./fish.js");
const Util = require("./util");
const $ = require("jquery");
require ('howler');
import * as Cookies from "js-cookie";

class Game {
  constructor(stage) {
    this.hero = [];
    this.fish = [];
    this.borders = [];
    this.createHero(stage);
    this.createFish.bind(this)(stage);
    this.detectCollision(stage);
    //possibly make a high score AND a 3-5 min timer to count down
    // this would allow for a single high score rather than fastest winning times. 
    this.score = 0;
    this.gameOver = false;
    this.mute = false;
    if (Cookies.get('sound') === 'false') {
      this.mute = true;
    }
    this.sound = new Howl({
      src: ['./sounds/Large-Bubble.mp3']
    });
    this.backgroundNoise = new Howl({
      src: ['./sounds/River.mp3'],
      autoplay: true,
      loop: true,
      volume: .1,
      onload: this.initialSound.bind(this)
    });
    this.start.bind(this)(stage);
  }

  initialSound() {
    if (this.mute === true) {
      $('#speaker-icon').addClass('hidden');
      $('#mute-icon').removeClass('hidden');
      this.backgroundNoise.pause();
    }
  }

  updateScore() {
    if (this.gameOver === false) {
      this.score = this.score + 1;
    }
    $('#time').html(Util.timeString(this.score));
  }

  start(stage) {
    $('#speaker-icon').removeClass('hidden');
    $('#mute-icon').click( () => {
      this.mute = false;
      $('#speaker-icon').removeClass('hidden');
      $('#mute-icon').addClass('hidden');
      this.backgroundNoise.play();
      Cookies.set('sound', true);
    });
    $('#speaker-icon').click( () => {
      this.mute = true;
      $('#mute-icon').removeClass('hidden');
      $('#speaker-icon').addClass('hidden');
      this.backgroundNoise.pause();
      Cookies.set('sound', false);
    });
    setInterval(this.updateScore.bind(this), 1000);
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

  inputHighscore() {
    $('.submitHighscore').removeClass('hidden');
    const setHighscore = () => {
      const initials = $('input').val();
      let scoreObject = {};
      scoreObject[this.score] = initials;
      Cookies.set(`${Math.random()}`, scoreObject);
      window.location.reload();
    };
    $($('.submitHighscore')[1]).one('click', (e) => {
      setHighscore.bind(this)();
    });
  }

  detectCollision(stage) {
    createjs.Ticker.timingMode = createjs.Ticker.RAF_SYNCHED;
    createjs.Ticker.setFPS(40);
    createjs.Ticker.addEventListener("tick", handleTick.bind(this));
    function handleTick(e) {
      this.borders.forEach( border => {
        stage.removeChild(border);
      });
      let newFish;
      this.fish.forEach((el, idx) => {
        el.fish.width = el.fish.image.width*el.fish.scaleX;
        el.fish.height = el.fish.image.height*el.fish.scaleX;
        el.fish.x += el.fishX;
        if (Util.wrap(el, stage)) {
          stage.removeChild(el.fish);
          newFish = [].concat(this.fish.splice(0,idx).concat(this.fish.splice(1)));
          this.fish = newFish;
        }
        if (Util.collision(el, this.hero[0])) {
          console.log('collision!');
          if (el.fish.width > this.hero[0].hero.width) {
            this.loseGame.bind(this)(stage);
            return;
          }
          if (this.hero[0].hero.width > (stage.canvas.width*.7)) {
            this.winGame.bind(this)(stage);
            return;
          }
          stage.removeChild(el.fish);
          newFish = [].concat(this.fish.splice(0,idx).concat(this.fish.splice(1)));
          this.fish = newFish;
          this.hero[0].hero.scaleX += .03;
          this.hero[0].hero.scaleY += .03;
          if (this.mute === false) {
            this.sound.play();
          }
        }
      // this.borders = this.borders.concat(Util.createFishBorder(el, stage));

      });
      this.generateFish.bind(this)(stage);
      // this.borders = this.borders.concat(Util.createHeroBorder(this.hero[0], stage));
      stage.update();
    }
  }
  generateFish(stage) {
    if (Math.floor(Math.random() * 12) === 3) {
      if (stage.children.length < 10) {
        const fish = new Fish(stage);
        this.fish = this.fish.concat(fish);
      }
    }
  }

  loseGame(stage) {
    createjs.Ticker.reset();
    const lose = new createjs.Text("Game Over", "64px Arial", "red");
    lose.x = 230;
    lose.y = 190;
    stage.addChild(lose);
    stage.removeChild(this.hero[0].hero);
    stage.update();
    $('#replay').removeClass('hidden');
    this.gameOver = true;
    if (this.mute === false) {
      this.sound.play();
    }
  }

  winGame(stage) {
    createjs.Ticker.reset();
    const win = new createjs.Text("You Won!", "64px Arial", "#05B");
    win.x = 260;
    win.y = 190;
    stage.addChild(win);
    // stage.removeChild(this.hero[0].hero);
    this.fish.forEach((el) => {
      stage.removeChild(el.fish);
    });
    stage.update();
    $('#replay').removeClass('hidden');
    this.gameOver = true;
    this.inputHighscore.bind(this)();
  }

}

module.exports = Game;
