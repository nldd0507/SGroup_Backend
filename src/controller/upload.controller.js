import catchAsync from "../utils/catchAsync.js";

import { sendSuccess } from "../utils/responseHelper.js";

import * as uploadService from "../service/upload.service.js"


export const uploadSingleFile = catchAsync(async (req, res) => {
    const result = await uploadService.uploadSingleImageService(req.file);
    return sendSuccess(res, 201, 'Upload file successfully', result);
});

export const uploadDocuments = catchAsync(async (req, res) => {
    const userId = req.user.id;
    const documents = await uploadService.uploadMultipleDocumentsService(userId, req.files);
    return sendSuccess(res, 201, 'Upload documents successfully', documents);
});

export const uploadAvatar = catchAsync(async (req, res) => {
    const userId = req.user.id;
    const updatedUser = await uploadService.updateUserAvatarService(userId, req.file);
    return sendSuccess(res, 200, 'Upload avatar successfully!', updatedUser);
});
