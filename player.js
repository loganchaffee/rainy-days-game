class Player {
    constructor(x, y, width, height, xVelocity, yVelocity, jumping) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.xVelocity = xVelocity
        this.yVelocity = yVelocity
        this.jumping = true
    }
    draw() {
        ctx.beginPath()
        ctx.fillStyle = 'darkgreen'
        ctx.rect(0, 550, 550, -30)
        ctx.fill()

        ctx.beginPath()
        ctx.fillStyle = 'transparent'
        ctx.rect(this.x, this.y, this.width, this.height)
        ctx.fill()


        ctx.drawImage(
            playerImage,
            0, 0,
            96, 128,
            this.x - 8, this.y - 19,
            56, 70
        )
    }
    update() {
        if (controller.up && player.jumping == false) {
            this.yVelocity -= 20
            this.jumping = true
        }
        if (controller.left) {
            this.xVelocity -= 1;
        }
        if (controller.right) {
            this.xVelocity += 1;
        }

        this.yVelocity += 1 // gravity (always moving player down)
        this.x += this.xVelocity
        this.y += this.yVelocity
        this.xVelocity *= .9 //friction (always slowing the player down)
        this.yVelocity *= .9 //friction (always slowing the player down)

        //if player if lowering through the floor
        if (this.y > canvas.height - 25 - 50) {
            this.jumping = false
            this.y = canvas.height - 25 - 40
            this.yVelocity = 0 // downward movement must be 0, or player can't jumping right
        }
        if (this.x < -50) { // if player is going off the left
            this.x = 600
        } else if (this.x > 600) { // if player is going off the right
            this.x = -50
        }

        this.draw()
    }
}