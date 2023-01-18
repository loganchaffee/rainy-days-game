const express = require('express');
const path = require('path')
const fs = require('fs/promises')

const app = express()

app.use('/resources', express.static(path.join(__dirname, 'resources')))
app.use('/scripts', express.static(path.join(__dirname, 'scripts')))
app.use('/audio', express.static(path.join(__dirname, 'audio')))


app.get('/', async (req, res) => {
    try {
        res.sendFile( __dirname + '/index.html')
    } catch (error) {
        console.log(error);
        res.status(500).send('Error')
    }
})

app.get('/scores', async (req, res) => {
    try {
        let data = await fs.readFile(__dirname + '/resources/high-scores.json',  { encoding: 'utf8' })

        data = JSON.parse(data)
        
        res.status(200).json(data)
    } catch (error) {
        console.log(error);
        res.status(500).send('Error')
    }
})

app.listen(3000, () => console.log('App listening on port 3000'))