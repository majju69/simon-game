var buttonColours=["red","blue","green","yellow"],gamePattern=[],userClickedPattern=[],level=0,started=false;

function nextSequence()
{
    userClickedPattern=[];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

$(".btn").on("click",function()
{
    var userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

function playSound(colour)
{
    var audio=new Audio("sounds/"+colour+".mp3");
    audio.play();
}

function animatePress(currentColour)
{
    $("#"+currentColour).addClass("pressed");
    setTimeout(function()
    {
        $("#"+currentColour).removeClass("pressed");
    },100);
}

$(document).on("keydown",function()
{
    if(!started)
    {
        $("#level-title").text("Level "+level);
        nextSequence();
        started=true;
    }
});

function checkAnswer(currentLevel)
{
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel])
    {
        console.log("sucess");
        if(userClickedPattern.length===gamePattern.length)
        {
            setTimeout(function()
            {
                nextSequence();
            },1000);
        }
    }
    else
    {
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");
        setTimeout(function()
        {
            $("body").removeClass("game-over");
        },200);
        startOver();
    }
}

function startOver()
{
    level=0;
    gamePattern=[];
    started=false;
}