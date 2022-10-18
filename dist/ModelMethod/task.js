"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = __importStar(require("fs"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var databasePath = process.env.ENV;
var Task = /** @class */ (function () {
    function Task() {
        var _this = this;
        this.titleHash = {};
        this.descriptionHash = {};
        this._ids = {};
        this.binarySearch = function (arr, low, high, key) {
            if (high < low)
                return -1;
            var mid = Math.trunc((low + high) / 2);
            if (key == arr[mid])
                return mid;
            if (key > arr[mid])
                return _this.binarySearch(arr, mid + 1, high, key);
            return _this.binarySearch(arr, low, mid - 1, key);
        };
        var tasksBuffer_string = fs
            .readFileSync("".concat(__dirname, "/../../").concat(databasePath, "/Tasks.json"))
            .toString();
        var HashTitleBuffer_string = fs
            .readFileSync("".concat(__dirname, "/../../").concat(databasePath, "/hash_title.json"))
            .toString();
        var HashDescriptionBuffer_string = fs
            .readFileSync("".concat(__dirname, "/../../").concat(databasePath, "/hash_description.json"))
            .toString();
        var HashIdsBuffer_string = fs
            .readFileSync("".concat(__dirname, "/../../").concat(databasePath, "/ids_index.json"))
            .toString();
        this.tasks = JSON.parse(tasksBuffer_string);
        this.titleHash = JSON.parse(HashTitleBuffer_string);
        this.descriptionHash = JSON.parse(HashDescriptionBuffer_string);
        this._ids = JSON.parse(HashIdsBuffer_string);
    }
    Task.prototype.writeData = function () {
        try {
            fs.writeFileSync("".concat(__dirname, "/../../").concat(databasePath, "/Tasks.json"), JSON.stringify(this.tasks));
            fs.writeFileSync("".concat(__dirname, "/../../").concat(databasePath, "/hash_title.json"), JSON.stringify(this.titleHash));
            fs.writeFileSync("".concat(__dirname, "/../../").concat(databasePath, "/hash_description.json"), JSON.stringify(this.descriptionHash));
            fs.writeFileSync("".concat(__dirname, "/../../").concat(databasePath, "/ids_index.json"), JSON.stringify(this._ids));
            return true;
        }
        catch (error) {
            return false;
        }
    };
    Task.prototype.addHashingFile = function (taskData) {
        var id = taskData.id, title = taskData.title, description = taskData.description;
        var index = this._ids[id];
        if (title in this.titleHash)
            this.titleHash[title].push(index);
        else
            this.titleHash[title] = [index];
        if (description in this.descriptionHash)
            this.descriptionHash[description].push(index);
        else
            this.descriptionHash[description] = [index];
    };
    Task.prototype.removeHashingFile = function (index) {
        var lastTitle = this.tasks[index].title;
        var lastDescription = this.tasks[index].description;
        this.titleHash[lastTitle].sort(function (a, b) {
            return a - b;
        });
        var findTitleIndex = this.binarySearch(this.titleHash[lastTitle], 0, this.titleHash[lastTitle].length, index);
        this.titleHash[lastTitle].splice(findTitleIndex, 1);
        if (this.titleHash[lastTitle].length == 0)
            delete this.titleHash[lastTitle];
        this.descriptionHash[lastDescription].sort(function (a, b) {
            return a - b;
        });
        var findDescriptionIndex = this.binarySearch(this.descriptionHash[lastDescription], 0, this.descriptionHash[lastDescription].length, index);
        this.descriptionHash[lastDescription].splice(findDescriptionIndex, 1);
        if (this.descriptionHash[lastDescription].length == 0)
            delete this.descriptionHash[lastDescription];
    };
    Task.prototype.createTask = function (taskData) {
        var id = taskData.id, title = taskData.title, description = taskData.description;
        if (id in this._ids === true) {
            throw 'ID is Exist';
        }
        this._ids[id] = Object.keys(this._ids).length;
        this.addHashingFile(taskData);
        this.tasks.push({ id: id, title: title, description: description });
        var answer = this.writeData();
        if (answer)
            return { id: id, title: title, description: description };
        else
            throw 'Error when add task';
    };
    Task.prototype.editTask = function (taskData) {
        var id = taskData.id, title = taskData.title, description = taskData.description;
        if (!(id in this._ids)) {
            throw 'Not Found';
        }
        var index = this._ids[id];
        this.removeHashingFile(index);
        this.addHashingFile(taskData);
        this.tasks[index].title = title;
        this.tasks[index].description = description;
        var answer = this.writeData();
        if (answer)
            return { id: id, title: title, description: description };
        else
            throw 'Error when Edit task';
    };
    Task.prototype.deleteTask = function (_id) {
        if (!(_id in this._ids))
            throw 'Not Found';
        var index = this._ids[_id];
        var lastIndex = this.tasks.length - 1;
        if (index === lastIndex) {
            this.removeHashingFile(index);
        }
        else {
            var lastId = this.tasks[lastIndex].id;
            this._ids[lastId] = index;
            this.removeHashingFile(index);
            this.removeHashingFile(lastIndex);
            this.addHashingFile(this.tasks[lastIndex]);
            this.tasks[index] = this.tasks[lastIndex];
        }
        delete this._ids[_id];
        this.tasks.pop();
        var answer = this.writeData();
        if (answer)
            return 'Deleted';
        else
            throw 'Error when delete task';
    };
    Task.prototype.getAllTask = function () {
        var tasks = this.tasks;
        return tasks;
    };
    Task.prototype.getByTitle = function (title) {
        var _this = this;
        if (title in this.titleHash) {
            var index = this.titleHash[title];
            var ALlTask = index.map(function (element) {
                if (element < _this.tasks.length)
                    return _this.tasks[element];
                return { id: 'null', description: 'null', title: 'null' };
            });
            return ALlTask;
        }
        else
            throw 'Not Found';
    };
    Task.prototype.getByDescription = function (description) {
        var _this = this;
        if (description in this.descriptionHash) {
            var index = this.descriptionHash[description];
            var ALlTask = index.map(function (element) {
                if (element < _this.tasks.length)
                    return _this.tasks[element];
                return { id: 'null', description: 'null', title: 'null' };
            });
            return ALlTask;
        }
        else
            throw 'Not Found';
    };
    Task.prototype.getById = function (id) {
        if (id in this._ids) {
            var index = this._ids[id];
            var task = this.tasks[index];
            return task;
        }
        else
            throw 'Not Found';
    };
    return Task;
}());
exports.default = Task;
