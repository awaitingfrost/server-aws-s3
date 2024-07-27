import express from 'express';
const router = express.Router();
import {startMultiPartUpload,getPresignedUrls,completeUpload,generateSinglePresignedURL,
  generateMultipleImagesUrl,getVideoList,
  getVideoUrls} from '../controllers/videoController'

router.post('/start-multipart-upload',startMultiPartUpload)
router.get('/s3/presigned-url',getPresignedUrls)
router.post('/complete-upload',completeUpload)
router.get('/generate-single-presigned',generateSinglePresignedURL)
router.get('/multiple-images',generateMultipleImagesUrl)
router.get('/list-videos',getVideoList)
router.post('/getvideo-urls',getVideoUrls)

export default router;