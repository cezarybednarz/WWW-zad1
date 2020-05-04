import jsonString from "./quizdata.js";
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
const quizJson = JSON.parse(jsonString).quiz;
let currentQuestion = 0;
let quizId = getQueryVariable("id");
let answers = [];
let seconds = [];
let quizFinished = false;
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
function getPenalty(quiz) {
    return parseInt(quizJson[getQuizIndex(quiz)].penalty);
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
function goodAnswer(answer) {
    return !isNaN(Number(answer));
}
function getNumberOfGoodAnswers(quiz) {
    var goodAnswers = 0;
    for (var i = 0; i < getNumberOfQuestions(quizId); i++) {
        if (goodAnswer(answers[i])) {
            goodAnswers++;
        }
    }
    return goodAnswers;
}
function onAnswerUpdate() {
    var answerBox = document.getElementById('answer-box');
    if (answerBox.value.length === 0) {
        answerBox.setAttribute("class", "input is-primary");
        delete answers[currentQuestion];
    }
    else if (!goodAnswer(answerBox.value)) {
        answerBox.setAttribute("class", "input is-danger");
        answers[currentQuestion] = answerBox.value;
    }
    else {
        answerBox.setAttribute("class", "input is-info");
        answers[currentQuestion] = answerBox.value;
    }
    document.getElementById("completed-tasks").textContent = String(getNumberOfGoodAnswers(quizId))
        + "/" + String(getNumberOfQuestions(quizId));
    var buttonFinish = document.getElementById("button-finish");
    if (getNumberOfGoodAnswers(quizId) === getNumberOfQuestions(quizId)) {
        buttonFinish.setAttribute("class", "button is-warning");
    }
    else {
        buttonFinish.setAttribute("class", "button is-warning is-light");
    }
}
function viewQuestionById(quiz, questionId) {
    var percentDone = 100 * (questionId + 1) / getNumberOfQuestions(quiz);
    document.getElementById('progress-bar').setAttribute("value", String(percentDone));
    document.getElementById('question').textContent = getQuestionById(quizId, currentQuestion).question;
    document.getElementById('question-name').textContent = "Pytanie " + String(questionId + 1);
    var answerBox = document.getElementById('answer-box');
    if (typeof answers[questionId] !== 'undefined') {
        answerBox.value = answers[questionId];
    }
    else {
        answerBox.value = "";
    }
    onAnswerUpdate();
}
function viewScore(quiz) {
    console.log("koncze quiz");
}
function updateButtons() {
    if (quizFinished) {
        return;
    }
    var prevButton = document.getElementById("button-prev");
    if (currentQuestion === 0) {
        prevButton.style.visibility = "hidden";
    }
    else {
        prevButton.style.visibility = "visible";
    }
    var nextButton = document.getElementById("button-next");
    if (currentQuestion + 1 === getNumberOfQuestions(quizId)) {
        nextButton.style.visibility = "hidden";
    }
    else {
        nextButton.style.visibility = "visible";
    }
}
function onClickPrevious() {
    if (quizFinished) {
        return;
    }
    if (currentQuestion > 0) {
        currentQuestion--;
    }
    updateButtons();
    viewQuestionById(quizId, currentQuestion);
}
function onClickNext() {
    if (quizFinished) {
        return;
    }
    var button = document.getElementById("button-next");
    if (currentQuestion + 1 < getNumberOfQuestions(quizId)) {
        currentQuestion++;
    }
    updateButtons();
    viewQuestionById(quizId, currentQuestion);
}
function onClickFinish() {
    if (getNumberOfGoodAnswers(quizId) === getNumberOfQuestions(quizId)) {
        quizFinished = true;
        viewScore(quizId);
    }
}
function startCountdown() {
    let counter = 0;
    const interval = setInterval(() => {
        if (quizFinished) {
            clearInterval(interval);
        }
        counter++;
        seconds[currentQuestion]++;
        document.getElementById('timer').textContent = String(counter) + " s";
    }, 1000);
}
viewQuestionById(quizId, currentQuestion);
document.getElementById("quiz-name").textContent = quizId;
document.getElementById("penalty-info").textContent = "kara za niepoprawną odpowiedź: " + String(getPenalty(quizId)) + " s";
document.getElementById("answer-box").addEventListener('input', onAnswerUpdate);
document.getElementById("button-next").addEventListener('click', onClickNext);
document.getElementById("button-prev").addEventListener('click', onClickPrevious);
document.getElementById("button-finish").addEventListener('click', onClickFinish);
startCountdown();
//# sourceMappingURL=quiz.js.map