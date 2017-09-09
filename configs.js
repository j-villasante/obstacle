class Config {
    constructor () {
        this.session = {
            secret: 'fnONWkpu7IS28jENFKTC',
            resave: false,
            saveUninitialized: true,
            cookie: {}
        }
        this.redis = {}
    }

    get production () {
        this.session.cookie.secure = true
        this.redis = {
            url: process.env.REDIS_URL
        }
        return this.makeConfig()
    }

    get development () {
        this.redis = {
            host: '127.0.0.1',
            port: 6379,
            logErrors: true
        }
        return this.makeConfig()
    }

    makeConfig () {
        return {
            session: this.session,
            redis: this.redis
        }
    }
}

module.exports = new Config()
