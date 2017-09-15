import * as bodyParser from 'body-parser'

const jsonParser = bodyParser.json()

export function setup (app, controllers) {
    app.get('/', controllers.home.show)
    app.post('/game/score', jsonParser, controllers.home.updateScore)

    if (process.env.NODE_ENV === 'development') {
        app.get('/clear', controllers.home.clearSession)
    }
}
