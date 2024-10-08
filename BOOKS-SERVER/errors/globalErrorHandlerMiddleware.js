
const AppLevelErrorHandler = require("./appLevelErrorHandler")

const globalLevelErrorHandlerMiddleware = (err, req, res, next) => {
    if(err instanceof AppLevelErrorHandler) {
        return res.status(err.statusCode).send({
            message : err.message,
            error : err?.error,
            success : err.success
        })
    }


    return res.status(500).send({
        success : false,
        message : "Something went wrong! Please try again leter"
    })
}

module.exports = globalLevelErrorHandlerMiddleware;