// Global Variables
//Canvas
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
// Start Menu
const startMenu = document.querySelector('#startMenu')
const startGameBtn = document.querySelector('#startGameBtn') 
const loginBtn = document.querySelector('#loginBtn')
const howToBtn = document.querySelector('#howToBtn')
// How To Menu
const howToMenu = document.querySelector('#howToMenu')
const howToMenuBackBtn = document.querySelector('#howToMenuBackBtn')
// Login Menu
const loginMenu = document.querySelector('#loginMenu')
const loginBackBtn = document.querySelector('#loginBackBtn')
// Game Over Menu
const gameOverMenu = document.querySelector('#gameOverMenu')
const playAgainBtn = document.querySelector('#playAgainBtn')
const gameOverMenuBackBtn = document.querySelector('#gameOverMenuBackBtn')
let playerScore = document.querySelector('#playerScore')

// This a calls the enemies to shoot at a set interval
let enemyShootsInterval = window.setInterval(function enemyShoots(enemy) {
    enemy = enemies[Math.floor(Math.random() * enemies.length)]
    let projectile = new EnemyProjectile(enemy.x, enemy.y + 20, 6, 3)
    enemyProjectiles.push(projectile)
}, 500);
// Class Instances -----------------------------------------------------------

let score = 0

let player = new Player(canvas.width / 2 - 25, canvas.height - 75, 40, 50, 0, 0, true)

let projectiles = []

let enemyVelocity = 1

let enemies = [
    new Enemy(25, 25, 20, enemyVelocity, .1, 'right'),
    new Enemy(75, 25, 20, enemyVelocity, .1, 'right'),
    new Enemy(125, 25, 20, enemyVelocity, .1, 'right'),
    new Enemy(175, 25, 20, enemyVelocity, .1, 'right'),
    new Enemy(225, 25, 20, enemyVelocity, .1, 'right'),
    new Enemy(275, 25, 20, enemyVelocity, .1, 'right'),
    new Enemy(325, 25, 20, enemyVelocity, .1, 'right'),
    new Enemy(375, 25, 20, enemyVelocity, .1, 'right'),
    new Enemy(425, 25, 20, enemyVelocity, .1, 'right'),

    new Enemy(25, 75, 20, enemyVelocity, .1, 'right'),
    new Enemy(75, 75, 20, enemyVelocity, .1, 'right'),
    new Enemy(125, 75, 20, enemyVelocity, .1, 'right'),
    new Enemy(175, 75, 20, enemyVelocity, .1, 'right'),
    new Enemy(225, 75, 20, enemyVelocity, .1, 'right'),
    new Enemy(275, 75, 20, enemyVelocity, .1, 'right'),
    new Enemy(325, 75, 20, enemyVelocity, .1, 'right'),
    new Enemy(375, 75, 20, enemyVelocity, .1, 'right'),
    new Enemy(425, 75, 20, enemyVelocity, .1, 'right'),
]

let enemyProjectiles = []



// Game Loop-----------------------------------------------------------------

