import jsonString from "./quizdata.js"

const quizJson = JSON.parse(jsonString).quiz;

console.log(Object.keys(quizJson));
for(var i = 0; i < Object.keys(quizJson).length; i++) {
    console.log(quizJson[i].id);
}

let questionTable: HTMLTableElement = document.getElementById("question-list") as HTMLTableElement;

for(var i = 0; Object.keys(quizJson).length; i++) {
    questionTable.insertAdjacentHTML('afterbegin', 
    `<tr>
        <td width="5%"><i class="fa fa-bell-o"></i></td>
        <td>${quizJson[i].id}</td>
        <td class="level-right"><a class="button is-small is-primary" href="#">Start</a></td>
    </tr>`);
}





console.log(questionTable);


//console.log(quizData.quiz[0].easy[0].question);