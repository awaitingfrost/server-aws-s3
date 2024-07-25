import { Request,Response } from "express"
import express from 'express';
const router = express.Router();
import { s3 } from "../aws-config";

const AWS_BUCKET_NAME = 'file-upload-test-server';


export const startMultiPartUpload = async(req:Request,res:Response) => {
  const { filename } = req.body;
  const key = `uploads/${Date.now()}-${filename}`;

  const params = {
    Bucket: AWS_BUCKET_NAME,
    Key: key,
    ContentType: 'application/octet-stream'
  };

  try {
    const data = await s3.createMultipartUpload(params).promise();
    const uploadId = data.UploadId;
    res.json({ uploadId: uploadId,key: key });
  } catch (error) {
    console.error('Error starting multipart upload:', error);
    res.status(500).json({ error: 'Failed to start multipart upload' });
  }
}

export const getPresignedUrl = async(req:Request,res:Response) => {
  const {key,partNumber,uploadId} = req.query;

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key,
    Expires: 60 * 60,
    ContentType: 'application/octet-stream',
    PartNumber: partNumber,
    UploadId: uploadId,
  };

  const presignedPost = s3.createPresignedPost({
    Bucket: params.Bucket,
    Fields: {
      key: params.Key,
      partNumber: params.PartNumber,
      uploadId: params.UploadId,
    },
    Conditions: [
      ['content-length-range', 0, 10 * 1024 * 1024],
    ],
    Expires: 3600,
  });

  res.json(presignedPost);
}


export const completeUpload = async (req:Request, res:Response) => {
  const { uploadId, key, parts } = req.body;

  if (!uploadId || !key || !parts) {
    return res.status(400).json({ error: 'Missing required parameters' });
  }

  const params = {
    Bucket: AWS_BUCKET_NAME,
    Key: key,
    UploadId: uploadId,
    MultipartUpload: { Parts: parts }
  };

  try {
    const result = await s3.completeMultipartUpload(params).promise();
    
    console.log('Multipart upload completed successfully:', result);
    
    res.json({
      success: true,
      message: 'File uploaded successfully',
      data: {
        location: result.Location,
        bucket: result.Bucket,
        key: result.Key,
        etag: result.ETag
      }
    });
  } catch (error) {
    console.error('Error completing multipart upload:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to complete multipart upload',
      error: (error as Error).message
    });
  }
}


export default router;