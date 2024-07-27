import { ListObjectsV2Command } from "@aws-sdk/client-s3";
import { s3Client } from "../aws-config";

export const listVideosInFolder = async({bucketName, folderName}: {
  bucketName:string,
  folderName:string
}) =>{
  const params = {
    Bucket: bucketName,
    Prefix: folderName
  };

  const command = new ListObjectsV2Command(params);
  const data = await s3Client.send(command);

  const videoExtensions = ['.mp4', '.avi', '.mov', '.wmv', '.flv', '.mkv'];
  return data?.Contents?.filter(obj => videoExtensions.some(ext => obj.Key?.toLowerCase().endsWith(ext)))
    .map(obj => obj.Key);
}