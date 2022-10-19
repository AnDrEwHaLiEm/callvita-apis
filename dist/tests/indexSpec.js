"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var supertest_1 = __importDefault(require("supertest"));
var __1 = __importDefault(require(".."));
var task_1 = __importDefault(require("../ModelMethod/task"));
var fs = __importStar(require("fs"));
var dataTest_1 = require("./dataTest");
var request = (0, supertest_1.default)(__1.default);
describe('task Tests EndPint', function () {
    it('Create Task Test', function () { return __awaiter(void 0, void 0, void 0, function () {
        var taskData, response, id, title, description, testDataBase;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    taskData = {
                        id: 100,
                        title: 'Success',
                        description: 'Any One Can Do Any Thing But Brave One Does it',
                    };
                    return [4 /*yield*/, request.post('/task/create').send(taskData)];
                case 1:
                    response = _a.sent();
                    id = taskData.id, title = taskData.title, description = taskData.description;
                    dataTest_1.idsTest[id] = Object.keys(dataTest_1.idsTest).length;
                    dataTest_1.titleTest[title] = [dataTest_1.idsTest[id]];
                    dataTest_1.descriptionTest[description] = [dataTest_1.idsTest[id]];
                    dataTest_1.tasksTest.push(taskData);
                    testDataBase = new task_1.default();
                    expect(response.status).toEqual(200);
                    expect(response.body).toEqual(taskData);
                    expect(testDataBase._ids).toEqual(dataTest_1.idsTest);
                    expect(testDataBase.titleHash).toEqual(dataTest_1.titleTest);
                    expect(testDataBase.descriptionHash).toEqual(dataTest_1.descriptionTest);
                    expect(testDataBase.tasks).toEqual(dataTest_1.tasksTest);
                    return [2 /*return*/];
            }
        });
    }); });
    it('create exist Id', function () { return __awaiter(void 0, void 0, void 0, function () {
        var taskData, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    taskData = {
                        id: 100,
                        title: 'Success',
                        description: 'Any One Can Do Any Thing But Brave One Does it',
                    };
                    return [4 /*yield*/, request.post('/task/create').send(taskData)];
                case 1:
                    response = _a.sent();
                    expect(response.status).toEqual(400);
                    expect(response.body).toEqual('ID is Exist');
                    return [2 /*return*/];
            }
        });
    }); });
    it('Edit One Task', function () { return __awaiter(void 0, void 0, void 0, function () {
        var taskData, response, title, description, testDataBase;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    taskData = {
                        title: 'All Test Is Pass',
                        description: 'You can Fly Wihtout wings, just use plane :)',
                    };
                    return [4 /*yield*/, request.put('/task/edit/100').send(taskData)];
                case 1:
                    response = _a.sent();
                    title = taskData.title, description = taskData.description;
                    dataTest_1.titleTest[title] = [5];
                    dataTest_1.descriptionTest[description] = [5];
                    dataTest_1.tasksTest[5].title = title;
                    dataTest_1.tasksTest[5].description = description;
                    delete dataTest_1.titleTest['Success'];
                    delete dataTest_1.descriptionTest['Any One Can Do Any Thing But Brave One Does it'];
                    testDataBase = new task_1.default();
                    expect(response.status).toEqual(200);
                    expect(response.body).toEqual(__assign({ id: '100' }, taskData));
                    expect(testDataBase._ids).toEqual(dataTest_1.idsTest);
                    expect(testDataBase.titleHash).toEqual(dataTest_1.titleTest);
                    expect(testDataBase.descriptionHash).toEqual(dataTest_1.descriptionTest);
                    expect(testDataBase.tasks).toEqual(dataTest_1.tasksTest);
                    return [2 /*return*/];
            }
        });
    }); });
    it('delete One Task', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response, testDataBase;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request.delete('/task/delete/4')];
                case 1:
                    response = _a.sent();
                    dataTest_1.idsTest['100'] = 3;
                    delete dataTest_1.idsTest['4'];
                    dataTest_1.titleTest['All Test Is Pass'] = [3];
                    dataTest_1.descriptionTest['You can Fly Wihtout wings, just use plane :)'] = [3];
                    dataTest_1.titleTest['Learn Jasmine Test'] = [4];
                    dataTest_1.descriptionTest['Learn how to use Test with Jasmine'] = [4];
                    dataTest_1.tasksTest.pop();
                    dataTest_1.tasksTest[3].id = 100;
                    dataTest_1.tasksTest[3].title = 'All Test Is Pass';
                    dataTest_1.tasksTest[3].description = 'You can Fly Wihtout wings, just use plane :)';
                    testDataBase = new task_1.default();
                    expect(response.status).toEqual(200);
                    expect(response.body).toEqual('Deleted');
                    expect(testDataBase._ids).toEqual(dataTest_1.idsTest);
                    expect(testDataBase.titleHash).toEqual(dataTest_1.titleTest);
                    expect(testDataBase.descriptionHash).toEqual(dataTest_1.descriptionTest);
                    expect(testDataBase.tasks).toEqual(dataTest_1.tasksTest);
                    return [2 /*return*/];
            }
        });
    }); });
    it('delete unexist Task', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request.delete('/task/delete/454')];
                case 1:
                    response = _a.sent();
                    expect(response.status).toEqual(400);
                    expect(response.body).toEqual("Not Found");
                    return [2 /*return*/];
            }
        });
    }); });
    it('get All Tasks', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request.get('/task/getMany')];
                case 1:
                    response = _a.sent();
                    expect(response.body).toEqual(dataTest_1.tasksTest);
                    return [2 /*return*/];
            }
        });
    }); });
    it('get All Tasks By Title', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request.get("/task/get/title/".concat(dataTest_1.tasksTest[3].title))];
                case 1:
                    response = _a.sent();
                    expect(response.body).toEqual([dataTest_1.tasksTest[3]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('get All Tasks By description', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request.get("/task/get/description/".concat(dataTest_1.tasksTest[4].description))];
                case 1:
                    response = _a.sent();
                    expect(response.body).toEqual([dataTest_1.tasksTest[4]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('get One Tasks By Id', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request.get("/task/getOne/1")];
                case 1:
                    response = _a.sent();
                    expect(response.body).toEqual(dataTest_1.tasksTest[0]);
                    return [2 /*return*/];
            }
        });
    }); });
    afterAll(function () {
        fs.writeFileSync("".concat(__dirname, "/../../dataBaseTest/Tasks.json"), JSON.stringify(dataTest_1.taksSave));
        fs.writeFileSync("".concat(__dirname, "/../../dataBaseTest/hash_title.json"), JSON.stringify(dataTest_1.titleSave));
        fs.writeFileSync("".concat(__dirname, "/../../dataBaseTest/hash_description.json"), JSON.stringify(dataTest_1.descriptionSave));
        fs.writeFileSync("".concat(__dirname, "/../../dataBaseTest/ids_index.json"), JSON.stringify(dataTest_1.idsSave));
    });
});
