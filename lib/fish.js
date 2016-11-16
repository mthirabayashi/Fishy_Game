
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
