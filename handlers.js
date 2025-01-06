const fs = require('fs/promises');

const getScores = async (_, res) => {
    try {
        const data = JSON.parse(await fs.readFile(__dirname + '/resources/high-scores.json'));

        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(500).send('Error');
    }
}

const saveScore =  async (req, res) => {
    try {
        const entry = req.body;

        const data = JSON.parse(await fs.readFile(__dirname + '/resources/high-scores.json'));

        for (let i = 0; i < data.length; i++) {
            if (data[i].score < entry.score) {
                data.splice(i, 0, entry);
                data.pop();
                await fs.writeFile(__dirname + '/resources/high-scores.json', JSON.stringify(data));
                break;
            }
        }

        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(500).send('Error');
    }
}

const checkHighScore = async (req, res) => {
    try {
        const score = req.body.score;

        const data = JSON.parse(await fs.readFile(__dirname + '/resources/high-scores.json'));

        isHighScore = false;

        for (let i = 0; i < data.length; i++) {
            if (data[i].score < score) {
                isHighScore = true;
                break;
            }
        }

        res.status(200).json({ isHighScore });
    } catch (error) {
        console.log(error);
        res.status(500).send('Error');
    }
}

const getHomePage = async (req, res) => {
    try {
        res.sendFile(__dirname + '/index.html');
    } catch (error) {
        console.log(error);
        res.status(500).send('Error');
    }
}


module.exports = {
    getScores,
    saveScore,
    checkHighScore,
    getHomePage
}
