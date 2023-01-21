async function getInitialScores() {
    const res = await fetch('/scores', { method: 'GET' });

    const data = await res.json();

    for (let i = 0; i < data.length; i++) {
        const score = data[i].score;

        const initials = data[i].initials;

        document.getElementById(`${i + 1}-score`).innerHTML = score;
        document.getElementById(`${i + 1}-initials`).innerHTML = initials;
    }
}
getInitialScores();

async function checkForHighScore(score) {
    try {
        const res = await fetch('/check-high-score', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ score }),
        });

        const data = await res.json();

        return data.isHighScore;
    } catch (error) {
        console.log(error);
    }
}
