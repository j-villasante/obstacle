(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
class Ball {
    constructor (context, x, y, r) {
        this.x = x
        this.y = y
        this.radius = r
        this.color = this.getRandomColor()
        this.ctx = context
        this.loading = true
        this.setLoadingState()
    }

    getRandomColor () {
        return '#000000'.replace(/0/g, () => (~~(Math.random() * 16)).toString(16))
    }

    setSpeed (vx, vy) {
        this.vx = vx
        this.vy = vy
    }

    get centerPoint () {
        return {
            x: this.x,
            y: this.y
        }
    }

    setPosition (x, y) {
        this.x = x
        this.y = y
    }

    move () {
        if (this.loading) return
        this.x += this.vx
        this.y += this.vy
    }

    setLoadingState () {
        setTimeout(() => {
            this.loading = false
        }, 1000)
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
        for (let ball of this.balls) {
            if (ball.y + ball.vy + ball.radius > this.canvas.height || ball.y + ball.vy - ball.radius < 0) {
                ball.vy = -ball.vy
            }

            if (ball.x + ball.vx + ball.radius > this.canvas.width || ball.x + ball.vx - ball.radius < 0) {
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

},{"./Ball.js":1,"./utils":4}],3:[function(require,module,exports){
const BallController = require('./BallController.js')

class Main {
    constructor () {
        this.canvas = document.getElementById('canvas')
        this.canvas.width = document.body.clientWidth
        this.canvas.height = document.body.clientHeight - document.getElementById('content').offsetHeight
        this.spanScore = document.getElementById('span-balls')
        this.ctx = this.canvas.getContext('2d')
        this.ballCount = 3
        this.increment = 1
        this.runningTime = 0
        this.running = false
    }

    setNewBallsController () {
        this.controller = new BallController(this.ctx, this.canvas)
    }

    animate () {
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.6)'
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
        this.controller.moveBalls()
        this.controller.render()
        if (this.controller.detectColision()) {
            this.running = false
            this.ctx.fillStyle = 'rgba(255, 255, 255, 0.8)'
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
            this.ctx.fillStyle = '#FF0000'
            this.ctx.font = '48px serif'
            this.ctx.fillText('Game over', 0, 100)
        } else {
            window.requestAnimationFrame(() => this.animate())
        }
    }

    runTimer () {
        setTimeout(() => {
            this.runningTime += 0.5
            this.spanScore.innerHTML = this.runningTime * 2
            if (this.running) {
                this.runTimer()
            }
        }, 500)
    }

    addBallsInterval (interval) {
        setTimeout(() => {
            this.controller.addBall(this.increment)
            this.ballCount += this.increment
            this.increment++
            if (this.running) {
                this.addBallsInterval(interval)
            }
        }, interval)
    }

    startGame () {
        if (this.running) return
        this.running = true
        this.setNewBallsController()
        this.controller.addBall(this.ballCount)
        this.controller.createStaticBall()
        this.runTimer()
        this.addBallsInterval(5000)
        this.animate(this.controller)
    }

    restart () {
        this.ballCount = 3
        this.increment = 1
        this.runningTime = 0
        this.spanScore.innerHTML = 0
        this.startGame()
    }

    start () {
        this.startGame()
        this.canvas.addEventListener('mousemove', e => this.controller.moveBallOnMouseMove(e))
    }
}

let main = new Main()
main.start()
document.getElementById('btn-restart').addEventListener('click', e => main.restart())

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

    getDistanceBewteenPoints (a, b) {
        return Math.hypot(a.x - b.x, a.y - b.y)
    }
}

module.exports = new Utils()

},{}]},{},[3])

//# sourceMappingURL=bundle.js.map
