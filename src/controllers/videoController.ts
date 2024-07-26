import { Request,Response } from "express"
import express from 'express';
const router = express.Router();
import { s3 } from "../aws-config";

const AWS_BUCKET_NAME = 'file-upload-test-server';


export const generateSinglePresignedURL = async(req:Request,res:Response)=>{
try{
    const {filename,filetype} =req.query;
    const key = `SINGLE-UPLOAD/file-${filename}`;

    const params = {
      Bucket: AWS_BUCKET_NAME,
      Key: key,
      Expires:60*60,
      ContentType:filetype
    }

    const getSignedUrl = await s3.getSignedUrlPromise("putObject",params);
    res.status(200).json({
      getSignedUrl
    })
} 
  catch(error){
    res.status(500).json({
      error:"Error generating presigned url"
    })
  }

}

export const startMultiPartUpload = async(req:Request,res:Response) => {
  const { filename,fileType } = req.body;
  const key = `MULTI-UPLOAD/file-${filename}`;

  const params = {
    Bucket: AWS_BUCKET_NAME,
    Key: key,
    ContentType:fileType
  };

  try {
    const data = await s3.createMultipartUpload(params).promise();
    const uploadId = data.UploadId;
    res.json({ uploadId: uploadId, key: key });
  } catch (error) {
    res.status(500).json({ error: 'Failed to start multipart upload' });
  }
}

export const getPresignedUrl = async(req:Request,res:Response) => {
  const {key,partNumber,uploadId} = req.query;
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key,
    Expires: 60 * 60, 
    PartNumber: partNumber,
    UploadId: uploadId,
  };

  const presignedUrl = s3.getSignedUrl('uploadPart',{...params})
  res.status(200).json(presignedUrl);
}

interface UploadPart {
  PartNumber: number;
  ETag: string;
}

export const completeUpload = async (req:Request, res:Response) => {
  const { uploadId, key, parts } = req.body;

  try {
    const params = {
      Bucket: AWS_BUCKET_NAME,
      Key: key,
      UploadId: uploadId,
      MultipartUpload: {
        Parts: parts?.map((part: UploadPart) => ({
          PartNumber: part.PartNumber,
          ETag: part.ETag.replace(/^"|"$/g, '')
        }))
      }
    };

    const result = await new Promise((resolve, reject) => {
      s3.completeMultipartUpload(params, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data.Location);
        }
      });
    });
    res.json({ success: true, data: result });

} catch (error) {
  res.send('Error completing multipart upload:');
}
}

export const generateMultipleImagesUrl = async(req:Request,res:Response) => {
  const { filename,filetype } = req.query;

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `MULTIPLE-IMAGES/${filename}`,
    Expires: 60 * 60, 
    ContentType: filetype,
  };

  const url = s3.getSignedUrl('putObject',{...params})
  if(url){
    res.send(url)
  } else{
    res.send({message:"error uploading image"})
  }
}


export default router;