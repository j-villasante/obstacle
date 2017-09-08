class Config {
    constructor () {
        this.session = {
            secret: 'fnONWkpu7IS28jENFKTC',
            resave: false,
            saveUninitialized: true,
            cookie: {}
        }
    }

    get production () {
        this.session.cookie.secure = true
        return this.makeConfig()
    }

    get development () {
        return this.makeConfig()
    }

    makeConfig () {
        return {
            session: this.session
        }
    }
}

module.exports = new Config()
