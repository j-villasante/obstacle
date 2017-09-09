const request = require('superagent')

class Game {
    constructor () {
        this.score = parseInt(document.getElementById('div-score').dataset.score)
    }

    saveScore (score) {
        request
            .post('/game/score')
            .send({ score: score })
            .set('Accept', 'application/json')
            .end((err, res) => {
                if (err || !res.ok) {
                    console.log('Oh no! error')
                } else {
                    if (res.body.updated) {
                        document.getElementById('div-score').innerHTML = `Record: ${score}`
                    }
                }
            })
    }
}

module.exports = new Game()
