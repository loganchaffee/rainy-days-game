(async function main() {
    const res = await fetch('/scores', { method: 'GET' });

    const data = await res.json();

    console.log(data);

    for (let i = 0; i < data.length; i++) {
        const score = data[i].score;

        const initials = data[i].initials;

        document.getElementById(`${i + 1}-score`).innerHTML = score;
        document.getElementById(`${i + 1}-initials`).innerHTML = initials;
    }
})();

async function updateScores(score, initials) {
    try {
        const res = await fetch('/scores', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ score, initials }),
        });

        const data = await res.json();
    } catch (error) {
        console.log(error);
    }
}

updateScores(2549, 'LMC');
