import { taskModel } from '../Model/taskModel';
import * as fs from 'fs';

const compare = (a: number, b: number): number => {
  return a - b;
};

export default class Task {
  tasks: Array<taskModel>;
  titleHash: Record<string, Array<number>> = {};
  descriptionHash: Record<string, Array<number>> = {};
  _ids: Record<string, number> = {};

  constructor() {
    const tasksBuffer_string = fs
      .readFileSync(`${__dirname}/../../dataBase/Tasks.json`)
      .toString();
    const HashTitleBuffer_string = fs
      .readFileSync(`${__dirname}/../../dataBase/hash_title.json`)
      .toString();
    const HashDescriptionBuffer_string = fs
      .readFileSync(`${__dirname}/../../dataBase/hash_description.json`)
      .toString();
    const HashIdsBuffer_string = fs
      .readFileSync(`${__dirname}/../../dataBase/ids_index.json`)
      .toString();

    this.tasks = JSON.parse(tasksBuffer_string);
    this.titleHash = JSON.parse(HashTitleBuffer_string);
    this.descriptionHash = JSON.parse(HashDescriptionBuffer_string);
    this._ids = JSON.parse(HashIdsBuffer_string);
  }
  writeData(): boolean {
    try {
      fs.writeFileSync(
        `${__dirname}/../../dataBase/Tasks.json`,
        JSON.stringify(this.tasks)
      );
      fs.writeFileSync(
        `${__dirname}/../../dataBase/hash_title.json`,
        JSON.stringify(this.titleHash)
      );
      fs.writeFileSync(
        `${__dirname}/../../dataBase/hash_description.json`,
        JSON.stringify(this.descriptionHash)
      );
      fs.writeFileSync(
        `${__dirname}/../../dataBase/ids_index.json`,
        JSON.stringify(this._ids)
      );
      return true;
    } catch (error) {
      return false;
    }
  }

  binarySearch = (
    arr: number[],
    low: number,
    high: number,
    key: number
  ): number => {
    if (high <= low) return -1;

    const mid = Math.trunc((low + high) / 2);
    if (key == arr[mid]) return mid;
    if (key > arr[mid]) return this.binarySearch(arr, mid + 1, high, key);
    return this.binarySearch(arr, low, mid - 1, key);
  };

  addHashingFile(taskData: taskModel): void {
    const { id, title, description } = taskData;
    if (title in this.titleHash) {
      this.titleHash[title].push(this._ids[id]);
    } else {
      this.titleHash[title] = [this._ids[id]];
    }
    if (description in this.descriptionHash) {
      this.descriptionHash[description].push(this._ids[id]);
    } else {
      this.descriptionHash[description] = [this._ids[id]];
    }
  }

  removeHashingFile(index: number): void {
    const lastTitle = this.tasks[index].title;
    const lastDescription = this.tasks[index].description;

    this.titleHash[lastTitle].sort(compare);
    const findIndexFromTitleHash = this.binarySearch(
      this.titleHash[lastTitle],
      0,
      this.titleHash[lastTitle].length,
      index
    );
    this.titleHash[lastTitle].splice(findIndexFromTitleHash, 1);

    if (this.titleHash[lastTitle].length == 0) delete this.titleHash[lastTitle];

    this.descriptionHash[lastDescription].sort();
    const findIndexFromDescriptionHash = this.binarySearch(
      this.descriptionHash[lastDescription],
      0,
      this.descriptionHash[lastDescription].length,
      index
    );
    this.descriptionHash[lastDescription].splice(
      findIndexFromDescriptionHash,
      1
    );

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
    console.log(index, lastIndex);
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
        const task = this.tasks[element];
        return task;
      });
      return ALlTask;
    } else throw 'Not Found';
  }

  getByDescription(description: string): taskModel[] {
    if (description in this.descriptionHash) {
      const index = this.descriptionHash[description];
      const ALlTask = index.map((element: number) => {
        const task = this.tasks[element];
        return task;
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
