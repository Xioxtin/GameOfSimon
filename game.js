var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var hasStarted = false;
var level = 1;
var sequenceFailed = false;
var highScore = 0;

function nextSequence(){
  // push color into gamePattern
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  console.log("gamePattern: " + gamePattern);
  console.log("userClickedPattern: " + userClickedPattern);
  userClickedPattern = [];
  sequenceFailed = false;
};

function showNewPatern() {
  var color = gamePattern[gamePattern.length - 1];
  var object = $("#" + color);
  makeSound(color);
  animatePress("#"+color);
}

function makeSound(color) {
  switch (color) {
    case "green":
      var greenS = new Audio("sounds/green.mp3");
      greenS.play();
      break;
    case "red":
      var redS = new Audio("sounds/red.mp3");
      redS.play();
      break;
    case "yellow":
      var yellowS = new Audio("sounds/yellow.mp3");
      yellowS.play();
      break;
    case "blue":
      var blueS = new Audio("sounds/blue.mp3");
      blueS.play();
      break;
    default:
      var wrong = new Audio("sounds/wrong.mp3");
      wrong.play();
  }
}

function handler(choice) {
  var userChosenColor = choice.id;
  userClickedPattern.push(userChosenColor);
};

function animatePress(currentColor) {
  const opacityLessAnimation = [{
    opacity: 0.1,
  }];

  const opacityTiming = {
    duration: 250,
  };

  $(currentColor).addClass("pressed");
    setTimeout(function() {
    $(currentColor).removeClass("pressed");
  }, 100);
}

function correctSignNshowNewPattern() {
  $("h1").html("CORRECT!");
  level ++;
  highScoreSetter();
  setTimeout(function(){
    $("h1").html("level: " + level);
    showNewPatern();
  }, 2000);
}

function gameOver() {
  $("h1").html("Game Over :(");
  $(".high-score").addClass("big-high-score");
  setTimeout(function(){
    level = 1;
    $("#level-title").text("level: " + level);
    $(".high-score").removeClass("big-high-score");
    gamePattern = [];
    nextSequence();
    showNewPatern();
  }, 3000);
}

function removeGameDescription() {
  $(".description").slideUp();
}

function wrongSequence() {
  makeSound();
  $(".body").css("background-color", "red");
  setTimeout(function(){
    $(".body").css("background-color", "#011F3F");
  }, 150);
}

function firstSequence() {
  setTimeout(function(){
    if (hasStarted === false) {
      nextSequence();
      hasStarted = true;
      $("#level-title").text("level: " + level);
      showNewPatern();
    };
  }, 1500);
}

function patternChecker() {
  for (var i=0; i<userClickedPattern.length; i++) {
    if (userClickedPattern[i] !== gamePattern[i]) {
      sequenceFailed = true;
      break;
    };
  };

  if (userClickedPattern.length === gamePattern.length && sequenceFailed !== true) {
    nextSequence();
    correctSignNshowNewPattern();
  };
}

function highScoreSetter() {
  if (highScore < level) {
    highScore = level - 1;
  };
  $(".high-score").html("Ur high score: " + highScore);
}

$(document).click(function() {
  removeGameDescription();
  highScoreSetter();
  firstSequence();
});

$(".btn").click(function() {
  if (hasStarted === false) {
    wrongSequence();
  }else {
    makeSound(this.id);
    animatePress(this);
    handler(this);
    patternChecker();
    if (sequenceFailed === true) {
      wrongSequence();
      gameOver();
    };
  };
});
