// Node module imports
import * as express from 'express'
import * as nunjucks from 'nunjucks'
import * as session from 'express-session'
import * as connectRedis from 'connect-redis'

// Local imports
import { setup } from './routes.js'
import { controllers } from './controllers'
import { confBuilder } from './configs.js'

const RedisStore = connectRedis(session)
const config = confBuilder.config
const app = express()

nunjucks.configure('views', {
    autoescape: true,
    express: app
})

if (process.env.NODE_ENV === 'production') {
    app.enable('trust proxy')
}

config.session.store = new RedisStore(config.redis)
app.use(session(config.session))
app.use(express.static('static/dist'))
app.use(express.static('static/img'))
app.set('view engine', 'njk')

setup(app, controllers)

app.listen(process.env.PORT || 3000, (): void => {
    console.log(`Example app listening on port ${process.env.PORT || 3000}!`)
})
