// Global Variables
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
let playerImage = document.getElementById('playerImage')


// Class Instances -----------------------------------------------------------

let player = new Player(canvas.width / 2 - 25, canvas.height - 100, 40, 50, 0, 0, true)

let projectiles = []

let enemyVelocity = .5

let enemies = [
    new Enemy(25, 25, 20, enemyVelocity, .05, 'right'),
    new Enemy(75, 25, 20, enemyVelocity, .05, 'right'),
    new Enemy(125, 25, 20, enemyVelocity, .05, 'right'),
    new Enemy(175, 25, 20, enemyVelocity, .05, 'right'),
    new Enemy(225, 25, 20, enemyVelocity, .05, 'right'),
    new Enemy(275, 25, 20, enemyVelocity, .05, 'right'),
    new Enemy(325, 25, 20, enemyVelocity, .05, 'right'),
    new Enemy(375, 25, 20, enemyVelocity, .05, 'right'),
    new Enemy(425, 25, 20, enemyVelocity, .05, 'right'),

    new Enemy(25, 75, 20, enemyVelocity, .05, 'right'),
    new Enemy(75, 75, 20, enemyVelocity, .05, 'right'),
    new Enemy(125, 75, 20, enemyVelocity, .05, 'right'),
    new Enemy(175, 75, 20, enemyVelocity, .05, 'right'),
    new Enemy(225, 75, 20, enemyVelocity, .05, 'right'),
    new Enemy(275, 75, 20, enemyVelocity, .05, 'right'),
    new Enemy(325, 75, 20, enemyVelocity, .05, 'right'),
    new Enemy(375, 75, 20, enemyVelocity, .05, 'right'),
    new Enemy(425, 75, 20, enemyVelocity, .05, 'right'),
]

let enemyProjectiles = []

setInterval(function enemyShoots(enemy) {
    enemy = enemies[Math.floor(Math.random() * enemies.length)]
    let projectile = new EnemyProjectile(enemy.x, enemy.y + 20, 6, 2)
    enemyProjectiles.push(projectile)
}, 1000);


// Game Loop-----------------------------------------------------------------

let animate = function () {
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
        } else { // Render enemies that arent hitting wallsdfda
            enemy.update()
        }

        projectiles.forEach((projectile, projectileIndex) => {
            const dist = Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y)

            if (dist - enemy.radius - projectile.radius < 1) {
                enemies.splice(index, 1)
                projectiles.splice(projectileIndex, 1)
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
            // alert('player hit');
        }
    });



    window.requestAnimationFrame(animate)
}
animate()