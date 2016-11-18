const Game = require("./game.js");
import $ from "jquery";
const Util = require("./util.js");
import * as Cookies from "js-cookie";

document.addEventListener("DOMContentLoaded", () => {
  $('.submitHighscore').addClass('hidden');
  let allScores = Cookies.getJSON();
  let highscores = [];
  for (let key in allScores) {
    highscores = highscores.concat(allScores[key]);
  }
  highscores = highscores.sort(function(a,b) {
    return (+Object.keys(a)) - (+Object.keys(b));
  });
  if (highscores.length > 5) {
    highscores = highscores.splice(0,5);
  }
  //order highscores by smallest to greatest
  for (let i = 0; i < highscores.length; i++) {
    const key = Object.keys(highscores[i]);
    let score = Util.timeString(key);
    score += ` - ${highscores[i][key]}`;
    $(`#highscores li:nth-child(${i+1})`).text(score);
  }

  $('#reset-times').click( e => {
    for (let i in Cookies.get()) {
      Cookies.remove(i);
      window.location.reload();
    }
  });

  const canvas = document.getElementById("canvas");
  const stage = new createjs.Stage(canvas);
  // const title = new createjs.Text('Fishy', "100px Arial", "#e80000");
  // title.x = 260;
  // title.y = 110;
  // stage.addChild(title);
  // stage.update();

  // $('#instructions').click( () => {
  //   stage.removeAllChildren();
  //   $('#play').removeClass('hidden');
  //   const howToPlay = new createjs.Text('How to Play', "42px Arial", "#05B");
  //   const movement = new createjs.Text("Use 'w', 'a', 's', 'd' to move", "28px Arial", "#201");
  //   const directions = new createjs.Text("Eat the smaller fish to grow bigger while \navoiding getting eaten by the larger fish", "18px Arial", "#201");
  //
  //   howToPlay.x = 275;
  //   howToPlay.y = 120;
  //   movement.x = 220;
  //   movement.y = 200;
  //   directions.x = 220;
  //   directions.y = 240;
  //   stage.addChild(howToPlay);
  //   stage.addChild(movement);
  //   stage.addChild(directions);
  //   stage.update();
  //   $('#instructions').addClass('hidden');
  // });

  $('#replay').addClass('hidden');
  $('#speaker-icon').addClass('hidden');
  $('#mute-icon').addClass('hidden');

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
});
