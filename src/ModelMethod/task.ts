import { taskModel } from '../Model/taskModel';
import * as fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

const databasePath = process.env.ENV;

export default class Task {
  tasks: Array<taskModel>;
  titleHash: Record<string, Array<number>> = {};
  descriptionHash: Record<string, Array<number>> = {};
  _ids: Record<string, number> = {};

  constructor() {
    const tasksBuffer_string = fs
      .readFileSync(`${__dirname}/../../${databasePath}/Tasks.json`)
      .toString();
    const HashTitleBuffer_string = fs
      .readFileSync(`${__dirname}/../../${databasePath}/hash_title.json`)
      .toString();
    const HashDescriptionBuffer_string = fs
      .readFileSync(`${__dirname}/../../${databasePath}/hash_description.json`)
      .toString();
    const HashIdsBuffer_string = fs
      .readFileSync(`${__dirname}/../../${databasePath}/ids_index.json`)
      .toString();

    this.tasks = JSON.parse(tasksBuffer_string);
    this.titleHash = JSON.parse(HashTitleBuffer_string);
    this.descriptionHash = JSON.parse(HashDescriptionBuffer_string);
    this._ids = JSON.parse(HashIdsBuffer_string);
  }
  private writeData(): boolean {
    try {
      fs.writeFileSync(
        `${__dirname}/../../${databasePath}/Tasks.json`,
        JSON.stringify(this.tasks)
      );
      fs.writeFileSync(
        `${__dirname}/../../${databasePath}/hash_title.json`,
        JSON.stringify(this.titleHash)
      );
      fs.writeFileSync(
        `${__dirname}/../../${databasePath}/hash_description.json`,
        JSON.stringify(this.descriptionHash)
      );
      fs.writeFileSync(
        `${__dirname}/../../${databasePath}/ids_index.json`,
        JSON.stringify(this._ids)
      );
      return true;
    } catch (error) {
      return false;
    }
  }

  private binarySearch = (
    arr: number[],
    low: number,
    high: number,
    key: number
  ): number => {
    if (high < low) return -1;

    const mid = Math.trunc((low + high) / 2);
    if (key == arr[mid]) return mid;
    if (key > arr[mid]) return this.binarySearch(arr, mid + 1, high, key);
    return this.binarySearch(arr, low, mid - 1, key);
  };

  private addHashingFile(taskData: taskModel): void {
    const { id, title, description } = taskData;

    const index = this._ids[id];
    if (title in this.titleHash) this.titleHash[title].push(index);
    else this.titleHash[title] = [index];

    if (description in this.descriptionHash)
      this.descriptionHash[description].push(index);
    else this.descriptionHash[description] = [index];
  }

  private removeHashingFile(index: number): void {
    const lastTitle = this.tasks[index].title;
    const lastDescription = this.tasks[index].description;

    this.titleHash[lastTitle].sort((a: number, b: number) => {
      return a - b;
    });
    const findTitleIndex = this.binarySearch(
      this.titleHash[lastTitle],
      0,
      this.titleHash[lastTitle].length,
      index
    );
    this.titleHash[lastTitle].splice(findTitleIndex, 1);
    if (this.titleHash[lastTitle].length == 0) delete this.titleHash[lastTitle];

    this.descriptionHash[lastDescription].sort((a: number, b: number) => {
      return a - b;
    });
    const findDescriptionIndex = this.binarySearch(
      this.descriptionHash[lastDescription],
      0,
      this.descriptionHash[lastDescription].length,
      index
    );
    this.descriptionHash[lastDescription].splice(findDescriptionIndex, 1);

    if (this.descriptionHash[lastDescription].length == 0)
      delete this.descriptionHash[lastDescription];
  }

  createTask(taskData: taskModel): taskModel {
    const { id, title, description } = taskData;
    if (id in this._ids === true) {
      throw 'ID is Exist';
    }
    this._ids[id] = Object.keys(this._ids).length;
    this.addHashingFile(taskData);
    this.tasks.push({ id, title, description });
    const answer = this.writeData();
    if (answer) return { id, title, description };
    else throw 'Error when add task';
  }

  editTask(taskData: taskModel): taskModel {
    const { id, title, description } = taskData;
    if (!(id in this._ids)) {
      throw 'Not Found';
    }
    const index = this._ids[id];

    this.removeHashingFile(index);

    this.addHashingFile(taskData);

    this.tasks[index].title = title;
    this.tasks[index].description = description;

    const answer = this.writeData();
    if (answer) return { id, title, description };
    else throw 'Error when Edit task';
  }

  deleteTask(_id: string): string {
    if (!(_id in this._ids)) throw 'Not Found';
    const index = this._ids[_id];
    const lastIndex = this.tasks.length - 1;
    if (index === lastIndex) {
      this.removeHashingFile(index);
    } else {
      const lastId = this.tasks[lastIndex].id;
      this._ids[lastId] = index;
      this.removeHashingFile(index);
      this.removeHashingFile(lastIndex);
      this.addHashingFile(this.tasks[lastIndex]);
      this.tasks[index] = this.tasks[lastIndex];
    }
    delete this._ids[_id];
    this.tasks.pop();

    const answer = this.writeData();
    if (answer) return 'Deleted';
    else throw 'Error when delete task';
  }
  getAllTask(): taskModel[] {
    const tasks = this.tasks;
    return tasks;
  }

  getByTitle(title: string): taskModel[] {
    if (title in this.titleHash) {
      const index = this.titleHash[title];

      const ALlTask = index.map((element: number) => {
        if (element < this.tasks.length) return this.tasks[element];
        return { id: 'null', description: 'null', title: 'null' };
      });

      return ALlTask;
    } else throw 'Not Found';
  }

  getByDescription(description: string): taskModel[] {
    if (description in this.descriptionHash) {
      const index = this.descriptionHash[description];

      const ALlTask = index.map((element: number) => {
        if (element < this.tasks.length) return this.tasks[element];
        return { id: 'null', description: 'null', title: 'null' };
      });

      return ALlTask;
    } else throw 'Not Found';
  }

  getById(id: string): taskModel {
    if (id in this._ids) {
      const index = this._ids[id];
      const task = this.tasks[index];
      return task;
    } else throw 'Not Found';
  }
}
