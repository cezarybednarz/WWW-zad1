import jsonString from "./quizdata.js"

const quizJson = JSON.parse(jsonString).quiz;

function getQueryVariable(variable) {
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

function viewQuestion(quiz: string, questionId: number) {
    var percentDone = 100 * questionId / getNumberOfQuestions(quiz);
    document.getElementById("progress-bar").setAttribute("value", String(percentDone));
    document.getElementById('question').textContent = getQuestionById(quizId, currentQuestion).question;
}

const quizId = getQueryVariable("id");
let quizName = document.getElementById("quiz-name");
quizName.insertAdjacentHTML('afterbegin', quizId)




let currentQuestion = 0;
viewQuestion(quizId, currentQuestion);


