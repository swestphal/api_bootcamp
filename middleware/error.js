const ErrorResponse = require('../utils/errorResponse')

const errorHandler = (err, req, res, next) => {
    let error = { ...err }


    error.message = err.message

    console.log(err.name)

    // mongoose bad objectid
    if (err.name === 'CastError') {
        const message = `Bootcamp not found with id: ${err.value}`
        error = new ErrorResponse(message, 404)
    }

    // mongoose duplicate key
    if (err.code === 11000) {
        const message = `Duplicate field value entered`
        error = new ErrorResponse(message, 400)
    }

    // mongoose validation error
    if (err.name === 'ValidationError') {
        const messages = Object.values(err.errors).map((val) => val.message)
        error = new ErrorResponse(messages, 400)
    }

    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || 'Server error'
    })
}

module.exports = errorHandler;