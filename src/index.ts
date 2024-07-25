import express from 'express';
import uploadFile from './routes/uploadFile'
import dotenv from 'dotenv';
const cors = require('cors')
dotenv.config();

const app = express();
const port = 5437;

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use('/api',uploadFile)

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
