interface sessionI {
    secret: string;
    resave: boolean;
    saveUninitialized: boolean;
    proxy?: boolean;
    cookie: {
        secure?: boolean;
    }
}

interface redisI {
    host?: string,
    port?: number,
    logErrors?: boolean,
    url?: string
}

interface configI {
    session: sessionI;
    redis: redisI;
}

class Config {
    session: sessionI = {
        secret: 'fnONWkpu7IS28jENFKTC',
        resave: false,
        saveUninitialized: true,
        cookie: {}
    }
    redis: redisI = {}

    get production (): configI {
        this.session.cookie.secure = true
        this.session.proxy = true
        this.redis = {
            url: process.env.REDIS_URL
        }
        return this.makeConfig()
    }

    get development (): configI {
        this.redis = {
            host: '127.0.0.1',
            port: 6379,
            logErrors: true
        }
        return this.makeConfig()
    }

    private makeConfig (): configI {
        return {
            session: this.session,
            redis: this.redis
        }
    }
}

export let confBuilder = new Config()
