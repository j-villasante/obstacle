const BallController = require('./BallController.js')
const game = require('./Game.js')

class Main {
    constructor () {
        this.canvas = document.getElementById('canvas')
        this.canvas.width = document.body.clientWidth
        this.canvas.height = document.body.clientHeight - document.getElementById('content').offsetHeight
        this.spanScore = document.getElementById('span-balls')
        this.ctx = this.canvas.getContext('2d')
        this.ballCount = 3
        this.increment = 1
        this.score = 0
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
            game.saveScore(this.score)
        } else {
            window.requestAnimationFrame(() => this.animate())
        }
    }

    runScore () {
        setTimeout(() => {
            if (this.running) {
                this.score += 1
                this.spanScore.innerHTML = this.score
                this.runScore()
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
        this.runScore()
        this.addBallsInterval(5000)
        this.animate(this.controller)
    }

    restart () {
        this.ballCount = 3
        this.increment = 1
        this.score = 0
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
