// Game Loop-----------------------------------------------------------------

let animationId;
let animate = function () {
    animationId = requestAnimationFrame(animate);
    ctx.clearRect(0, 0, 600, 600);
    player.update(); // Renders Player

    projectiles.forEach((projectile, index) => {
        projectile.update();
        // remove projectiles from edges of screen
        if (projectile.y < 0) {
            setTimeout(() => {
                projectiles.splice(index, 1);
            }, 0);
        }
    });
    enemyProjectiles.forEach((projectile, index) => {
        projectile.update();
        // remove projectiles from edges of screen
        if (projectile.y > 550) {
            setTimeout(() => {
                enemyProjectiles.splice(index, 1);
            }, 0);
        }
    });
    enemies.forEach((enemy, index) => {
        // Rendering each enemy in array
        if (enemy.x + enemy.radius === 550) {
            // If left enemy hits wall
            enemies.forEach((enemy) => {
                enemy.direction = 'left';
                enemy.update();
            });
        } else if (enemy.x - enemy.radius === 0) {
            // If right enemy hits wall
            enemies.forEach((enemy) => {
                enemy.direction = 'right';
                enemy.update();
            });
        } else {
            // Render enemies that arent hitting wall
            enemy.update();
        }

        projectiles.forEach((projectile, projectileIndex) => {
            const dist = Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y);

            if (dist - enemy.radius - projectile.radius < 1) {
                enemies.splice(index, 1);
                projectiles.splice(projectileIndex, 1);
                score += 100;
                punchSound();
            }
        });
    });
    enemyProjectiles.forEach((enemyProjectile) => {
        function playerProjectileColliding(enemyProjectile, player) {
            let distX = Math.abs(enemyProjectile.x - player.x - player.width / 2);
            let distY = Math.abs(enemyProjectile.y - player.y - player.height / 2);

            if (distX > player.width / 2 + enemyProjectile.radius) {
                return false;
            }
            if (distY > player.height / 2 + enemyProjectile.radius) {
                return false;
            }

            if (distX <= player.width / 2 - 7) {
                return true;
            }
            if (distY <= player.height / 2 - 8) {
                return true;
            }

            let dx = distX - player.width / 2;
            let dy = distY - player.height / 2;
            return dx * dx + dy * dy <= enemyProjectile.radius * enemyProjectile.radius;
        }
        // Game Over
        if (playerProjectileColliding(enemyProjectile, player)) {
            cancelAnimationFrame(animationId);
            gameOverSound();
            gameOverMenu.style.display = '';
            enemyProjectileVelocity = 6;
            enemyProjectileFrequency = 500;
            setHighScore();
            playerScore.innerHTML = score;
            let finalScore = score;
            score = 0;
            document.getElementById('waveCount').innerHTML = 0;

            (async () => {
                const isHighScore = await checkForHighScore(finalScore);

                if (isHighScore) {
                    document.getElementById('initialContainer').style.display = 'block';

                    async function setHighScore(score, initials) {
                        try {
                            const res = await fetch('/scores', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ score, initials }),
                            });

                            const data = await res.json();

                            for (let i = 0; i < data.length; i++) {
                                const score = data[i].score;

                                const initials = data[i].initials;

                                document.getElementById(`${i + 1}-score`).innerHTML = score;
                                document.getElementById(`${i + 1}-initials`).innerHTML = initials;
                            }
                        } catch (error) {
                            console.log(error);
                        }
                    }

                    document.getElementById('submitBtn').onclick = () => {
                        const initials = document.getElementById('initialsInput').value.toUpperCase();

                        setHighScore(finalScore, initials);

                        document.getElementById('initialsInput').value = '';

                        document.getElementById('initialContainer').style.display = 'none';
                    };
                }
            })();
        }
    });
    enemies.forEach((enemy) => {
        function playerProjectileColliding(enemy, player) {
            let distX = Math.abs(enemy.x - player.x - player.width / 2);
            let distY = Math.abs(enemy.y - player.y - player.height / 2);

            if (distX > player.width / 2 + enemy.radius) {
                return false;
            }
            if (distY > player.height / 2 + enemy.radius) {
                return false;
            }

            if (distX <= player.width / 2 - 7) {
                return true;
            }
            if (distY <= player.height / 2 - 8) {
                return true;
            }

            let dx = distX - player.width / 2;
            let dy = distY - player.height / 2;
            return dx * dx + dy * dy <= enemy.radius * enemy.radius;
        }
        // Game Over
        if (playerProjectileColliding(enemy, player)) {
            cancelAnimationFrame(animationId);
            gameOverSound();
            gameOverMenu.style.display = '';
            playerScore.innerHTML = score;
            setHighScore();
            score = 0;
            enemyProjectileVelocity = 6;
            enemyProjectileFrequency = 500;
        }
        if (enemy.y >= 520) {
            cancelAnimationFrame(animationId);
            gameOverSound();
            gameOverMenu.style.display = '';
            playerScore.innerHTML = score;
            setHighScore();
            score = 0;
            enemyProjectileVelocity = 6;
            enemyProjectileFrequency = 500;
        }
    });

    // If the player wins a round
    if (enemies.length === 0) {
        createEnemies();
        enemyProjectileVelocity = enemyProjectileVelocity + 1;
        enemyProjectileFrequency = enemyProjectileFrequency / 1.5;
        clearInterval(enemyShootsInterval);
        firingInterval(enemyProjectileVelocity, enemyProjectileFrequency);

        const lastWaveNumber = Number(document.getElementById('waveCount').innerHTML);

        document.getElementById('waveCount').innerHTML = lastWaveNumber + 1;
    }

    document.getElementById('scoreCount').innerHTML = score;
};
