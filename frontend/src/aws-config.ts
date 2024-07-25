import AWS from 'aws-sdk';

AWS.config.update({
  // accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
  // secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
  // region: import.meta.env.VITE_AWS_REGION_NAME,
  accessKeyId: 'ASIA5FTY7IYQBLFFP67J',
  secretAccessKey: 'E7vew7kYDJDj1CKZMThTg3qmHKwjhCBTpKJV+St5',
  sessionToken:"IQoJb3JpZ2luX2VjEJv//////////wEaCmFwLXNvdXRoLTEiSDBGAiEAtFDjWOuSIfZ0As/SVsibM8JEzpToU3Gq9bDT61gpuA4CIQDa3i61zNLf5n1stWuKWyF/E3VigmX2NlScL13mbwiPmSqUAwh0EAAaDDkwNTQxODA2NTQ0MCIMj1murnlj7syzeJPvKvECRnbdZLqD+5LmoJhNmcySTzF69dApH5VfS/zkft9HkgFFZr+8Ty3NGaCQY0NJ2XdhnCCiNhWapUn6CDWr/kL9pAPNw9pph2Jcv5w5evjWTgnLXR0DWzvLrK8GdlN9REcZpQAwAv1pEiCm2K0FHLxmzNCmbOK0ReCmSgT0GyBhJpS0OuSV0GvYxiopviGifTN0fuf9/ovXujDwOqzRVr0xp66hCMnpmNmHlVU2fpK6OFchrpr8s3Q+gsZrxhxzSZUGLpuLfxMgcMVq6i7i552vcU/pvKx2hdXQYVcu/PvMjZCRf1pUw6ui1+rj5fXKpuVL/J/vw7l9iOd1xFZp3K+nv46i1t3bOeI730TnPN5EWaQOH29AaDbKVxsmTlFzgBgA99yIjXUTYZSVJdHLDVzstQ/Z1SgUymze0cViw8Mo5tSRZCmpC/uEZWciOpk7BuaPaVPPvVb0gsrT/+vllIPK4Uwkz9g7+2aGEGHDKKudzq9UMKCB+bQGOqUBolf5e/y48Qxl5XIzOjt4kMzs6S+7ykFwQ2d0EjBlg19M6anBLYifQr6GJ+5LLNPBgqls7VOX4b7lW8AWrWb4pfw27L8i2bBjNQ1AyIV+QwyeKMzQI0oAt0Mhrv1Q5QeVuSvVXfKUrJMKZZD2HIDo3M19DJ3tJAT0EHXty/4ofck5bGfLypPH0olGFP9gikZPScEyCGGQt+wMcHI62dbnM3PbyqvZ",
  region: 'ap-south-1'
});

  const s3 = new AWS.S3({
    params: { Bucket: import.meta.env.VITE_AWS_BUCKET_NAME },
  region: import.meta.env.VITE_AWS_REGION_NAME,
});

export const uploadFileToS3 = async (file:File) => {
  const params = {
    Bucket: import.meta.env.VITE_AWS_BUCKET_NAME,
    Key: file?.name,
    Body: file,
  };

  console.log(params,'inside config')

  try {
    console.log('starting uploading........')
    // const result = await s3.upload(params).promise();
    if(result){
      const signedUrl = s3.getSignedUrl('getObject', {
        Bucket: import.meta.env.VITE_AWS_BUCKET_NAME,
        Key: result.Key,
        Expires: 60 * 60, 
        ResponseContentDisposition: 'inline' 
      });
      return signedUrl;
}
    alert("File uploaded successfully........");

  } catch (error) {
    console.error(error);
    alert("Error uploading file: " + error?.message || '');
    return 43;
  }
};
