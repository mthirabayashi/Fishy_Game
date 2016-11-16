
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
      // fish.rotation = 180;
      // fish.skewX = 180;
      // fish.x += 75;
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
    // console.log(fish);
    createjs.Ticker.addEventListener("tick", handleTick.bind(this));
    function handleTick(e) {
      // console.log(event);
      // console.log(stage.canvas.height);

      // fish.x += this.fishX;
      // if (fish.x > stage.canvas.width) {
      //   fish.x = 0;
      //   stage.removeChild(fish);
      // } else if (fish.x < 0) {
      //   fish.x = stage.canvas.width;
      // }

      stage.update();
    }
    return fish;
  }

  move() {
  }
}

module.exports = Fish;
