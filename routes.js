function setup (app, controllers) {
    app.get('/', controllers.home.show)
}

module.exports.setup = setup
