(async function main() {
    const res = await fetch('/scores', { method: 'GET'})

    const scores = await res.json()

    for (let i = 0; i < scores.length; i++) {
        const element = scores[i];
        
    }


})()    