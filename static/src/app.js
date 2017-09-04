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
