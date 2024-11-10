const paginationMiddleware = () => {
    return async (req, res, next) => {
        try {

            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const skip = (page - 1) * limit;

            req.pagination = { page, limit, skip };
            next();
        } catch (error) {
            console.error("Pagination middleware error:", error);
            res.status(500).json({ success: false, message: "Server Error" });
        }
    };
};

module.exports = paginationMiddleware;
