"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const task_1 = __importDefault(require("../ModelMethod/task"));
const taskRouter = express_1.default.Router();
taskRouter.post('/ctreate', async (req, res) => {
    try {
        const taskData = {
            id: req.body.id,
            title: req.body.title,
            description: req.body.title
        };
        const result = await task_1.default.createTask(taskData);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
exports.default = taskRouter;
