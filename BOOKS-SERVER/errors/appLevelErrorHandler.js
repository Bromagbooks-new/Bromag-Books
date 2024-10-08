
/* Create custom error classes for better error management Start */

class AppLevelErrorHandler extends Error {
    constructor(message, statusCode, success, error = null) {
        super(message)
        this.statusCode = statusCode
        this.error = error
        this.success = success
        Error.captureStackTrace(this, this.constructor)
    }
}

/* Create custom error classes for better error management Complete */

module.exports = AppLevelErrorHandler;