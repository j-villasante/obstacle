class Utils {
    /**
     * Returns a random number between min (inclusive) and max (exclusive)
     */
    getRandomArbitrary (min, max) {
        return Math.random() * (max - min) + min
    }

    /**
     * Returns a random integer between min (inclusive) and max (inclusive)
     * Using Math.round() will give you a non-uniform distribution!
     */
    getRandomInt (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min
    }

    getDistanceBewteenPoints (a, b) {
        return Math.hypot(a.x - b.x, a.y - b.y)
    }
}

module.exports = new Utils()
