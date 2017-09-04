const express = require('express')
const nunjucks = require('nunjucks')

const config = require('./routes.js').config
const controllers = require('./controllers')

const app = express()

nunjucks.configure('views', {
    autoescape: true,
    express: app
})

app.set('view engine', 'njk')
app.use(express.static('static/dist'))

config(app, controllers)

app.listen(process.env.PORT || 3000, () => {
    console.log(`Example app listening on port ${process.env.PORT || 3000}!`)
})
