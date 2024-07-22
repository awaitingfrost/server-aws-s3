// Import AWS SDK
import AWS from 'aws-sdk'
import express from 'express'

// Configure AWS credentials
AWS.config.update({
  accessKeyId: 'ASIA5FTY7IYQEO2RTK7V',
  secretAccessKey: 'Hb93VsA1Ab3KJPAm22sT09/YK5MClZWPQuMSIxcQ',
  sessionToken: 'IQoJb3JpZ2luX2VjEJv//////////wEaCmFwLXNvdXRoLTEiSDBGAiEAog7htVcDU9fJSiVng9Fd3Ao4AXA55qbtofKiwXHhRkYCIQCYUbjaCsX0Q28qmSfFyXFgFHuyt7rIrLzGey4NrOLJIiqUAwh0EAAaDDkwNTQxODA2NTQ0MCIMPd2a217SOhyG6AWSKvECIoktuxNmq9JtEujBGI0dS2u2Qxi+T8hHmGZSSMM/lLiU0lsq0c2FEyYgbdMCxN82RKgQ3BcFZuX2VIrjN5lwpESgpAzk6CNITXW3nVo56MajCXJZKKNVsm9OEj8bYiK1Vw1dao3OF9exzepF3sKsTb0M0Yns+WAZh8/tkNucOJt0y3imw2u4H6iqkxtPOXDky/QHYTROVyz6jyctYVbmo6YY84ohNRWPD/MZbf2oUnyPbQ/Ll9efp3uJkdRR6nKbW3EBgR0goXkIa1rqOkuclajrIqx59WkCPqFo1u6cIIQYpB94zgxR7EDPTz5smwWvGFrsBGfsEdIC4bpqKfuMDcR9Erw/piJqvwJ8n1MowB2dluMSTFyUKpy1l4T/Oy284s3V/KTYXZHHQ+HWG3D4R23OVi9vFDyAU6ZWwDzNB9kUuOaOSwq1RHUE5jj6xByGkgSj2VXc6KqiKg3KEc6z6RZE1kb14l5JAO40B5TGf7feMN/u+LQGOqUBlrnNbeGz+QmEdM//Ze4hq9mReO1qX0rpGapnyXvrX6xPzmwQmn/F6LlcrT2GUNL0T2L9olcdFxgaluPkZDcEdi9gbSCy5Nr2DdFhO23mFCGz83H7hDnbJ3jCNUa/aL+BEpZ/Tkvsnukxj3htDFWQ6Ei/Gw+niSOMYiqGST3Vd4oO6tZQtpWWgmIz31Lhv+2RwmSZcWR8FCRbWnZ8egwKBCFk0yA9',
  region: 'ap-south-1'
});

// Create S3 service object
const s3 = new AWS.S3();

const app = express();
const port = 3000;
// Example: List objects in a bucket
// s3://mero-upaya-assets/-5MFELcp-0-02-03-df638c092fefe568a1684990ab15b32195b21cb477ba63fd6bd333c817f5aa44_15faea75f5dd7455.jpg
// const params = {
//   Bucket: 'mero-upaya-assets'
// };

// s3.listObjects(params, (err, data) => {
//   if (err) {
//     console.error("Error:", err);
//     return;
//   }

//   // console.log("Objects in bucket:", data.Contents);

//   // Retrieve specific object
//   const objectKey = '-5MFELcp-0-02-03-df638c092fefe568a1684990ab15b32195b21cb477ba63fd6bd333c817f5aa44_15faea75f5dd7455.jpg';
//   const getObjectParams = {
//     Bucket: 'mero-upaya-assets',
//     Key: objectKey
//   };

//   // Retrieve object from S3
//   s3.getObject(getObjectParams, (err, objectData) => {
//     if (err) {
//       console.error("Error retrieving object:", err);
//       return;
//     }

//     console.log("Object data:", objectData);

//     // Example: Send object data to frontend
//     // Assuming you're using a web framework or API to serve this data
//     // You can send `objectData.Body` to your frontend
//   });
// });

app.get('/assets/image.jpg', (req, res) => {
  const objectKey = 'wallpaperflare.com_wallpaper.jpg'; // Replace with your object key

  const params = {
    Bucket: 'file-upload-test-server',
    Key: objectKey
  };

  // Retrieve object from S3
  // s3.getObject(params, (err, data) => {
  //   if (err) {
  //     console.error("Error retrieving object:", err);
  //     return res.status(500).send("Error retrieving object from S3");
  //   }

  // Send object data as response
  // res.setHeader('Content-disposition', `attachment; filename=${objectKey}`);
  // res.setHeader('Content-Length', data.ContentLength);
  // res.setHeader('Content-Type', data.ContentType);
  // res.send(data.Body);
  s3.headObject(params, (err, metadata) => {
    if (err) {
      console.error("Error retrieving image metadata:", err);
      return res.status(500).send("Error retrieving image from S3");
    }

    // Set content type for image (e.g., JPEG, PNG)
    res.setHeader('Content-Type', metadata.ContentType);
    res.setHeader('Content-Length', metadata.ContentLength);
    const stream = s3.getObject(params).createReadStream();
    stream.pipe(res);
  });
});

app.get('/assets/image2.jpg', (req, res) => {
  const objectKey = '-5MFELcp-0-02-03-df638c092fefe568a1684990ab15b32195b21cb477ba63fd6bd333c817f5aa44_15faea75f5dd7455.jpg'; // Replace with your object key

  const params = {
    Bucket: 'mero-upaya-assets',
    Key: objectKey
  };

  // Retrieve object from S3;
  s3.getObject(params, (err, data) => {
    if (err) {
      console.error("Error retrieving object:", err);
      return res.status(500).send("Error retrieving object from S3");
    }

    // Send object data as response
    // res.setHeader('Content-disposition', `attachment; filename=${objectKey}`);
    res.setHeader('Content-Length', data.ContentLength);
    res.setHeader('Content-Type', data.ContentType);
    res.send(data.Body);
    // s3.headObject(params, (err, metadata) => {
    //   if (err) {
    //     console.error("Error retrieving image metadata:", err);
    //     return res.status(500).send("Error retrieving image from S3");
    //   }

    //   // Set content type for image (e.g., JPEG, PNG)
    //   res.setHeader('Content-Type', metadata.ContentType);
    //   res.setHeader('Content-Length', metadata.ContentLength);
    //   const stream = s3.getObject(params).createReadStream();
    //   stream.pipe(res);
  })
});
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});