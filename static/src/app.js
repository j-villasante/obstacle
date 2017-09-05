const BallController = require('./BallController.js')

class Main {
    constructor () {
        this.canvas = document.getElementById('canvas')
        this.spanBalls = document.getElementById('span-balls')
        this.ctx = this.canvas.getContext('2d')
        this.ballCount = 3
        this.increment = 1
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
            this.ctx.fillStyle = 'rgba(255, 255, 255, 0.8)'
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
            this.ctx.fillStyle = '#FF0000'
            this.ctx.font = '48px serif'
            this.ctx.fillText('Game over', 0, 100)
        } else {
            window.requestAnimationFrame(() => this.animate())
        }
    }

    start () {
        this.controller.addBall(this.ballCount)
        this.controller.createStaticBall()
        this.animate(this.controller)
        setInterval(() => {
            this.controller.addBall(this.increment)
            this.ballCount += this.increment
            this.spanBalls.innerHTML = this.ballCount
            this.increment++
        }, 10000)
        this.canvas.addEventListener('mousemove', e => this.controller.moveBallOnMouseMove(e))
    }
}

let main = new Main()
main.setNewBallsController()
main.start()
