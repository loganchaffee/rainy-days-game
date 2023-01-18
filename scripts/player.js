let count = 0;
let delay = 5;
let playerImage = document.getElementById('playerImage');
let playerImage2 = document.getElementById('playerImage2');
let standA = {
    x: 0,
    y: 0,
    image: playerImage,
};
let standB = {
    x: 288,
    y: 256,
    image: playerImage,
};
let leftA = {
    x: 0,
    y: 256,
    image: playerImage2,
};
let leftB = {
    x: 96,
    y: 256,
    image: playerImage2,
};
let leftC = {
    x: 192,
    y: 256,
    image: playerImage2,
};
let rightA = {
    x: 576,
    y: 256,
    image: playerImage,
};
let rightB = {
    x: 672,
    y: 256,
    image: playerImage,
};
let rightC = {
    x: 768,
    y: 256,
    image: playerImage,
};
let jumpA = {
    x: 96,
    y: 0,
    image: playerImage,
};
let jumpB = {
    x: 672,
    y: 0,
    image: playerImage2,
};
let shootA = {
    x: 192,
    y: 256,
    image: playerImage,
};
let shootB = {
    x: 576,
    y: 256,
    image: playerImage2,
};

// let standingFrames = [standA, standB]
// let leftFrames = [leftA, leftB]
// let rightFrames = [rightA, rightB]
// let jumpFrames = jump
// let currentFrameSet = standingFrames

let frames = [standA, standB, leftA, leftB, leftC, rightA, rightB, rightC, jumpA, jumpB, shootA, shootB];
let currentFrame = frames[0];

class Player {
    constructor(x, y, width, height, xVelocity, yVelocity, jumping) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.xVelocity = xVelocity;
        this.yVelocity = yVelocity;
        this.jumping = true;
    }
    draw() {
        ctx.beginPath();
        ctx.fillStyle = '#3e4637';
        ctx.rect(0, 520, 550, 30);
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = 'transparent';
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fill();

        ctx.drawImage(currentFrame.image, currentFrame.x, currentFrame.y, 96, 128, this.x - 8, this.y - 19, 56, 70);
    }
    update() {
        if (controller.up && player.jumping == false) {
            this.yVelocity -= 20;
            this.jumping = true;
            jumpSound();
        }
        if (controller.left) {
            this.xVelocity -= 0.7;
        }
        if (controller.right) {
            this.xVelocity += 0.7;
        }

        this.yVelocity += 1; // gravity (always moving player down)
        this.x += this.xVelocity;
        this.y += this.yVelocity;
        this.xVelocity *= 0.9; //friction (always slowing the player down)
        this.yVelocity *= 0.9; //friction (always slowing the player down)

        //if player if lowering through the floor
        if (this.y > canvas.height - 75) {
            this.jumping = false;
            this.y = canvas.height - 75;
            this.yVelocity = 0; // downward movement must be 0, or player can't jumping right
        }
        if (this.x < -50) {
            // if player is going off the left
            this.x = 600;
        } else if (this.x > 600) {
            // if player is going off the right
            this.x = -50;
        }

        count++;

        if (!controller.up && !controller.left && !controller.right && count >= delay * 4) {
            if (count >= delay && currentFrame === frames[0]) {
                count = 0;
                currentFrame = frames[1];
            } else if (count >= delay && currentFrame === frames[1]) {
                count = 0;
                currentFrame = frames[0];
            } else {
                count = 0;
                currentFrame = frames[0];
            }
        }
        if (controller.up) {
            count = 0;
            currentFrame = frames[8];
        }
        if (controller.up && controller.left) {
            count = 0;
            currentFrame = frames[9];
        }
        if (controller.left && count >= delay) {
            if (count >= delay && currentFrame === frames[2]) {
                count = 0;
                currentFrame = frames[3];
            } else if (count >= delay && currentFrame === frames[3]) {
                count = 0;
                currentFrame = frames[4];
            } else if (count >= delay && currentFrame === frames[4]) {
                count = 0;
                currentFrame = frames[2];
            } else {
                count = 0;
                currentFrame = frames[2];
            }
        }
        if (controller.right && count >= delay) {
            if (count >= delay && currentFrame === frames[5]) {
                count = 0;
                currentFrame = frames[6];
            } else if (count >= delay && currentFrame === frames[6]) {
                count = 0;
                currentFrame = frames[7];
            } else if (count >= delay && currentFrame === frames[7]) {
                count = 0;
                currentFrame = frames[5];
            } else {
                count = 0;
                currentFrame = frames[5];
            }
        }
        document.addEventListener('click', function () {
            currentFrame = frames[10];
            count = 0;
        });

        this.draw();
    }
}
