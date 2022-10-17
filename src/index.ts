import express from 'express';
import dotenv from 'dotenv';
import taskRouter from './Router/taskRouter';

const app = express();

dotenv.config();

app.use(express.json());

app.use('/task', taskRouter);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
