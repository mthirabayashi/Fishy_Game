const Game = require("./game.js");
// const $ = require("jquery");
import $ from "jquery";
const Util = require("./util.js");
// const Cookies = require("js-cookie");
// import * as Cookies from "js-cookie";
import * as Cookies from "js-cookie";

document.addEventListener("DOMContentLoaded", () => {
  $('.submitHighscore').addClass('hidden');

  // Cookies.set('test', 1, {expires: 7 });
  // Cookies.set('name', 'value', { expires: 7 });
  console.log(Cookies.get());
  let allScores = Cookies.get();
  let highscores = [];
  for (let key in allScores) {
    highscores = highscores.concat(allScores[key]);
  }
  // highscores.sort();
  highscores = highscores.sort(function(a,b) {
    return (+a) - (+b);
  });
  if (highscores.length > 5) {
    highscores = highscores.splice(0,5);
  }
  //order highscores by smallest to greatest
  for (let i = 0; i < highscores.length; i++) {
    $(`#highscores li:nth-child(${i+1})`).text(Util.timeString(highscores[i]));
  }

  const canvas = document.getElementById("canvas");
  const stage = new createjs.Stage(canvas);

  const title = new createjs.Text('Fishy', "100px Arial", "#e80000");
  title.x = 260;
  title.y = 110;
  stage.addChild(title);
  stage.update();

  $('#instructions').click( () => {
    stage.removeAllChildren();
    $('#play').removeClass('hidden');
    const howToPlay = new createjs.Text('How to Play', "42px Arial", "#05B");
    const movement = new createjs.Text("Use 'w', 'a', 's', 'd' to move", "28px Arial", "#201");
    const directions = new createjs.Text("Eat the smaller fish to grow bigger while \navoiding getting eaten by the larger fish", "18px Arial", "#201");

    howToPlay.x = 275;
    howToPlay.y = 120;
    movement.x = 220;
    movement.y = 200;
    directions.x = 220;
    directions.y = 240;
    stage.addChild(howToPlay);
    stage.addChild(movement);
    stage.addChild(directions);
    stage.update();
    $('#instructions').addClass('hidden');
  });

  $('#replay').addClass('hidden');



  // const game = new Game(stage);
  $('#replay').click( () => {
    // console.log('replay game');
    // stage.clear();
    // stage.removeAllChildren();
    // // createjs.Ticker.init();
    // stage.update();
    // stage = new createjs.Stage(canvas);
    // new Game(stage);
    window.location.reload();
  });

  $('#play').click( () => {
    $('#play').addClass('hidden');
    stage.removeAllChildren();
    $('#instructions').addClass('hidden');
    const game = new Game(stage);
  });
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
