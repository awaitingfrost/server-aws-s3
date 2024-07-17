import express, { Request, Response } from 'express';

const app = express();
const port = 3000;

app.use(express.json());

app.use(express.urlencoded({ extended: true }));


app.get('/', (req: Request, res: Response) => {
  res.send('Hello, World!');
});

app.post('/', (req: Request, res: Response) => {
  const bodyPayload = req.body();
  console.log(bodyPayload)
})

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
