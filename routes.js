const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()

function setup (app, controllers) {
    app.get('/', controllers.home.show)
    app.post('/game/score', jsonParser, controllers.home.updateScore)
}

module.exports.setup = setup
