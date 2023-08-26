//Color picker
let buttonColours = ["red", "blue", "green", "yellow"];

let gamePattern = []; //new sets of randomized color na clinick

let userClickedPattern = []; //Laman neto is ung last na mga clinick mong colors

let level = 0;

let started = false;

let repeater = 0;

function soundEffects(colors){ //sound effects 
    let musicColor = new Audio("sounds/"+colors+".mp3");
    musicColor.play();
}

function animatePress(currentColour){ // animation press with delay
   $("#" + currentColour).addClass("pressed");
   setTimeout(function(){
    $("#" + currentColour).removeClass("pressed");}, 100);
}

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel]===gamePattern[currentLevel]){
        if (gamePattern.length === userClickedPattern.length){
            setTimeout(function(){nextSequence();}, 1000);        
        }
    }
    else{
        soundEffects("wrong");
        $("body").css("background-color", "red");
        $("h1").text("Game Over, Press A Key to Restart again");
        setTimeout(function(){
            $("body").css("background-color", "#793FDF");}, 100);
        startOver();
    }
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}


let nextSequence = () => { //color randomizer with number randomizer(0 to 4)
    userClickedPattern = [];
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour); // taga push ng color dun sa array gp = 5

    animatePress(randomChosenColour);
    soundEffects(randomChosenColour);
    // repeater = 0;
    // setTimeout(() => {
    //     while (repeater < gamePattern.length){
    //         animatePress(gamePattern[repeater]);
    //         soundEffects(gamePattern[repeater]);
    //         repeater++;
    //     }
    // }, 1000);
 
    $("#level-title").text("Level " + level);
    level++;
    
}

$(document).on("keypress", function(event){ //event starter
    console.log(event);
    if(event.key == 'a' && !started){
        setTimeout(() => {nextSequence();}, 200);
        started = true;
    }
});

$(".btn").on("click", function(){ //handler function //NOTE KEYDOWN IS ONLY FOR KEYBOARD // for button detection 
    let userChosenColour = $(this).attr("id"); 
    userClickedPattern.push(userChosenColour);
    animatePress(userChosenColour);
    soundEffects(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
    console.log(gamePattern);
    console.log(userClickedPattern);

    // console.log(userChosenColour);
});

