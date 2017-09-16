import { Response, Request } from 'express'

export class Home {
    private static single: Home
    private constructor() {}

    static get instance (): Home {
        if (Home.single){
            return Home.single
        } else{
            Home.single = new Home
            return Home.single
        }
    }
    
    show (req: Request, res: Response) {
        let obj = {
            score: 0
        }

        if (req.session.game) {
            obj.score = req.session.game.score
        }

        res.render('home', obj)
    }

    updateScore (req: Request, res: Response) {
        let game = req.session.game
        let updated = false
        if (game) {
            updated = game.score < req.body.score
            if (updated) {
                game.score = req.body.score
            }
        } else {
            req.session.game = {
                score: req.body.score
            }
            updated = true
        }
        res.json({ updated: updated })
    }

    clearSession (req: Request, res: Response) {
        req.session.destroy((err) => {
            if (err) res.send('Error destoying')
            res.send('destoyed')
        })
    }
}