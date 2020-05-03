import jsonString from "./quizdata.js"

function getQueryVariable(variable: string) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) == variable) {
            return decodeURIComponent(pair[1]);
        }
    }
    console.log('Query variable %s not found', variable);
}

// === VARIABLES THAT DEFINE CURRENT STATE OF QUIZ ===
const quizJson = JSON.parse(jsonString).quiz;
let currentQuestion = 0;
let quizId = getQueryVariable("id");
let answers: Array<string> = [];
// ===================================================


function getQuizIndex(quiz: string): number {
    var index = -1;
    for(var i = 0; i < Object.keys(quizJson).length; i++) {
        if(quizJson[i].id === quiz) {
            index = i;
            break;
        }
    }
    return index;
}

function getQuestionById(quiz: string, questionId: number) {
    var index = getQuizIndex(quiz);
    document.getElementById('question').textContent = quizJson[index].get;
    return quizJson[index].questions[questionId];
}

function getNumberOfQuestions(quiz : string): number {
    var index = getQuizIndex(quiz);
    return Object.keys(quizJson[index].questions).length;
}

function goodAnswer(answer: string): boolean {
    return !isNaN(Number(answer));
}

function onAnswerUpdate() {
    var answerBox = document.getElementById('answer-box') as HTMLTextAreaElement;
    if(answerBox.value.length === 0) {
        answerBox.setAttribute("class", "input is-primary");
        delete answers[currentQuestion];
    }
    else if(!goodAnswer(answerBox.value)) {
        answerBox.setAttribute("class", "input is-danger");
        answers[currentQuestion] = answerBox.value;
    }
    else {
        answerBox.setAttribute("class", "input is-info");
        answers[currentQuestion] = answerBox.value;
    }   
}

function viewQuestionById(quiz: string, questionId: number) {
    var percentDone = 100 * (questionId + 1)  / getNumberOfQuestions(quiz);
    document.getElementById('progress-bar').setAttribute("value", String(percentDone));
    document.getElementById('question').textContent = getQuestionById(quizId, currentQuestion).question;
    document.getElementById('question-name').textContent = "Pytanie " + String(questionId + 1);
    var answerBox = document.getElementById('answer-box') as HTMLTextAreaElement;
    if(typeof answers[questionId] !== 'undefined') {
        answerBox.value = answers[questionId];
    }
    else {
        answerBox.value = "";
    }
    onAnswerUpdate();
}

function viewScore(quiz: string) {
    // empty for now
}

function updateButtons() {
    var prevButton = document.getElementById("button-prev") as HTMLButtonElement;
    if(currentQuestion === 0) {
        prevButton.style.visibility = "hidden";
    }
    else {
        prevButton.style.visibility = "visible";
    }

    var nextButton = document.getElementById("button-next") as HTMLButtonElement;
    if(currentQuestion + 1 === getNumberOfQuestions(quizId)) {
        nextButton.style.visibility = "hidden";
    }
    else {
        nextButton.style.visibility = "visible";
    }
}

function onClickPrevious() {
    if(currentQuestion > 0) {
        currentQuestion--;
    }
    updateButtons();
    viewQuestionById(quizId, currentQuestion);
}

function onClickNext() {
    var button = document.getElementById("button-next") as HTMLButtonElement;
    if(currentQuestion + 1 < getNumberOfQuestions(quizId)) {
        currentQuestion++;
    }
    updateButtons();
    viewQuestionById(quizId, currentQuestion);
}


function onClickFinish() {

}


// === CHANGING WEBSITE CONTENT ===
viewQuestionById(quizId, currentQuestion);
document.getElementById("quiz-name").insertAdjacentHTML('afterbegin', quizId)
document.getElementById("answer-box").addEventListener('input', onAnswerUpdate);
document.getElementById("button-next").addEventListener('click', onClickNext);
document.getElementById("button-prev").addEventListener('click', onClickPrevious);
// ================================



// debug

