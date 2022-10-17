"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Task {
    async createTask(taskData) {
        const { id, title, description } = taskData;
        //const uniqueid =await checkUniqueId(id);
        return {};
    }
}
const task = new Task();
exports.default = task;
