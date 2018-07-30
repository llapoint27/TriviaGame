//TODO:
//remove spaces and add dashes to objects above******




//Define variables
var timeLimit = 5;
var correctAnswers = 0;
var wrongAnswers = 0;
var unanswered = 0;
var userTotalTime = 0;
var userGuess;
var running = false;



//Created the varible 'data' to store each question as an object. Each object will hold the question, array of answers, correct answer, and correct image and image letting you know answer is incorrect. 
var data = [{
    question: "What is Pheobe's twin sister's name",
    potentialAnswers: ["Rachel", "Ursula", "Becky", "Robin"],
    Answer: 1,
    correctImage: "<img src='./assets/images/q1.gif'>",
    wrongImage: "<img src='./assets/images/thumbs_down.png'>",
    qNumber: 1
},
{
    question: "What is the 'Joey special'?",
    potentialAnswers: ["roast beef sandwhich", "pepperoni pizza", "hug from Joey", "ordering-2-pizzas-at-once"],
    Answer: 3,
    correctImage: "<img src='./assets/images/q2.gif'>",
    wrongImage: "<img src='./assets/images/thumbs_down.png'>",
    qNumber: 2
},
{
    question: "What does Phoebe change her name to in the final season?",
    potentialAnswers: ["Princess Consuela Bananahammock", "Princess Pheffer Phefferman", "Kitty Kat", "Cindy Crawford"],
    Answer: 0,
    correctImage: "<img src='./assets/images/q3.gif'>",
    wrongImage: "<img src='./assets/images/thumbs_down.png'>",
    qNumber: 3
},

// {
//     question: "How many categories on towels does Monica have?",
//     potentialAnswers: [9, 11, 5, 13],
//     Answer: 0,
//     correctImage: "<img src='./assets/images/q4.gif'>",
//     wrongImage: "<img src='./assets/images/thumbs_down.png'>",
//     qNumber: 4
// },

// {
//     question: "What is Chandler's dad's burlesque show called?",
//     potentialAnswers: ["Viva Las Gaygas", "It's Raining Men", "Vegas Gaygas", "One Lady Show"],
//     Answer: 1,
//     correctImage: "<img src='./assets/images/q5.gif'>",
//     wrongImage: "<img src='./assets/images/thumbs_down.png'>",
//     qNumber: 5
// },

// {
//     question: "Which country does Chandler tell Janice he’s moving to?",
//     potentialAnswers: ["Turkey", "Brazil", "Yemen", "Bali"],
//     Answer: 2,
//     correctImage: "<img src='./assets/images/q6.gif'>",
//     wrongImage: "<img src='./assets/images/thumbs_down.png'>",
//     qNumber: 6
// },

// {
//     question: "What is Monica’s biggest pet peeve?",
//     potentialAnswers: ["her towels not folded", "unwashed dishes", "being late", "aimals dressed as humans"],
//     Answer: 2,
//     correctImage: "<img src='./assets/images/q7.gif'>",
//     wrongImage: "<img src='./assets/images/thumbs_down.png'>",
//     qNumber: 7
// },

// {
//     question: "What is the word Ross uses to describe a relaxed mental state?",
//     potentialAnswers: ["sashimi", "nigiri", "sushi", "unagi"],
//     Answer: 3,
//     correctImage: "<img src='./assets/images/q8.gif'>",
//     wrongImage: "<img src='./assets/images/thumbs_down.png'>",
//     qNumber: 8
// },

// {
//     question: "What fruit is Ross allergic to?",
//     potentialAnswers: ["watermelon", "oranges", "kiwi", "pineapple"],
//     Answer: 2,
//     correctImage: "<img src='./assets/images/q9.gif'>",
//     wrongImage: "<img src='./assets/images/thumbs_down.png'>",
//     qNumber: 9
// },

// {
//     question: "What is the name of Joey's stuffed animal?",
//     potentialAnswers: ["Morice", "Stuwart", "George", "Robert"],
//     Answer: 0,
//     correctImage: "<img src='./assets/images/q10.gif'>",
//     wrongImage: "<img src='./assets/images/thumbs_down.png'>",
//     qNumber: 10
// },

];

//click start button to start the game..this is the first thing on the page, and game should start after clicking on "start" with instructions here. Hide when start is clicked.  


$("#reset").hide();

//click start button to start game
$("#start").on("click", function () {
    $("#start").hide();
    displayQuestion(startingIndex);
    //start timer function

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
    if (choice === data[startingIndex].Answer) {
        correctAnswers++;
        userGuess = " ";
        $("#root").html("<p>Correct!</p>");

    } else {
        wrongAnswers++
        userGuess = " ";
        $("#root").html("<p>Aw, bummer, that's wrong. The Answer is " + choice.Answer + "</p>");
    }
    userGuess = 0;

});


//renderAnswer function creates an list of possible answers on the page. It loops through the index of the answer array.

function renderAnswers(index) {
    var liElements = " ";
    for (var i = 0; i < data[index].potentialAnswers.length; i++) {
        var res = data[index].potentialAnswers[i].replace(/-/g, " ");
        liElements += '<li data-id=' + data[index].potentialAnswers[i] + ' class="clickable">' + res + '</li>';

    }
    return liElements;
};


function displayQuestion(index) {
    if (!doWeKeepPlaying(index)) {
        var questionTemplate = "<div class='parent'><h3>" + data[index].question + "</h3><ul>" + renderAnswers(index) + "</ul></div>";
        questionTimer();
    }
    else {
        $('#root').html('<h2>Game Over</h2>');
        $(".container").empty();
        $(".container").html("<p> Correct Answers: " + correctAnswers + "</p>" + "<br>" + "<p> Wrong Answers: " + wrongAnswers + "</p>");
    }
    $('#root').html(questionTemplate);
};
//quality check, prevents from moving on to the next question
function doWeKeepPlaying(index) {
    return data.length === index
       
}



function questionTimer() {
    timeSet();

    // setTimeout(function () {
    //     timeLimit--
    //     $("#timer").html(timeLimit);
    // }
    // , 1000)

    setTimeout(function () {
        clearTimeout(questionTimer);
        startingIndex++;
        displayQuestion(startingIndex);
        timeLimit = 5;
    }
        , 5000);

    // timeSet();
}

var timeSet = function () {
    while (timeLimit > 0) {
        setTimeout(function () {

            $("#timer").html(timeLimit);
        }
            , 1000)
        timeLimit--;
        console.log(timeLimit);
    }
}






