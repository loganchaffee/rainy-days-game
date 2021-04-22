class Enemy {
    constructor(x, y, radius, xVelocity, yVelocity, direction) {
        this.x = x
        this.y = y
        this.radius = radius
        this.xVelocity = xVelocity
        this.yVelocity = yVelocity
        this.direction = direction

    }
    draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        ctx.fillStyle = 'transparent'
        ctx.fill()


        let enemyImage = document.getElementById('enemyImage')
        ctx.drawImage(enemyImage, this.x - 19, this.y - 20, 40, 40)
    }
    update() {
        this.draw()
        if (this.direction === 'right') {
            this.x += this.xVelocity
        }
        if (this.direction === 'left') {
            this.x -= this.xVelocity
        }
        this.y += this.yVelocity
    }
}