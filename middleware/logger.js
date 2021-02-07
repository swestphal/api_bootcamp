// @desc    Logs request to console
// with this access on value that is in req  in any route after middleware ???
const logger = (req, res, next) => {
    req.hello = "Hello World";
    // hello is now available in routes -> e.g. current user
    console.log(`${req.method} ${req.protocol}://${req.get('host')}${req.originalUrl}`)
    console.log("Middleware is running")
    next();
}

module.exports = logger