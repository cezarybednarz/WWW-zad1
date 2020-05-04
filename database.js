export function putScoreInStorage(quizId, score, time) {
    var currentTable = JSON.parse(localStorage.getItem(quizId));
    if (currentTable == null) {
        currentTable = [];
    }
    currentTable.push({ score: score, time: time });
    localStorage.setItem(quizId, JSON.stringify(currentTable));
}
export function getTopScoresWithId(quizId) {
    var currentTable = JSON.parse(localStorage.getItem(quizId));
    if (currentTable == null) {
        return [];
    }
    currentTable.sort((n1, n2) => n1.score - n2.score);
    return currentTable;
}
//# sourceMappingURL=database.js.map