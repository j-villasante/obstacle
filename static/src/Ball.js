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
