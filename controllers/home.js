class Home {
    show (req, res) {
        let obj = {
            score: 0
        }

        if (req.session.game) {
            obj.score = req.session.game.score
        }

        res.render('home', obj)
    }

    updateScore (req, res) {
        let game = req.session.game
        let updated = false
        if (game) {
            updated = game.score < req.body.score
            if (updated) {
                game.score = req.body.score
            }
        } else {
            game = {
                score: req.body.score
            }
            updated = true
        }
        res.json({ updated: updated })
    }
}

module.exports = new Home()
