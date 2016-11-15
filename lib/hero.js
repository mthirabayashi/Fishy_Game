
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
