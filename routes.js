function config (app, controllers) {
    app.get('/', controllers.home.show)
}

module.exports.config = config
