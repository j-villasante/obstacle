(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
class Ball {
    constructor (context, x, y, r) {
        this.x = x
        this.y = y
        this.radius = r
        this.color = this.getRandomColor()
        this.ctx = context
    }

    getRandomColor () {
        return '#000000'.replace(/0/g, () => (~~(Math.random() * 16)).toString(16))
    }

    setSpeed (vx, vy) {
        this.vx = vx
        this.vy = vy
    }

    move () {
        this.x += this.vx
        this.y += this.vy
    }

    draw () {
        this.ctx.beginPath()
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true)
        this.ctx.closePath()
        this.ctx.fillStyle = this.color
        this.ctx.fill()
    }
}

module.exports = Ball

},{}],2:[function(require,module,exports){
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

},{"./Ball.js":1,"./utils":4}],3:[function(require,module,exports){
const BallController = require('./BallController.js')

function animate (controller) {
    controller.moveBalls()
    window.requestAnimationFrame(() => animate(controller))
}

function main () {
    let canvas = document.getElementById('canvas')
    let context = canvas.getContext('2d')

    let controller = new BallController(context, canvas)

    controller.addBall(9)
    animate(controller)
}

main()

},{"./BallController.js":2}],4:[function(require,module,exports){
class Utils {
    /**
     * Returns a random number between min (inclusive) and max (exclusive)
     */
    getRandomArbitrary (min, max) {
        return Math.random() * (max - min) + min
    }

    /**
     * Returns a random integer between min (inclusive) and max (inclusive)
     * Using Math.round() will give you a non-uniform distribution!
     */
    getRandomInt (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min
    }
}

module.exports = new Utils()

},{}]},{},[3])

//# sourceMappingURL=bundle.js.map
