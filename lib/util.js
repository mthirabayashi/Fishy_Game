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
    } else {
      heroBorder.graphics.beginStroke("white").drawRect((hero.hero.x - heroWidth/8), (hero.hero.y + heroHeight/6 - heroHeight/20), (0-(heroWidth/8*6)), (heroHeight/3*2));
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
  },
  timeString (time) {
    let timeString;
    if (time < 10) {
      timeString = '00:0' + `${time}`;
    } else if (time < 60) {
      timeString = '00:' + `${time}`;
    } else {
      const minutes = Math.floor(time/60);
      const seconds = time - (minutes*60);
      if (minutes < 10) {
        timeString = `0${minutes}:`;
      } else {
        timeString = `${minutes}`;
      }
      if (seconds < 10) {
        timeString += `0${seconds}`;
      } else {
        timeString += `${seconds}`;
      }
    }
    return timeString;
  }
};

module.exports = Util;
