import express from 'express';
const router = express.Router();
import {startMultiPartUpload,getPresignedUrl,completeUpload,generateSinglePresignedURL,generateMultipleImagesUrl} from '../controllers/videoController'

router.post('/start-multipart-upload',startMultiPartUpload)
router.get('/s3/presigned-url',getPresignedUrl)
router.post('/complete-upload',completeUpload)
router.get('/generate-single-presigned',generateSinglePresignedURL)
router.get('/multiple-images',generateMultipleImagesUrl)

export default router;