const express = require('express');
const path = require('path');
const fs = require('fs/promises');
const bodyParser = require('body-parser');

const app = express();

/* -------------------------------- Middleware ------------------------------- */

app.use(bodyParser.json());

/* --------------------------------- Static --------------------------------- */

app.use('/resources', express.static(path.join(__dirname, 'resources')));
app.use('/scripts', express.static(path.join(__dirname, 'scripts')));
app.use('/styles', express.static(path.join(__dirname, 'styles')));
app.use('/audio', express.static(path.join(__dirname, 'audio')));

/* ---------------------------------- Home Page Route ---------------------------------- */

app.get('/', async (req, res) => {
    try {
        res.sendFile(__dirname + '/index.html');
    } catch (error) {
        console.log(error);
        res.status(500).send('Error');
    }
});

/* ------------------------------- Scores API ------------------------------- */

app.get('/scores', async (req, res) => {
    try {
        const data = JSON.parse(await fs.readFile(__dirname + '/resources/high-scores.json'));

        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(500).send('Error');
    }
});

app.post('/scores', async (req, res) => {
    try {
        const entry = req.body;

        const data = JSON.parse(await fs.readFile(__dirname + '/resources/high-scores.json'));

        for (let i = 0; i < data.length; i++) {
            if (data[i].score < entry.score) {
                console.log('writing new scores');

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
});

app.post('/check-high-score', async (req, res) => {
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
});

// Server
app.listen(3000, () => console.log('App listening on port 3000'));
