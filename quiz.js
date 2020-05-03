import jsonString from "./quizdata.js";
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
function getQuizIndex(quiz) {
    var index = -1;
    for (var i = 0; i < Object.keys(quizJson).length; i++) {
        if (quizJson[i].id === quiz) {
            index = i;
            break;
        }
    }
    return index;
}
function getQuestionById(quiz, questionId) {
    var index = getQuizIndex(quiz);
    document.getElementById('question').textContent = quizJson[index].get;
    return quizJson[index].questions[questionId];
}
function getNumberOfQuestions(quiz) {
    var index = getQuizIndex(quiz);
    return Object.keys(quizJson[index].questions).length;
}
function viewQuestionById(quiz, questionId) {
    var percentDone = 100 * (questionId + 1) / getNumberOfQuestions(quiz);
    document.getElementById('progress-bar').setAttribute("value", String(percentDone));
    document.getElementById('question').textContent = getQuestionById(quizId, currentQuestion).question;
    document.getElementById('question-name').textContent = "Pytanie " + String(questionId + 1);
}
function viewScore(quiz) {
}
const quizId = getQueryVariable("id");
let quizName = document.getElementById("quiz-name");
quizName.insertAdjacentHTML('afterbegin', quizId);
let currentQuestion = 0;
viewQuestionById(quizId, currentQuestion);
function onNumberChange() {
    console.log("xd");
}
document.getElementById("answer-box").addEventListener("change", onNumberChange);
//# sourceMappingURL=quiz.js.map