import ApiError from "../core/error.response.js";

import multer from 'multer'
const errorHandler = (err, req, res, next) => {
    console.error(`[Error] ${err.name}: ${err.message}`);

    if (err instanceof multer.MulterError) {
        let message = err.message;
        if (err.code === 'LIMIT_FILE_SIZE') {
            message = 'File size if over size limit(2MB)!'
        }
        else if (err.code === 'LIMIT_UNEXPECTED_FILE') {
            message = 'File type is not allowed'
        }
        return res.status(400).json({
            success: false,
            message,
        })
    }

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
        message: 'Internal Server Error',
    })
}

export default errorHandler;