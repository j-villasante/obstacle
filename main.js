const express = require('express')
const nunjucks = require('nunjucks')
const session = require('express-session')
const RedisStore = require('connect-redis')(session)

const setup = require('./routes.js').setup
const controllers = require('./controllers')

const config = require('./configs.js')[process.env.NODE_ENV || 'development']

const app = express()

nunjucks.configure('views', {
    autoescape: true,
    express: app
})

if (process.env.NODE_ENV === 'production') {
    app.set('trust proxy', 1)
}

config.session.store = new RedisStore(config.redis)
app.use(session(config.session))
app.use(express.static('static/dist'))
app.use(express.static('static/img'))
app.set('view engine', 'njk')

setup(app, controllers)

app.listen(process.env.PORT || 3000, () => {
    console.log(`Example app listening on port ${process.env.PORT || 3000}!`)
})
