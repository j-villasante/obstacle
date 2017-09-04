const Ball = require('./Ball.js')
const utils = require('./utils')

class BallController {
    constructor (context, canvas) {
        this.ctx = context
        this.canvas = canvas
        this.balls = []
    }

    addBall (quantity = 1) {
        let i = 0
        while (i < quantity) {
            let randRadius = utils.getRandomInt(10, 25)
            let randomX = utils.getRandomInt(0 + randRadius, this.canvas.width - randRadius)
            let randomY = utils.getRandomInt(0 + randRadius, this.canvas.height - randRadius)
            let randSpeedX = utils.getRandomInt(3, 8)
            let randSpeedY = utils.getRandomInt(3, 8)
            let ball = new Ball(this.ctx, randomX, randomY, randRadius)
            ball.setSpeed(randSpeedX, randSpeedY)
            this.balls.push(ball)
            i++
        }
    }

    moveBalls () {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        for (let ball of this.balls) {
            ball.draw()
            if (ball.y + ball.vy + ball.radius > this.canvas.height || ball.y + ball.vy - ball.radius < 0) {
                ball.vy = -ball.vy
            }

            if (ball.x + ball.vx + ball.radius > this.canvas.width || ball.x + ball.vx - ball.radius < 0) {
                ball.vx = -ball.vx
            }
            ball.move()
        }
    }
}

module.exports = BallController
