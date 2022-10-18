import { taskModel } from '../Model/taskModel';
const idsTest: Record<string, number> = {
  '1': 0,
  '2': 1,
  '3': 2,
  '4': 3,
  '12': 4,
};

const tasksTest: taskModel[] = [
  {
    id: 1,
    title: 'Learn React',
    description: 'Learn how to use react in building web app',
  },
  {
    id: 2,
    title: 'Learn Node',
    description: 'Learn how to use node in building server',
  },
  {
    id: 3,
    title: 'Learn Array Manipulation',
    description: 'Learn how to manipulate arrays in javascript',
  },
  {
    id: 4,
    title: 'Learn Jasmine Test',
    description: 'Learn how to use Test with Jasmine',
  },
  {
    id: 12,
    title: 'Learn Jasmine Test',
    description: 'Learn how to use Test with Jasmine',
  },
];

const titleTest: Record<string, number[]> = {
  'Learn React': [0],
  'Learn Node': [1],
  'Learn Array Manipulation': [2],
  'Learn Jasmine Test': [3, 4],
};

const descriptionTest: Record<string, number[]> = {
  'Learn how to use react in building web app': [0],
  'Learn how to use node in building server': [1],
  'Learn how to manipulate arrays in javascript': [2],
  'Learn how to use Test with Jasmine': [3, 4],
};
const idsSave: Record<string, number> = {
  '1': 0,
  '2': 1,
  '3': 2,
  '4': 3,
  '12': 4,
};
const taksSave: taskModel[] = [
  {
    id: 1,
    title: 'Learn React',
    description: 'Learn how to use react in building web app',
  },
  {
    id: 2,
    title: 'Learn Node',
    description: 'Learn how to use node in building server',
  },
  {
    id: 3,
    title: 'Learn Array Manipulation',
    description: 'Learn how to manipulate arrays in javascript',
  },
  {
    id: 4,
    title: 'Learn Jasmine Test',
    description: 'Learn how to use Test with Jasmine',
  },
  {
    id: 12,
    title: 'Learn Jasmine Test',
    description: 'Learn how to use Test with Jasmine',
  },
];

const titleSave: Record<string, number[]> = {
  'Learn React': [0],
  'Learn Node': [1],
  'Learn Array Manipulation': [2],
  'Learn Jasmine Test': [3, 4],
};

const descriptionSave: Record<string, number[]> = {
  'Learn how to use react in building web app': [0],
  'Learn how to use node in building server': [1],
  'Learn how to manipulate arrays in javascript': [2],
  'Learn how to use Test with Jasmine': [3, 4],
};
export {
  idsTest,
  tasksTest,
  titleTest,
  descriptionTest,
  idsSave,
  taksSave,
  titleSave,
  descriptionSave,
};
