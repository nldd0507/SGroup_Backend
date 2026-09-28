import { Router } from 'express';
import * as uploadController from '../controller/upload.controller.js';
import { uploadSingleImage, uploadMultipleDocuments } from '../middleware/upload.middleware.js';
import { authenticateToken } from '../middleware/auth.middleware.js';

const router = Router();

router.post('/file', uploadSingleImage('file'), uploadController.uploadSingleFile);
router.post('/image', uploadSingleImage('image'), uploadController.uploadSingleFile);
router.post('/avatar', authenticateToken, uploadSingleImage('avatar'), uploadController.uploadAvatar);
router.post('/documents', authenticateToken, uploadMultipleDocuments('documents', 5), uploadController.uploadDocuments);
export default router;