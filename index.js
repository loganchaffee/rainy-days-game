const express = require('express');
const path = require('path');
const fs = require('fs/promises');

const app = express();

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
        let data = await fs.readFile(__dirname + '/resources/high-scores.json', { encoding: 'utf8' });

        data = JSON.parse(data);

        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(500).send('Error');
    }
});

// Server
app.listen(3000, () => console.log('App listening on port 3000'));
