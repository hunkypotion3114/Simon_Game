buttonColours = ["red", "blue", "green", "yellow"]
function playSound(name) {
    url = "sounds/" + name + ".mp3"
    var audio = new Audio(url)
    audio.play()
}
function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed")
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed")
    }, 100);
}

function nextSequence() {
    if ($("h1").text() == "Press A Key to Start" || $("h1").text()=="Game Over, Press Any Key to Restart") {
        $("h1").text("Level " + "0")
        newLevelNumber = 0
    } else {
        level = $("h1").text()
        indexOfSpace = level.indexOf(" ")
        levelNumber = parseInt(level.slice(indexOfSpace + 1, level.length))
        newLevelNumber = levelNumber + 1
        $("h1").text("Level " + String(newLevelNumber))
    }
    randomNumber = Math.round(3 * Math.random())
    console.log(randomNumber)
    randomChosenColour = buttonColours[randomNumber]
    gamePattern.push(randomChosenColour)
    idOfColor = "#" + randomChosenColour
    $(idOfColor).fadeOut(100).fadeIn(50)
    playSound(randomChosenColour)
    return userClickedPattern = []
}

$(document).on("keydown", (e) => {
    if ($("h1").text() == "Press A Key to Start" || $("h1").text()=="Game Over, Press Any Key to Restart") {
        gamePattern = []
       userClickedPattern= nextSequence()
    }
})

$(".btn").on("click", function () {
    userChosenColour = this.id
    userClickedPattern.push(userChosenColour)
    playSound(userChosenColour)
    animatePress(userChosenColour)
    console.log(userClickedPattern)
    console.log(gamePattern)
    checkAnswer(userClickedPattern,gamePattern)
})

function checkAnswer(userClickedPattern, gamePattern){
    indexToCheck = userClickedPattern.length - 1
    if(userClickedPattern[indexToCheck] != gamePattern[indexToCheck]){
        $("h1").text("Game Over, Press Any Key to Restart")
        $("body").css("background-color", "red")
        playSound("wrong")
        setTimeout(() => {
            $("body").css("background-color", "#011F3F")
        }, 200);


    }
    level = $("h1").text()
    indexOfSpace = level.indexOf(" ")
    levelNumber = parseInt(level.slice(indexOfSpace + 1, level.length))
    maxLengthOfUserList = levelNumber+1
    if(userClickedPattern.length == maxLengthOfUserList){
        setTimeout(() => {
            return nextSequence()
        }, 200);
    }
}