import jsonString from "./quizdata.js";
import { getTopScoresWithId } from "./database.js";
const quizJson = JSON.parse(jsonString).quiz;
function viewQuizTable() {
    let quizTable = document.getElementById("question-list");
    for (var i = 0; i < Object.keys(quizJson).length; i++) {
        var quizId = quizJson[i].id;
        quizTable.insertAdjacentHTML('beforeend', `<tr>
            <td width="5%"><i class="fa fa-bell-o"></i></td>
            <td>${quizId}</td>
            <td class="level-right"><a class="button is-small is-success" href="quiz.html?id=${quizId}">Start</a></td>
        </tr>`);
    }
}
function viewQuizStatsById(quizId) {
    var resultTable = getTopScoresWithId(quizId);
    var statsTable = document.getElementById("stats-table");
    statsTable.insertAdjacentHTML('beforeend', `<article class="tile is-child notification is-light">
        <p class="subtitle">${quizId}</p>
        <p class="content">
            <table class="table">
                <thead id="thead-${quizId}">
                    <tr>
                        <th>Miejsce</th>
                        <th>Wynik</th>
                        <th>Czas</th>
                    </tr>
                </thead>
                <tbody id='table-${quizId}'>
                    <!-- FILLING IN LOOP -->
                </tbody>
            </table>
        </p>
    </article>
    `);
    var currTable = document.getElementById("table-" + quizId);
    if (resultTable.length == 0) {
        currTable.insertAdjacentHTML('beforeend', 'Wypełnij test, aby wyświetlić wyniki');
    }
    else {
        for (var i = 0; i < resultTable.length; i++) {
            currTable.insertAdjacentHTML('beforeend', `<tr>
                <td><b>${i + 1}</b></td>
                <td>${resultTable[i].score}</td>
                <td>${resultTable[i].time}</td>
            </tr>
            `);
        }
    }
}
function viewQuizStats() {
    for (var i = 0; i < Object.keys(quizJson).length; i++) {
        var quizId = quizJson[i].id;
        viewQuizStatsById(quizId);
    }
}
viewQuizTable();
viewQuizStats();
//# sourceMappingURL=index.js.map