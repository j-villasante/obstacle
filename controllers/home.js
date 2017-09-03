class Home {
    show (req, res) {
        res.render('home')
    }
}

module.exports = new Home()
