
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

    stage.addChild(hero);

    key('left, a', () => {
      if (this.heroX > -8) {
        this.heroX -= 2.0;
        if (this.hero.rotation > 0) {
          this.hero.rotation = 0;
          this.hero.skewX = 0;
          this.hero.x -= (this.hero.image.width*this.hero.scaleX);
        }
      }
    });
    key('right, d', () => {
      if (this.heroX < 8) {
        this.heroX += 2.0;
        if (this.hero.rotation === 0) {
          this.hero.rotation = 180;
          this.hero.skewX = 180;
          this.hero.x += (this.hero.image.width*this.hero.scaleX);
        }
      }
    });
    key('up, w', () => {
      if (this.heroY > -8) {
        this.heroY -= 2.0;
      }
    });
    key('down, s', () => {
      if (this.heroY < 8) {
        this.heroY += 2.0;
      }
    });

    createjs.Ticker.addEventListener("tick", handleTick.bind(this));
    function handleTick(e) {
      e.preventDefault();
      hero.x += this.heroX;
      hero.y += this.heroY;
      hero.width = hero.image.width * hero.scaleX;
      hero.height = hero.image.height * hero.scaleY;
      const heroCenterX = hero.x + hero.width/2;
      const heroCenterY = hero.y + hero.height/2;
      if (this.hero.rotation===0){
        if (heroCenterX > stage.canvas.width) {
          hero.x = 0;
        } else if (heroCenterX < 0) {
          hero.x = stage.canvas.width - hero.width/2;
        }
      } else {
        if (hero.x - hero.width/2 > stage.canvas.width) {
          hero.x = hero.width/2;
        } else if (heroCenterX < 0) {
          hero.x = stage.canvas.width - hero.width/2;
        }
      }

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

}

module.exports = Hero;
