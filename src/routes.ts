import * as bodyParser from 'body-parser'
import { ControllersI } from './controllers'
import { Application as App } from 'express'

const jsonParser = bodyParser.json()

export function setup (app: App, controllers: ControllersI) {
    app.get('/', controllers.home.show)
    app.post('/game/score', jsonParser, controllers.home.updateScore)

    if (process.env.NODE_ENV === 'development') {
        app.get('/clear', controllers.home.clearSession)
    }
}
