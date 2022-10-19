import supertest from 'supertest';
import app from '..';
import { taskModel } from '../Model/taskModel';
import Task from '../ModelMethod/task';
import * as fs from 'fs';
import {
  tasksTest,
  idsSave,
  idsTest,
  titleTest,
  descriptionTest,
  descriptionSave,
  taksSave,
  titleSave,
} from './dataTest';

const request = supertest(app);

describe('task Tests EndPint', () => {
  it('Create Task Test', async () => {
    const taskData: taskModel = {
      id: 100,
      title: 'Success',
      description: 'Any One Can Do Any Thing But Brave One Does it',
    };
    const response = await request.post('/task/create').send(taskData);

    const { id, title, description } = taskData;
    idsTest[id] = Object.keys(idsTest).length;
    titleTest[title] = [idsTest[id]];
    descriptionTest[description] = [idsTest[id]];
    tasksTest.push(taskData);
    const testDataBase = new Task();

    expect(response.status).toEqual(200);
    expect(response.body).toEqual(taskData);
    expect(testDataBase._ids).toEqual(idsTest);
    expect(testDataBase.titleHash).toEqual(titleTest);
    expect(testDataBase.descriptionHash).toEqual(descriptionTest);
    expect(testDataBase.tasks).toEqual(tasksTest);
  });

  it('create exist Id', async () => {
    const taskData: taskModel = {
      id: 100,
      title: 'Success',
      description: 'Any One Can Do Any Thing But Brave One Does it',
    };
    const response = await request.post('/task/create').send(taskData);
    expect(response.status).toEqual(400);
    expect(response.body).toEqual('ID is Exist');
  });

  it('Edit One Task', async () => {
    const taskData = {
      title: 'All Test Is Pass',
      description: 'You can Fly Wihtout wings, just use plane :)',
    };
    const response = await request.put('/task/edit/100').send(taskData);
    const { title, description } = taskData;
    titleTest[title] = [5];
    descriptionTest[description] = [5];
    tasksTest[5].title = title;
    tasksTest[5].description = description;
    delete titleTest['Success'];
    delete descriptionTest['Any One Can Do Any Thing But Brave One Does it'];
    const testDataBase = new Task();
    expect(response.status).toEqual(200);
    expect(response.body).toEqual({ id: '100', ...taskData });
    expect(testDataBase._ids).toEqual(idsTest);
    expect(testDataBase.titleHash).toEqual(titleTest);
    expect(testDataBase.descriptionHash).toEqual(descriptionTest);
    expect(testDataBase.tasks).toEqual(tasksTest);
  });

  it('delete One Task', async () => {
    const response = await request.delete('/task/delete/4');
    idsTest['100'] = 3;
    delete idsTest['4'];
    titleTest['All Test Is Pass'] = [3];
    descriptionTest['You can Fly Wihtout wings, just use plane :)'] = [3];
    titleTest['Learn Jasmine Test'] = [4];
    descriptionTest['Learn how to use Test with Jasmine'] = [4];
    tasksTest.pop();
    tasksTest[3].id = 100;
    tasksTest[3].title = 'All Test Is Pass';
    tasksTest[3].description = 'You can Fly Wihtout wings, just use plane :)';
    const testDataBase = new Task();
    expect(response.status).toEqual(200);
    expect(response.body).toEqual('Deleted');
    expect(testDataBase._ids).toEqual(idsTest);
    expect(testDataBase.titleHash).toEqual(titleTest);
    expect(testDataBase.descriptionHash).toEqual(descriptionTest);
    expect(testDataBase.tasks).toEqual(tasksTest);
  });


  it('delete unexist Task', async () => {
    const response = await request.delete('/task/delete/454');
    console.log(response.body);
    expect(response.status).toEqual(400);
    expect(response.body).toEqual("Not Found");
  });

  it('get All Tasks', async () => {
    const response = await request.get('/task/getMany');
    expect(response.body).toEqual(tasksTest);
  });
  it('get All Tasks By Title', async () => {
    const response = await request.get(`/task/get/title/${tasksTest[3].title}`);
    expect(response.body).toEqual([tasksTest[3]]);
  });

  it('get All Tasks By description', async () => {
    const response = await request.get(
      `/task/get/description/${tasksTest[4].description}`
    );
    expect(response.body).toEqual([tasksTest[4]]);
  });

  it('get One Tasks By Id', async () => {
    const response = await request.get(`/task/getOne/1`);
    expect(response.body).toEqual(tasksTest[0]);
  });

  afterAll(() => {
    fs.writeFileSync(
      `${__dirname}/../../dataBaseTest/Tasks.json`,
      JSON.stringify(taksSave)
    );
    fs.writeFileSync(
      `${__dirname}/../../dataBaseTest/hash_title.json`,
      JSON.stringify(titleSave)
    );
    fs.writeFileSync(
      `${__dirname}/../../dataBaseTest/hash_description.json`,
      JSON.stringify(descriptionSave)
    );
    fs.writeFileSync(
      `${__dirname}/../../dataBaseTest/ids_index.json`,
      JSON.stringify(idsSave)
    );
  });
});
