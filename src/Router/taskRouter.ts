import express, { Request, Response } from 'express';
import { taskModel } from '../Model/taskModel';
import Task from '../ModelMethod/task';

const taskRouter = express.Router();

taskRouter.post('/create', async (req: Request, res: Response) => {
  try {
    const taskData: taskModel = {
      id: req.body.id,
      title: req.body.title,
      description: req.body.description,
    };
    const task = new Task();
    const result = task.createTask(taskData);
    return res.json(result);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
});

taskRouter.put('/edit/:_id', async (req: Request, res: Response) => {
  try {
    const taskData: taskModel = {
      id: req.params._id,
      title: req.body.title,
      description: req.body.description,
    };
    const task = new Task();
    const result = task.editTask(taskData);
    return res.json(result);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
});

taskRouter.delete('/delete/:_id', async (req: Request, res: Response) => {
  try {
    const { _id } = req.params;
    const task = new Task();
    const result = task.deleteTask(_id);
    return res.json(result);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
});

taskRouter.get('/getMany', async (req: Request, res: Response) => {
  try {
    const task = new Task();
    const result = task.getAllTask();
    return res.json(result);
  } catch (err) {
    res.status(404);
    res.json(err);
  }
});

taskRouter.get('/get/title/:title', async (req: Request, res: Response) => {
  try {
    const { title } = req.params;
    const task = new Task();
    const result = task.getByTitle(title);
    return res.json(result);
  } catch (err) {
    res.status(404);
    res.json(err);
  }
});

taskRouter.get(
  '/get/description/:description',
  async (req: Request, res: Response) => {
    try {
      const { description } = req.params;
      const task = new Task();
      const result = task.getByDescription(description);
      return res.json(result);
    } catch (err) {
      res.status(404);
      res.json(err);
    }
  }
);

taskRouter.get('/getOne/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const task = new Task();
    const result = task.getById(id);
    return res.json(result);
  } catch (err) {
    res.status(404);
    res.json(err);
  }
});

export default taskRouter;
