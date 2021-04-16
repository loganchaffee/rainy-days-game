const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

let controller = {
    left: false,
    right: false,
    up: false,
    keyEventListener: function (event) {
        let keyState = (event.type === 'keydown') ? true : false

        switch (event.key) {
            case 'a':
                controller.left = keyState
                break;
            case 'd':
                controller.right = keyState
                break;
            case ' ':
                controller.up = keyState
                break;
            case 's':
                controller.down = keyState
                break;
        }

    },
    clickEventListener: function (event) {
        let projectile = new Projectile(player.x + 25, player.y, 6, -20)
        projectiles.push(projectile)
    }
}
// --------------------------------------------------------------------------
class Player {
    constructor(x, y, width, height, xVelocity, yVelocity, jumping) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.xVelocity = xVelocity
        this.yVelocity =  yVelocity
        this.jumping = true
    }   
    draw(){
        ctx.beginPath()
        ctx.fillStyle = '#964000'
        ctx.rect(this.x, this.y, this.width, this.height)
        ctx.fill()
    }
    update(){
        if (controller.up && player.jumping == false) {
            this.yVelocity -= 40
            this.jumping = true
        }
        if (controller.left) {
            this.xVelocity -= 1.3;
        }
        if (controller.right) {
            this.xVelocity += 1.;
        }

        this.yVelocity += 2 // gravity (always moving player down)
        this.x += this.xVelocity
        this.y += this.yVelocity
        this.xVelocity *= .9 //friction (always slowing the player down)
        this.yVelocity *= .9 //friction (always slowing the player down)

        //if player if lowering through the floor
        if (this.y > canvas.height - 25 - 50) {
            this.jumping = false
            this.y = canvas.height - 25 - 50
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

// -------------------------------------------------------------------------

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
        ctx.fillStyle = 'white'
        ctx.fill()
    }

    update() {
        this.draw()
        // this.x = this.x + this.velocity.x
        this.y = this.y + this.yVelocity
    }
}

// Event Listeners
window.addEventListener('keydown', controller.keyEventListener)
window.addEventListener('keyup', controller.keyEventListener)
window.addEventListener('click', controller.clickEventListener)

// Class Instances
let player = new Player(canvas.width / 2 - 25, canvas.height - 75, 50 , 50, 0, 0, true)

let projectiles = []

// Game Loop
let animate = function () {
    ctx.clearRect(0,0,600,600)
    player.update()
    projectiles.forEach(projectile => {
        projectile.update()
    });
    window.requestAnimationFrame(animate)
}
animate()