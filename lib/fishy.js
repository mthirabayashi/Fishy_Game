const Game = require("./game.js");

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
