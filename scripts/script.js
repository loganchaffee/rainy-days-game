// Global Variables -----------------------------------------------------------

//Canvas
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

// Start Menu
const startMenu = document.querySelector('#startMenu');
const startGameBtn = document.querySelector('#startGameBtn');
// const loginBtn = document.querySelector('#loginBtn')
const howToBtn = document.querySelector('#howToBtn');

// How To Menu
const howToMenu = document.querySelector('#howToMenu');
const howToMenuBackBtn = document.querySelector('#howToMenuBackBtn');

// Login Menu
// const loginMenu = document.querySelector('#loginMenu')
// const loginBackBtn = document.querySelector('#loginBackBtn')

// Game Over Menu
const gameOverMenu = document.querySelector('#gameOverMenu');
const playAgainBtn = document.querySelector('#playAgainBtn');
const gameOverMenuBackBtn = document.querySelector('#gameOverMenuBackBtn');
let playerScore = document.querySelector('#playerScore');
let startHighScore = document.querySelector('#startHighScore');
let gameOverHighScore = document.querySelector('#gameOverHighScore');

// The Game's Variables -----------------------------------------------------------
let score = 0;
let highScore = 0;
let projectiles = [];
let enemyVelocity = 1;
let enemies = [];
let enemyProjectiles = [];
let enemyProjectileVelocity = 6;
let enemyProjectileFrequency = 500;

let shootSound = function () {
    isMuted = document.getElementById('volumeOn').style.display === 'none';
    if (isMuted) return;

    let sound = new Audio('audio/shoot.wav');
    sound.play();
};
let jumpSound = function () {
    isMuted = document.getElementById('volumeOn').style.display === 'none';
    if (isMuted) return;

    let sound = new Audio('audio/jump.wav');
    sound.play();
};
let punchSound = function () {
    isMuted = document.getElementById('volumeOn').style.display === 'none';
    if (isMuted) return;

    let sound = new Audio('audio/punch.wav');
    sound.play();
};
let gameOverSound = function () {
    isMuted = document.getElementById('volumeOn').style.display === 'none';
    if (isMuted) return;

    let sound = new Audio('audio/gameover.wav');
    sound.play();
};

// Calls the enemies to shoot at a set interval
let enemyShootsInterval;

function firingInterval(enemyProjectileVelocity, enemyProjectileFrequency) {
    enemyShootsInterval = window.setInterval(function enemyShoots(enemy) {
        enemy = enemies[Math.floor(Math.random() * enemies.length)];
        let projectile = new EnemyProjectile(enemy.x, enemy.y + 20, 6, enemyProjectileVelocity);
        enemyProjectiles.push(projectile);
    }, enemyProjectileFrequency);
}
firingInterval(enemyProjectileVelocity);

// Checks and sets the Highscore
function setHighScore() {
    if (localStorage.getItem('highScore') < score) {
        localStorage.setItem('highScore', score);
        // gameOverHighScore.innerHTML = localStorage.getItem('highScore');
        startHighScore.innerHTML = localStorage.getItem('highScore');
    } else {
        // gameOverHighScore.innerHTML = localStorage.getItem('highScore');
        startHighScore.innerHTML = localStorage.getItem('highScore');
    }
}
setHighScore();

// Class Instances -----------------------------------------------------------
let player = new Player(canvas.width / 2 - 25, canvas.height - 75, 40, 50, 0, 0, true);

function createEnemies() {
    enemies = [
        new Enemy(25, 25, 20, enemyVelocity, 0.1, 'right'),
        new Enemy(75, 25, 20, enemyVelocity, 0.1, 'right'),
        new Enemy(125, 25, 20, enemyVelocity, 0.1, 'right'),
        new Enemy(175, 25, 20, enemyVelocity, 0.1, 'right'),
        new Enemy(225, 25, 20, enemyVelocity, 0.1, 'right'),
        new Enemy(275, 25, 20, enemyVelocity, 0.1, 'right'),
        new Enemy(325, 25, 20, enemyVelocity, 0.1, 'right'),
        new Enemy(375, 25, 20, enemyVelocity, 0.1, 'right'),
        new Enemy(425, 25, 20, enemyVelocity, 0.1, 'right'),

        new Enemy(25, 75, 20, enemyVelocity, 0.1, 'right'),
        new Enemy(75, 75, 20, enemyVelocity, 0.1, 'right'),
        new Enemy(125, 75, 20, enemyVelocity, 0.1, 'right'),
        new Enemy(175, 75, 20, enemyVelocity, 0.1, 'right'),
        new Enemy(225, 75, 20, enemyVelocity, 0.1, 'right'),
        new Enemy(275, 75, 20, enemyVelocity, 0.1, 'right'),
        new Enemy(325, 75, 20, enemyVelocity, 0.1, 'right'),
        new Enemy(375, 75, 20, enemyVelocity, 0.1, 'right'),
        new Enemy(425, 75, 20, enemyVelocity, 0.1, 'right'),
    ];
}
createEnemies(enemies);

// Event Listeners-----------------------------------------------------------

startGameBtn.addEventListener('click', () => {
    document.getElementById('waveCount').innerHTML = 1;
    canvas.style.background = 'url(./resources/3BBK.gif), url(./resources/1DFCC4D1-C2A5-4E6E-AB06-E295B8FF4ABF_1_105_c.jpeg)';
    startMenu.style.display = 'none';
    ctx.clearRect(0, 0, 600, 600);
    enemyProjectiles = [];
    clearInterval(enemyShootsInterval);
    createEnemies(enemies);
    animate();
    firingInterval(enemyProjectileVelocity, enemyProjectileFrequency);
});

howToBtn.addEventListener('click', () => {
    startMenu.style.display = 'none';
    howToMenu.style.display = '';
});

// loginBtn.addEventListener('click', () => {
//     startMenu.style.display = 'none'
// loginMenu.style.display = ''
// })

howToMenuBackBtn.addEventListener('click', () => {
    startMenu.style.display = '';
    howToMenu.style.display = 'none';
    // loginMenu.style.display = 'none'
});

// loginBackBtn.addEventListener('click', () => {
//     startMenu.style.display = ''
//     howToMenu.style.display = 'none'
//     loginMenu.style.display = 'none'
// })

playAgainBtn.addEventListener('click', () => {
    canvas.style.background = 'url(./resources/3BBK.gif), url(./resources/1DFCC4D1-C2A5-4E6E-AB06-E295B8FF4ABF_1_105_c.jpeg)';
    startMenu.style.display = 'none';
    howToMenu.style.display = 'none';
    // loginMenu.style.display = 'none'
    gameOverMenu.style.display = 'none';
    ctx.clearRect(0, 0, 600, 600);
    enemyProjectiles = [];
    clearInterval(enemyShootsInterval);
    createEnemies(enemies);
    animate();
    firingInterval(enemyProjectileVelocity, enemyProjectileFrequency);
});
gameOverMenuBackBtn.addEventListener('click', () => {
    startMenu.style.display = '';
    howToMenu.style.display = 'none';
    // loginMenu.style.display = 'none'
    gameOverMenu.style.display = 'none';
    ctx.clearRect(0, 0, 600, 600);
});

// startMenu.style.display = 'none'
// loginMenu.style.display = 'none'
howToMenu.style.display = 'none';
gameOverMenu.style.display = 'none';
