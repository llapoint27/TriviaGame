
//Define variables
var timeLimit = 15;
var correctAnswers = 0;
var wrongAnswers = 0;
var unanswered = 0;
var userTotalTime = 0;
var userGuess;


//_______________________________

//Created the varible 'data' to store each question as an object. Each object will hold the question, array of answers, correct answer, and correct image and image letting you know answer is incorrect. 
var data = [{
    //question no. 1
    question: "What is Pheobe's twin sister's name",
    potentialAnswers: ["Rachel", "Ursula", "Becky", "Robin"],
    Answer: 1,
    correctImage: 
    wrongImage: "https://www.iconsdb.com/icons/preview/red/x-mark-3-xxl.png",
    qNumber: 1
},
//question no. 2 
{
    question: "What is the 'Joey special'?",
    potentialAnswers: ["roast beef sandwhich", "pepperoni pizza", "hug from Joey", "rrdering 2 pizzas at once"],
    Answer: 3,
    correctImage: 
    wrongImage: "https://www.iconsdb.com/icons/preview/red/x-mark-3-xxl.png",
    qNumber: 2

    //question no 3.
},
{
    question: "What does Phoebe change her name to in the final season?",
    potentialAnswers: ["Princess Consuela Bananahammock", "Princess Pheffer Phefferman", "Kitty Kat", "Cindy Crawford"],
    Answer: 0,
    correctImage: 
    wrongImage: "https://www.iconsdb.com/icons/preview/red/x-mark-3-xxl.png",
    qNumber: 3
}

{
    question: "How many categories on towels does Monica have?",
    potentialAnswers: ["Viva Las Gaygas", "It's Raining Men", "Vegas Gaygas", "One Lady Show"],
    Answer: 0,
    correctImage: 
    wrongImage: "https://www.iconsdb.com/icons/preview/red/x-mark-3-xxl.png",
    qNumber: 4

}

{
    question: "What is Chandler's dad's burlesque show called?",
    potentialAnswers: [9, 11, 5, 13],
    Answer: 1,
    correctImage:
    wrongImage: "https://www.iconsdb.com/icons/preview/red/x-mark-3-xxl.png",
    qNumber: 5


}

{
    question: "Which country does Chandler tell Janice he’s moving to?",
    potentialAnswers: ["Turkey", "Brazil", "Yemen", "Bali"],
    Answer: 2,
    correctImage:
    wrongImage: "https://www.iconsdb.com/icons/preview/red/x-mark-3-xxl.png",
    qNumber: 6


}

{
    question: "What is Monica’s biggest pet peeve?",
    potentialAnswers: ["Her towels not folded", "Uncleanded dishes", "Being later", "Animals dressed as humans"],
    Answer: 2,
    correctImage:
    wrongImage: "https://www.iconsdb.com/icons/preview/red/x-mark-3-xxl.png",
    qNumber: 7

}





];

//click start button to start the game..this is the first thing on the page, and game should start after clicking on "start" with instructions here. Hide when start is clicked.  
$("#reset").hide();

$("#start").on("click", function () {
    $("#start").hide();
    displayQuestion();
    renderAnswers();

})


//click function that scans the document and recongizes class name 'clickable' and runs the following code within the function. 
$(document).on("click", '.clickable', function () {
    userGuess = ($(this).attr('data-id'));
    console.log('I work');
    console.log(userGuess);

    //add a comparison to show correct answer
    if (userGuess === data.Answer) {
        correctAnswers++;
        userGuess = " ";
        $("#root").html("<p>Correct!</p>");

    } else {
        wrongAnswers++
        userGuess = " ";
        $("#root").html("<p>Aw, bummer, that's wrong. The Answer is " + data.Answer + "</p>");
    }

});


//renderAnswer function creates an list of possible answers on the page. It loops through the index of the answer array.
function renderAnswers(index) {
    var liElements = " ";
    for (var i = 0; i < data[index].potentialAnswers.length; i++) {
        liElements += '<li data-id=' + data[index].potentialAnswers[i] + ' class="clickable">' + data[index].potentialAnswers[i] + '</li>';
    }
    return liElements;
};

var startingIndex = 0;

function displayQuestion(index) {
    if (!doWeKeepPlaying(index)) {
        var questionTemplate = "<div class='parent'><h3>" + data[index].question + "</h3><ul>" + renderAnswers(index) + "</ul></div>";
        questionTimer();
    }
    else {
        $('#root').html('<h2>Game Over</h2>');
        // alert("You're out of time!");
    }
    $('#root').html(questionTemplate);
};
//quality check, prevents from moving on to the next question
function doWeKeepPlaying(index) {
    return data.length === index;
}

function questionTimer() {
    setTimeout(function () {
        clearTimeout(questionTimer);
        startingIndex++;
        displayQuestion(startingIndex);
    }
        , 10000);
}

//displaying my timer, and counting down from 15 seconds. //NEED TO STOP THIS TIMER
function startTimer(duration, display) {
    var timer = duration, seconds;
    setInterval(function () {

        seconds = parseInt(timer % 60, 10);
        seconds = seconds < 10 ? "0" + seconds : seconds;
        display.text("Time Remaining :" + seconds);

        if (--timer < 0) {
            timer = duration;
        }
    }, 1000);
}

jQuery(function ($) {
    var thirtySecs = 60 * .25,
        display = $('#time');
    startTimer(thirtySecs, display);
});

function stop() {
	clearInterval();
}
stop(startTimer);



displayQuestion(startingIndex);







