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
        for (let ball of this.balls) {
            if (ball.y + ball.vy + ball.radius > this.canvas.height || ball.y + ball.vy < ball.radius) {
                ball.vy = -ball.vy
            }

            if (ball.x + ball.vx + ball.radius > this.canvas.width || ball.x + ball.vx < ball.radius) {
                ball.vx = -ball.vx
            }
            ball.move()
        }
    }

    detectColision () {
        for (let ball of this.balls) {
            let distance = utils.getDistanceBewteenPoints(this.staticBall.centerPoint, ball.centerPoint)
            if (!ball.loading && distance <= ball.radius + this.staticBall.radius) {
                return true
            }
        }
        return false
    }

    createStaticBall () {
        this.staticBall = new Ball(this.ctx, 25, 25, 15)
    }

    moveBallOnMouseMove (e) {
        let rect = this.canvas.getBoundingClientRect()
        this.staticBall.setPosition(e.clientX - rect.left, e.clientY - rect.top)
    }

    render () {
        for (let ball of this.balls) {
            ball.draw()
        }
        this.staticBall.draw()
    }
}

module.exports = BallController
