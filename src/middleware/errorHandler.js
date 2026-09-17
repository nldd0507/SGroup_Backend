import ApiError from "../core/error.response.js";

const errorHandler = (err, req, res, next) => {
    console.error(`[Error] ${err.name}: ${err.message}`, err);

    if (err instanceof ApiError) {
        const response = {
            success: false,
            message: err.message,
        };
        if (err.errors) response.errors = err.errors;
        return res.status(err.statusCode).json(response);
    }
    return res.status(500).json({
        success: false,
        message: err.message || 'Internal Server Error',
    });
};

export default errorHandler;