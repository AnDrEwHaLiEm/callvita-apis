import express from 'express';
import dotenv from 'dotenv';
import taskRouter from './Router/taskRouter';
import cors from 'cors';
dotenv.config();
const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());

app.use('/task', taskRouter);

app.listen(port, () => {
  console.log(`Server is running at https://localhost:${port}`);
});

export default app;
