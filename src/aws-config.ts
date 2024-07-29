import { S3Client } from '@aws-sdk/client-s3';
import AWS from 'aws-sdk';
require('dotenv').config();



const AWS_BUCKET_NAME='file-upload-test-server'
const AWS_REGION_NAME='ap-south-1'


// const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
// const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;
// const AWS_SESSION_TOKEN = process.env.AWS_SESSION_TOKEN;

const AWS_ACCESS_KEY_ID="ASIA5FTY7IYQORXFDQWW"
const AWS_SECRET_ACCESS_KEY="kDumNzZ3nKp650pqDkwf89w00C4nW55eSG567wBF"
const AWS_SESSION_TOKEN="IQoJb3JpZ2luX2VjED4aCmFwLXNvdXRoLTEiSDBGAiEAlOLbuhr3GO41CYeNWArz8nBTRX9FDFdKw2zB/WsUP3gCIQCXtPSoLpbG425Jp6TdvwgF7gKRR2TCtOhlQYIOPzS+8yqUAwgnEAAaDDkwNTQxODA2NTQ0MCIMbyRX6Q3Du4ZIAx+QKvECPtR4dUubR832Ha//jyLvMjtT6sVG/36tWIXbjs9dEENVY5Ib8P1pUwJi48wZTkWbb+ThKh1fTs1MwEU0e7P5zVcMv1gT+VB9hEdYRQwUrmqMvfcrdG4wKNngUOZRasoSi6BIqEWS3EKiZZ8PsoNjomaQ5f1CvE5jQpAAdCxkl5cA5prlunPjTouDz3LYGER4RbeCuyfGctE2kZddM3jh0PD8+ra84CIJ+vYDrl/FSzlKOmZ8AciXLYfks6+p9bp/OK5IjPd+pAowwR1/Cll5n0Wl5o7BnMFUS4mwBNe8v4SBUGAmd/2WmFAOS2eloJHRdfiBdVCOJcDcuruMrUtmLp40BGTD5MPIQ6yk9o+HQWvxjN3h0XpjLOue7DMIxcJcr1Diik0H1S1/ZEvclS0wN++FhIJ2AJYJaFcE20wF5cYWtA8DUMvwmwhaFsXQqzvNu7zYsQbv5sSSH8Z24QBskoG7kutuyQ1dUAbMLqg+TwwSMKHbnLUGOqUB7jXgj2uonWAeDeHMHh2AwL56obRlnuRLSeI1qcRwN8ORhps1Vq9DjiZFWmWYjHldgx3JlDIY/lofqnmPxfBxbnvdfjylZKiD7I/QONSHvWBgJDhgre3ZLc9uxKUTdi/SQCOpjaI38RZNxo0ww3pfj+ZRozMPWPXNc6teO/okQV72BZPJdi40PsHVuWISukE9yumWJWdKlcPRZDc0ikRW1z7O1KVu"

export const s3 = new AWS.S3({
  region: AWS_REGION_NAME,
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
  sessionToken: AWS_SESSION_TOKEN,
});

export const s3Client = new S3Client({
  region:AWS_REGION_NAME,
  credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey:AWS_SECRET_ACCESS_KEY,
    sessionToken: AWS_SESSION_TOKEN,
  }
});