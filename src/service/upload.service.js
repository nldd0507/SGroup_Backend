import fs from "fs"
import path from "path";
import { fileURLToPath } from "url";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { r2Client } from "../config/r2.config.js";
import { config } from "../config/.env.config.js";
import { uploadToR2 } from "../utils/r2Upload.util.js";
import * as userRepository from '../repository/user.repository.js'
import * as documentRepository from '../repository/document.repository.js'
export const uploadSingleImageService = async (file) => {
    const fileUrl = await uploadToR2(file, 'images');
    return { url: fileUrl };
};

export const formatUploadedFile = (file, req) => {
    if (!file) return null;

    const relativeUrl = `/upload/${file.filename}`;

    return {
        filename: file.filename,
        originalName: file.originalname,
        mimetype: file.mimetype,
        size: file.size,
        url: relativeUrl,
        path: relativeUrl,
    }
}

export const deleteUploadedFile = (file, req) => {
    if (!fileURLToPath) return false;

    const sanitizedPath = fileUrlOrPath.replace(/^\/+/, '');

    if (fs.existsSync(absolutePath)) {
        try {
            fs.unlinkSync(absolutePath);
            return true;
        } catch (err) {
            console.error(`[UploadService] Lỗi xóa file: $${absolutePath}`, err.message);
            return false;
        }
    }
    return false;
}

export const generatePresignedUrl = async (fileName, fileType) => {
    const key = `uploads/${Date.now()}-${fileName}`;

    const command = new PutObjectCommand({
        Bucket: config.r2.bucketName,
        Key: key,
        ContentType: fileType,
    });
    const uploadUrl = await getSignedUrl(r2Client, command, { expiresIn: 300 });
    const fileUrl = `${config.r2.publicUrl}/${key}`;
    return { uploadUrl, fileUrl };
};

export const uploadMultipleDocumentsService = async (userId, files) => {
    const uploadPromises = files.map(async (file) => {
        const fileUrl = await uploadToR2(file, 'documents')
        return {
            fileName: file.originalname,
            fileUrl: fileUrl,
            fileType: file.mimetype,
            fileSize: file.size
        }
    })
    const uploadedFilesInfo = await Promise.all(uploadPromises);

    const savedDocuments = await documentRepository.createManyDocuments(userId, uploadedFilesInfo);

    return savedDocuments;
};


export const updateUserAvatarService = async (userId, file) => {
    const avatarUrl = await uploadToR2(file, 'avatar');
    const updatedUser = await userRepository.updateAvatar(userId, avatarUrl);
    return updatedUser;
}