const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { getScores, saveScore, checkHighScore } = require('./handlers');
const { getHomePage } = require('./handlers');

const app = express();

// Middleware
app.use(bodyParser.json());

// Static
app.use('/resources', express.static(path.join(__dirname, 'resources')));
app.use('/scripts', express.static(path.join(__dirname, 'scripts')));
app.use('/styles', express.static(path.join(__dirname, 'styles')));
app.use('/audio', express.static(path.join(__dirname, 'audio')));

// Home Page Route
app.get('/', getHomePage);

// API Routes
app.get('/scores', getScores);
app.post('/scores', saveScore);
app.post('/check-high-score', checkHighScore);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
