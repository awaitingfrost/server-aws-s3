import { S3Client } from '@aws-sdk/client-s3';
import AWS from 'aws-sdk';
require('dotenv').config();



const AWS_BUCKET_NAME='file-upload-test-server'
const AWS_REGION_NAME='ap-south-1'


// const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
// const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;
// const AWS_SESSION_TOKEN = process.env.AWS_SESSION_TOKEN;

const AWS_ACCESS_KEY_ID="ASIA5FTY7IYQPTVL575Q"
const AWS_SECRET_ACCESS_KEY="bSZZ/aJ8uM+ZkZLDTn8s1QkMTycwPKEoipBGRMR4"
const AWS_SESSION_TOKEN="IQoJb3JpZ2luX2VjEBcaCmFwLXNvdXRoLTEiRzBFAiEAnsQiLByWK12ej0zPqLgd09k1siPLQp4b1HD5acXFXL8CIGTVEavSyZvmdR82i9qDn/ZtN3rvosP8hlDgu8wKNYn3Kp0DCPD//////////wEQABoMOTA1NDE4MDY1NDQwIgxdk5U26Z9RKC64vtoq8QK5wRVb3e0BFSUBBU9UXUcvzy8OHCPPZ2eTitrbd1y4PzjvRKYed5O+9ETFi949u0xjhgx75NTEbIg9M8/1mDvfhE/NbKXHexYZnPNOk74z/HmGoKxGAyoKHat3BKW//NwSoB3Ryv5u4GOf/bjnzz0YhE+cp3E2AAyxwffmHF8XkQWsUJhHxxHHjdwW2useXxoPJXiDyxWCAjvGNrrP7Ps25AslZnki1riy7bk8p+4DLjrtObGXfEFfjOnJ7RmZaIslV4TEvxww0lA/053DJ3tjokza1Z7UHmaOxJsBjN3YKBvI5nOsraS0C7EQWeeP/VE/BsD+afT+R++af0aCaVI1IHKyz3vv6noWaNGZtjvD/jz0GbclipDYbAaNmlQB4dVgfNWT8lerHa0XosHNd41pG58xX8VY2r2+I/VAQLVcjg2N+Fz9wpUwVMorH14u+LIuoFXDROaaPHi6JfN1BDfhzTEplUAUwTCPqxYwKA3vlSUwvJeUtQY6pgFKvvtxknj1fr+V7a21OgP+ntp84a6cjOVgAKIp7slnePLiRlldRpaNbN+PGBOuByzesJUNu19h2gq9Cwvuy6kEXRu3yLDFuwn4G4tIMz9n9xfueHJP3c27Vnw/vOsrHTexIEYy89/UpH72l78F+2x83OSLr6tHUa31edD/GDXzQENg3ePrpAzbMKIZArrOunvSJQGjipAXP5X4tpk8Z8vWvmVaWh6H"

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