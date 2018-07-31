//TODO:

//if timer hits 0 show "Time's Up!" message
//append reset button at end of the game and reset
//if function for unanswered questions
//put timeout when choice/answer is clicked, so you are not waiting 20 seconds for next question


//Define variables
var timeLeft;
var correctAnswers = 0;
var wrongAnswers = 0;
var unanswered = 0;
var userTotalTime = 0;
var userGuess;
var running = false;
var timer;
var postQuestionViewTimer;



//Created the varible 'data' to store each question as an object. Each object will hold the question, array of answers, correct answer, and correct image and image letting you know answer is incorrect. 
var data = [{
    question: "What is Pheobe's twin sister's name",
    potentialAnswers: ["Rachel", "Ursula", "Becky", "Robin"],
    Answer: 1,
    correctImage: "<img src='./assets/images/q1.gif'>",
    wrongImage: "<img class='wrongImage' src='./assets/images/thumbs_down.png'>",

},
{
    question: "What is the 'Joey special'?",
    potentialAnswers: ["roast beef sandwhich", "pepperoni pizza", "hug from Joey", "ordering 2 pizzas at once"],
    Answer: 3,
    correctImage: "<img src='./assets/images/q2.gif'>",
    wrongImage: "<img class='wrongImage' src='./assets/images/thumbs_down.png'>",

},
{
    question: "What does Phoebe change her name to in the final season?",
    potentialAnswers: ["Princess Consuela Bananahammock", "Princess Pheffer Phefferman", "Kitty Kat", "Cindy Crawford"],
    Answer: 0,
    correctImage: "<img src='./assets/images/q3.gif'>",
    wrongImage: "<img class='wrongImage' src='./assets/images/thumbs_down.png'>",

},

// {
//     question: "How many categories of towels does Monica have?",
//     potentialAnswers: [9, "11", 5, 13],
//     Answer: 1,
//     correctImage: "<img src='./assets/images/q4.gif'>",
//     wrongImage: "<img class='wrongImage' src='./assets/images/thumbs_down.png'>",
// },

// {
//     question: "What is Chandler's dad's burlesque show called?",
//     potentialAnswers: ["Viva Las Gaygas", "It's Raining Men", "Vegas Gaygas", "One Lady Show"],
//     Answer: 0,
//     correctImage: "<img src='./assets/images/q5.gif'>",
//     wrongImage: "<img class='wrongImage' src='./assets/images/thumbs_down.png'>",
// },

// {
//     question: "Which country does Chandler tell Janice he’s moving to?",
//     potentialAnswers: ["Turkey", "Brazil", "Yemen", "Bali"],
//     Answer: 2,
//     correctImage: "<img src='./assets/images/q6.gif'>",
//     wrongImage: "<img class='wrongImage' src='./assets/images/thumbs_down.png'>",
// },

// {
//     question: "What is Monica’s biggest pet peeve?",
//     potentialAnswers: ["towels not folded", "unwashed dishes", "being late", "animals dressed as humans"],
//     Answer: 3,
//     correctImage: "<img src='./assets/images/q7.gif'>",
//     wrongImage: "<img class='wrongImage' src='./assets/images/thumbs_down.png'>",
// },

// {
//     question: "What is the word Ross uses to describe a relaxed mental state?",
//     potentialAnswers: ["sashimi", "nigiri", "sushi", "unagi"],
//     Answer: 3,
//     correctImage: "<img src='./assets/images/q8.gif'>",
//     wrongImage: "<img class='wrongImage' src='./assets/images/thumbs_down.png'>",
// },

// {
//     question: "What fruit is Ross allergic to?",
//     potentialAnswers: ["watermelon", "oranges", "kiwi", "pineapple"],
//     Answer: 2,
//     correctImage: "<img src='./assets/images/q9.gif'>",
//     wrongImage: "<img class='wrongImage' src='./assets/images/thumbs_down.png'>",
// },

// {
//     question: "What is the name of Joey's stuffed animal?",
//     potentialAnswers: ["Morice", "Stuwart", "George", "Robert"],
//     Answer: 0,
//     correctImage: "<img src='./assets/images/q10.gif'>",
//     wrongImage: "<img class='wrongImage' src='./assets/images/thumbs_down.png'>",
// },

];

//click start button to start the game..this is the first thing on the page, and game should start after clicking on "start" with instructions here. Hide when start is clicked.  

$("#reset").hide();

//click start button to start game
$("#start").on("click", function () {
    $("#start").hide();
    $("#instructions").hide();
    displayQuestion(startingIndex);


});

//click function that scans the document and recongizes class name 'clickable' and runs the following code within the function. 
// $(".clickable").on("click", function() {})

var startingIndex = 0;

$(document).on("click", ".clickable", function () {

    userGuess = ($(this).attr("data-id"));
    console.log(userGuess);

    var choice = data[startingIndex].potentialAnswers.indexOf(userGuess);
    console.log(choice);

    //add a comparison to show correct answer
    console.log(data[startingIndex].Answer)
    var solution = data[startingIndex];
    if (choice === solution.Answer) {
        correctAnswers++;
        userGuess = " ";
        $("#root").html("<div><p>Correct!</p><br>" + solution.correctImage + "</div>");
        $("#timeLeft").empty();
       
    } else {
        wrongAnswers++;
        userGuess = " ";
        $("#root").html("<div><p>Wrong! The Answer is: " + solution.potentialAnswers[solution.Answer] + "</p><br>" + solution.wrongImage + "</div>");
        $("#timeLeft").empty();

    }
    userGuess = 0;



});




//renderAnswer function creates an list of possible answers on the page. It loops through the index of the answer array.
function renderAnswers(index) {
    var liElements = " ";
    for (var i = 0; i < data[index].potentialAnswers.length; i++) {
        var res = data[index].potentialAnswers[i];
        liElements += '<li data-id="' + res + '" class="clickable">' + res + '</li>';

    }
    console.log('Here are the elements', liElements);
    return liElements;
};


function displayQuestion(index) {
    clearTimeout(postQuestionViewTimer);
    if (!doWeKeepPlaying(index)) {
        var questionTemplate = "<div class='parent'><h3>" + data[index].question + "</h3><ul>" + renderAnswers(index) + "</ul></div>";
        questionTimer();
    }
    else {
        $('#root').html('<h2>Game Over</h2>');
        $(".container").empty();
        $(".container").html("<p> Correct Answers: " + correctAnswers + "</p>" + "<br>" + "<p> Wrong Answers: " + wrongAnswers + "</p>" + "<p> Unanswered: " + unanswered + "<p>");

    }
    $('#root').html(questionTemplate);
};
//quality check, prevents from moving on to the next question
function doWeKeepPlaying(index) {
    return data.length === index
}


function questionTimer() {
timeLeft = 5;
timer = setInterval(function() {
    if(timeLeft === 1) {
        // $("#timeLeft").html("Time's Up");
        clearInterval(timer);
        questionChangeTimer();

    }
    timeLeft--;
    $("#timer").html("Time Remaining: " + timeLeft);
}, 1000);

}

function questionChangeTimer() {
    postQuestionViewTimer = setTimeout(function () {
        clearInterval(timer);
        startingIndex++;
        displayQuestion(startingIndex);    
    }, 2000);

};

$("#reset").append(startingIndex);






