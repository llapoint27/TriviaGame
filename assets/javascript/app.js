//view to describe the game (css/html)

//start game()

//function to set up timer, execute the timer, for each question

//possible separate function to clear out the timer

//type data structure
//an array of objects

//we need a template for each question: a function that can relate a template for each question. A question and four potential answer. 

//wrong answer, right answer, and time out no answer

var data = [{
    question: 'Wha tis 2 + 2',
    potentialAnswers: [2, 4, 6, 8],
    correctAnswer: 1,
    correctImage: 'https://pkief.gallerycdn.vsassets.io/extensions/pkief/markdown-checkbox/1.3.0/1524392563369/Microsoft.VisualStudio.Services.Icons.Default',
    wrongImage: 'https://www.iconsdb.com/icons/preview/red/x-mark-3-xxl.png',
    qNumber: 1
},
{
    question: 'Wha tis 2 + 8',
    potentialAnswers: [2, 4, 6, 10],
    correctAnswer: 3,
    correctImage: 'https://pkief.gallerycdn.vsassets.io/extensions/pkief/markdown-checkbox/1.3.0/1524392563369/Microsoft.VisualStudio.Services.Icons.Default',
    wrongImage: 'https://www.iconsdb.com/icons/preview/red/x-mark-3-xxl.png',
    qNumber: 1
}];
$(document).on("click", '.clickable', function () {
    console.log('I work');
    console.log($(this).attr('data-id'));
    //add a comparison to show correct answer
});
$('.clickable').on("click", function () {
    console.log('I dont');
});
function renderAnswers(index) {
    var liElements = '';
    for (let i = 0; i < data[index].potentialAnswers.length; i++) {
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
        $('#root').html('<h1>Game Over</h1>');
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
    }, 7000);
}

displayQuestion(startingIndex);