let animationId
let animate = function () {
    animationId = requestAnimationFrame(animate)
    ctx.clearRect(0,0,600,600)
    player.update()// Renders Player
    projectiles.forEach((projectile, index) => {
        projectile.update()
        // remove projectiles from edges of screen
        if (projectile.y < 0) {
            setTimeout(() => {
                projectiles.splice(index, 1)
            }, 0);
        }
    })
    enemyProjectiles.forEach((projectile, index) => {
        projectile.update()
        // remove projectiles from edges of screen
        if (projectile.y > 550) {
            setTimeout(() => {
                enemyProjectiles.splice(index, 1)
            }, 0);
        }
    })
    enemies.forEach((enemy, index) => { // Rendering each enemy in array
        
        if (enemy.x + enemy.radius === 550) { // If left enemy hits wall
            enemies.forEach(enemy => {
                enemy.direction = 'left'
                enemy.update()
            });
        } else if (enemy.x - enemy.radius === 0) { // If right enemy hits wall
            enemies.forEach(enemy => {
                enemy.direction = 'right'
                enemy.update()
            });
        } else { // Render enemies that arent hitting wall
            enemy.update()
        }

        projectiles.forEach((projectile, projectileIndex) => {
            const dist = Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y)

            if (dist - enemy.radius - projectile.radius < 1) {
                enemies.splice(index, 1)
                projectiles.splice(projectileIndex, 1)
                score += 100
            }
        });
    })
    enemyProjectiles.forEach(enemyProjectile => {
        function playerProjectileColliding(enemyProjectile, player) {
            let distX = Math.abs(enemyProjectile.x - player.x - player.width / 2);
            let distY = Math.abs(enemyProjectile.y - player.y - player.height / 2);

            if (distX > (player.width / 2 + enemyProjectile.radius)) { return false; }
            if (distY > (player.height / 2 + enemyProjectile.radius)) { return false; }

            if (distX <= (player.width / 2 - 7)) { return true; }
            if (distY <= (player.height / 2 - 8)) { return true; }

            let dx = distX - player.width / 2;
            let dy = distY - player.height / 2;
            return (dx * dx + dy * dy <= (enemyProjectile.radius * enemyProjectile.radius));
        }
        if (playerProjectileColliding(enemyProjectile, player)) {
            cancelAnimationFrame(animationId)
            console.log('game over');
            gameOverMenu.style.display = ''
            playerScore.innerHTML = score
        }
    });
    if (enemies.length === 0) {
        cancelAnimationFrame(animationId)
        console.log('game over');
        gameOverMenu.style.display = ''
    }
}

startGameBtn.addEventListener('click', () => {
    startMenu.style.display = 'none'
    ctx.clearRect(0, 0, 600, 600)
    enemyProjectiles = []
    clearInterval(enemyShootsInterval)
    animate()
    enemyShootsInterval = window.setInterval(function enemyShoots(enemy) {
        enemy = enemies[Math.floor(Math.random() * enemies.length)]
        let projectile = new EnemyProjectile(enemy.x, enemy.y + 20, 6, 3)
        enemyProjectiles.push(projectile)
    }, 500);
})

howToBtn.addEventListener('click', () => {
    startMenu.style.display = 'none'
    howToMenu.style.display = ''
})

loginBtn.addEventListener('click', () => {
    startMenu.style.display = 'none'
    loginMenu.style.display = ''
})

howToMenuBackBtn.addEventListener('click', () => {
    startMenu.style.display = ''
    howToMenu.style.display = 'none'
    loginMenu.style.display = 'none'
})

loginBackBtn.addEventListener('click', () => {
    startMenu.style.display = ''
    howToMenu.style.display = 'none'
    loginMenu.style.display = 'none'
})

playAgainBtn.addEventListener('click', () => {
    startMenu.style.display = 'none'
    howToMenu.style.display = 'none'
    loginMenu.style.display = 'none'
    gameOverMenu.style.display = 'none'
    ctx.clearRect(0, 0, 600, 600)
    enemyProjectiles = []
    clearInterval(enemyShootsInterval)
    animate()
    enemyShootsInterval = window.setInterval(function enemyShoots(enemy) {
        enemy = enemies[Math.floor(Math.random() * enemies.length)]
        let projectile = new EnemyProjectile(enemy.x, enemy.y + 20, 6, 3)
        enemyProjectiles.push(projectile)
    }, 500);
})
gameOverMenuBackBtn.addEventListener('click', () => {
    startMenu.style.display = ''
    howToMenu.style.display = 'none'
    loginMenu.style.display = 'none'
    gameOverMenu.style.display = 'none'
})

// startMenu.style.display = 'none'
loginMenu.style.display = 'none'
howToMenu.style.display = 'none'
gameOverMenu.style.display = 'none'