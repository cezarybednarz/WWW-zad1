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

function viewQuestionById(quiz: string, questionId: number) {
    var percentDone = 100 * (questionId + 1)  / getNumberOfQuestions(quiz);
    document.getElementById('progress-bar').setAttribute("value", String(percentDone));
    document.getElementById('question').textContent = getQuestionById(quizId, currentQuestion).question;
    document.getElementById('question-name').textContent = "Pytanie " + String(questionId + 1);
}

function viewScore(quiz: string) {
    // empty for now
}

function goodAnswer(answer: string): boolean {
    return !isNaN(Number(answer));
}

function onAnswerUpdate() {
    var answerBox = document.getElementById('answer-box') as HTMLTextAreaElement;
    if(answerBox.value.length === 0) {
        answerBox.setAttribute("class", "input is-primary");
    }
    else if(!goodAnswer(answerBox.value)) {
        answerBox.setAttribute("class", "input is-danger");
    }
    else {
        answerBox.setAttribute("class", "input is-info");
    }   
}

function onClickNext() {
    
}


// === CHANGING WEBSITE CONTENT ===
document.getElementById("quiz-name").insertAdjacentHTML('afterbegin', quizId)
document.getElementById('answer-box').addEventListener('input', onAnswerUpdate);

// ================================



// debug
viewQuestionById(quizId, currentQuestion);

