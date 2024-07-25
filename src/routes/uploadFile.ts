import express from 'express';
const router = express.Router();
import {getPresignedUrl,startMultiPartUpload,completeUpload} from '../controllers/videoController'

router.post('/start-multipart-upload',startMultiPartUpload)
router.get('/s3/presigned-url',getPresignedUrl)
router.post('/complete-upload',completeUpload)

export default router;