// paginationMiddleware.js
const paginationMiddleware = (model) => {
    return async (req, res, next) => {
        try {
            // Extract page and limit from query params with default values
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const skip = (page - 1) * limit;

            // Apply pagination to the query on the provided model
            const results = await model.find().skip(skip).limit(limit).sort({ createdAt: -1 });
            const totalDocuments = await model.countDocuments();

            // Attach pagination details and data to the response
            res.paginatedResults = {
                success: true,
                data: results,
                pagination: {
                    totalItems: totalDocuments,
                    totalPages: Math.ceil(totalDocuments / limit),
                    currentPage: page,
                    pageSize: limit,
                },
            };

            next(); // Pass control to the next middleware or route handler
        } catch (error) {
            console.error("Pagination middleware error:", error);
            res.status(500).json({ success: false, message: "Server Error" });
        }
    };
};

module.exports = paginationMiddleware;
