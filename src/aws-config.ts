import AWS from 'aws-sdk';
require('dotenv').config();



const AWS_BUCKET_NAME='file-upload-test-server'
const AWS_REGION_NAME='ap-south-1'


const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;
const AWS_SESSION_TOKEN = process.env.AWS_SESSION_TOKEN;

export const s3 = new AWS.S3({
  region: AWS_REGION_NAME,
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
  sessionToken: AWS_SESSION_TOKEN,
});