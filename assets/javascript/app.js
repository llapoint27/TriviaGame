//TODO:
//if function for unanswered questions, I need to write a function to calculate the unaswered questions and diplay at the end of the game (with the correct and incorrect answers)


//Define variables
var timeLeft;
var correctAnswers = 0;
var wrongAnswers = 0;
var unanswered = 0;
var userTotalTime = 0;
var userGuess;
var timer;
var postQuestionViewTimer;

//This var 'data' stores each question as an object. Each object will hold the question, array of potential answers, correct answer, and correct image and image letting you know answer is incorrect.
var data = [{
    question: "What is Pheobe's twin sister's name",
    potentialAnswers: ["Rachel", "Ursula", "Becky", "Robin"],
    Answer: 1,
    correctImage: "<img src='./assets/images/q1.gif'>",
    wrongImage: "<img class='wrongImage' src='./assets/images/thumbs_down.png'>",

},
{
    question: "What is the 'Joey Special'?",
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

{
    question: "How many categories of towels does Monica have?",
    potentialAnswers: [9, "11", 5, 13],
    Answer: 1,
    correctImage: "<img src='./assets/images/q4.gif'>",
    wrongImage: "<img class='wrongImage' src='./assets/images/thumbs_down.png'>",
},

{
    question: "What is Chandler's dad's burlesque show called?",
    potentialAnswers: ["Viva Las Gaygas", "It's Raining Men", "Vegas Gaygas", "One Lady Show"],
    Answer: 0,
    correctImage: "<img src='./assets/images/q5.gif'>",
    wrongImage: "<img class='wrongImage' src='./assets/images/thumbs_down.png'>",
},

{
    question: "Which country does Chandler tell Janice he’s moving to?",
    potentialAnswers: ["Turkey", "Brazil", "Yemen", "Bali"],
    Answer: 2,
    correctImage: "<img src='./assets/images/q6.gif'>",
    wrongImage: "<img class='wrongImage' src='./assets/images/thumbs_down.png'>",
},

{
    question: "What is Monica’s biggest pet peeve?",
    potentialAnswers: ["towels not folded", "unwashed dishes", "being late", "animals dressed as humans"],
    Answer: 3,
    correctImage: "<img src='./assets/images/q7.gif'>",
    wrongImage: "<img class='wrongImage' src='./assets/images/thumbs_down.png'>",
},

{
    question: "What is the word Ross uses to describe a relaxed mental state?",
    potentialAnswers: ["sashimi", "nigiri", "sushi", "unagi"],
    Answer: 3,
    correctImage: "<img src='./assets/images/q8.gif'>",
    wrongImage: "<img class='wrongImage' src='./assets/images/thumbs_down.png'>",
},

{
    question: "What fruit is Ross allergic to?",
    potentialAnswers: ["watermelon", "oranges", "kiwi", "pineapple"],
    Answer: 2,
    correctImage: "<img src='./assets/images/q9.gif'>",
    wrongImage: "<img class='wrongImage' src='./assets/images/thumbs_down.png'>",
},

{
    question: "What is the name of Joey's stuffed animal?",
    potentialAnswers: ["Morice", "Stuwart", "George", "Robert"],
    Answer: 0,
    correctImage: "<img src='./assets/images/q10.gif'>",
    wrongImage: "<img class='wrongImage' src='./assets/images/thumbs_down.png'>",
},

];

$(document).ready(function() {

$("#reset").hide();

//click start button to start game
$(document).on("click", "#start", function () {
    $("#start").hide();
    $("#instructions").hide();
    displayQuestion(startingIndex);



});

//click function that scans the document and recongizes class name 'clickable' and runs the following code within the function.

var startingIndex = 0;


$(document).on("click", ".clickable", function () {
    $("#start").hide();
    userGuess = ($(this).attr("data-id"));
    console.log(userGuess);
    clearInterval(timer);
    questionChangeTimer();

    var choice = data[startingIndex].potentialAnswers.indexOf(userGuess);
    console.log(choice);

    //add a comparison to show correct answer
    console.log(data[startingIndex].Answer)
    var solution = data[startingIndex];
    if (choice === solution.Answer) {
        correctAnswers++;
        userGuess = "";
        $("#root").html("<div><p>Correct!</p>" + solution.correctImage + "</div>");

        //or if the correct is not picked, then execute the following code:
    } else {
        wrongAnswers++;
        userGuess = " ";
        $("#root").html("<div><p>Wrong! The Answer is: " + solution.potentialAnswers[solution.Answer] + "</p><br>" + solution.wrongImage + "</div>");

    }
    userGuess = 0;


});

//creates and displays an list of possible answers
function renderAnswers(index) {
    var liElements = " ";
    for (var i = 0; i < data[index].potentialAnswers.length; i++) {
        var res = data[index].potentialAnswers[i];
        liElements += '<li data-id="' + res + '" class="clickable">' + res + '</li>';
    }
    console.log('Here are the elements', liElements);
    return liElements;
};

//function that displays the question (question template)
function displayQuestion(index) {
    clearTimeout(postQuestionViewTimer);
    if (!doWeKeepPlaying(index)) {
        var questionTemplate = "<div class='parent'><h3>" + data[index].question + "</h3><ul>" + renderAnswers(index) + "</ul></div>";
        questionTimer();
    }

    else {
        // $(".container").empty();
        $("#root").html("<div id='game-end'><p>Game over! Your results: " + "<p> Correct Answers: " + correctAnswers + "</p>" + "<p> Wrong Answers: " + wrongAnswers + "</p>" + "<p> Unanswered: " + unanswered + "<p>" +
            "<button id='reset'>Play Again!</button></div>");


        $("#reset").on("click", function () {
          console.log('I was clicked')
            $("#reset").hide();
            $("#instructions").hide();
            var startButton = '<button class="btn btn-success" id="start">Start Game!</button>';
            $('#game-end').hide();
            $('#button-holder').append(startButton);
            startingIndex = 0;


        });

    }

    $('#root').html(questionTemplate);

};

//quality check, function to run through full index of questions
function doWeKeepPlaying(index) {
    return data.length === index

}

//each question will run a timer of 15 seconds
function questionTimer() {
    timeLeft = 16;
    timer = setInterval(function () {
        if (timeLeft === 1) {
            clearInterval(timer);
            questionChangeTimer();
            $("#timer").html("Time's up!");

        }
        timeLeft--;
        $("#timer").html("Time Remaining: " + timeLeft);
    }, 1000);

}

//there will be 2 seconds between each question
function questionChangeTimer() {
    postQuestionViewTimer = setTimeout(function () {
        clearInterval(timer);
        startingIndex++;
        displayQuestion(startingIndex);
    }, 2000);

};

});