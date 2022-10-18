import express from 'express';
import dotenv from 'dotenv';
import taskRouter from './Router/taskRouter';

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.use('/task', taskRouter);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});

export default app;
