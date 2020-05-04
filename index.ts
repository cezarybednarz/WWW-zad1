import jsonString from "./quizdata.js"

const quizJson = JSON.parse(jsonString).quiz;
let questionTable: HTMLTableElement = document.getElementById("question-list") as HTMLTableElement;

for(var i = 0; Object.keys(quizJson).length; i++) {
    var questionId = quizJson[i].id;
    questionTable.insertAdjacentHTML('beforeend', 
    `<tr>
        <td width="5%"><i class="fa fa-bell-o"></i></td>
        <td>${questionId}</td>
        <td class="level-right"><a class="button is-small is-primary" href="quiz.html?id=${questionId}">Start</a></td>
    </tr>`);
}