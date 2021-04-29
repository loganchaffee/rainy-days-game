class Projectile {
    constructor(x, y, radius, yVelocity) {
        this.x = x
        this.y = y
        this.radius = radius
        this.yVelocity = yVelocity
    }
    draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        ctx.fillStyle = '#fc9601'
        ctx.fill()
    }
    update() {
        this.draw()
        this.y += this.yVelocity
    }
}

class EnemyProjectile {
    constructor(x, y, radius, yVelocity) {
        this.x = x
        this.y = y
        this.radius = radius
        this.yVelocity = yVelocity
    }

    draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        ctx.fillStyle = '#5dc1ffec'
        ctx.fill()
    }

    update() {
        this.draw()
        this.y += this.yVelocity
    }
}