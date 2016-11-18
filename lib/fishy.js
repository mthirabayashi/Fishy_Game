const Game = require("./game.js");
import $ from "jquery";
const Util = require("./util.js");
import * as Cookies from "js-cookie";

document.addEventListener("DOMContentLoaded", () => {
  $('.submitHighscore').addClass('hidden');
  let allScores = Cookies.getJSON();
  let highscores = [];
  for (let key in allScores) {
    if (key !== 'sound') {
      highscores = highscores.concat(allScores[key]);
    }
  }
  highscores = highscores.sort(function(a,b) {
    return (+Object.keys(a)) - (+Object.keys(b));
  });
  if (highscores.length > 5) {
    highscores = highscores.splice(0,5);
  }
  //order highscores by smallest to greatest
  //smallest being the fastest times
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

  $('#replay').addClass('hidden');
  $('#speaker-icon').addClass('hidden');
  $('#mute-icon').addClass('hidden');

  $('#replay').click( () => {
    window.location.reload();
  });

  $('#play').click( () => {
    $('#play').addClass('hidden');
    stage.removeAllChildren();
    $('#instructions').addClass('hidden');
    const game = new Game(stage);
  });
});
