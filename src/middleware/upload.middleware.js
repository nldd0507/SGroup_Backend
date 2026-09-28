import multer from "multer";
import path from "path";

import fs from 'fs';

import { BadRequestError } from "../core/error.response.js";

const UPLOAD_DIRECTORY = path.join(process.cwd(), 'uploads');

if (!fs.existsSync(UPLOAD_DIRECTORY)) {
    fs.mkdirSync(UPLOAD_DIRECTORY, { recursive: true })
}

const storage = multer.memoryStorage();

const imageFileFilter = (req, file, cb) => {
    const allowedMimeTypes = [
        'image/jpeg',
        'image/jpg',
        'image/png',
        'image/webp',
        'image/gif'
    ];

    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new BadRequestError('Định dạng file không hợp lệ! Chỉ chấp nhận ảnh (jpeg, jpg, png, webp, gif).'), false);
    }
};

export const multerUpload = multer({
    storage: storage,
    limits: {
        fileSize: 2 * 1024 * 1024,
    },
    fileFilter: imageFileFilter
});

export const uploadSingleImage = (fieldName = 'file', required = true) => {
    return (req, res, next) => {
        const upload = multerUpload.single(fieldName);

        upload(req, res, (err) => {
            // Bắt lỗi chuyên biệt từ Multer
            if (err instanceof multer.MulterError) {
                if (err.code === 'LIMIT_FILE_SIZE') {
                    return next(new BadRequestError('Kích thước file vượt quá giới hạn cho phép (Tối đa 2MB)!'));
                }
                if (err.code === 'LIMIT_UNEXPECTED_FILE') {
                    return next(new BadRequestError(`Field name không đúng quy định! Vui lòng đặt tên key là '${fieldName}'.`));
                }
                return next(new BadRequestError(`Lỗi upload file: ${err.message}`));
            }

            // Bắt lỗi từ fileFilter (BadRequestError) hoặc lỗi khác
            if (err) {
                return next(err);
            }

            // Kiểm tra file bắt buộc
            if (required && !req.file) {
                return next(new BadRequestError(`Vui lòng chọn một file để tải lên (key: '${fieldName}')!`));
            }

            next();
        });
    };
}

const documentFileFilter = (req, file, cb) => {
    const allowedMimeTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'text/plain',
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ];

    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new BadRequestError('Only accept pdf, doc, docx, txt, excel'), false);
    }
}

export const multerDocUpload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 10 * 1024 * 1024,
    },
    fileFilter: documentFileFilter
});

export const uploadMultipleDocuments = (fieldName = 'documents', maxFiles = 5) => {
    return (req, res, next) => {
        const upload = multerDocUpload.array(fieldName, maxFiles);

        upload(req, res, (err) => {
            if (err instanceof multer.MulterError) {
                if (err.code === "LIMIT_FILE_SIZE") return next(new BadRequestError('File size is over size limit(10MB)'));
                if (err.code === "LIMIT_UNEXPECTED_FILE" || err.code === "LIMIT_FILE_COUNT") {
                    return next(new BadRequestError(`File type is not allowed or File quantity over ${maxFiles} !`))
                }
                return next(new BadRequestError(`Upload error`))
            }
            if (err) return next(err);

            if (!req.files || req.files.length === 0) {
                return next(new BadRequestError('Please select at least one document!'));
            }

            next();
        })
    }
}