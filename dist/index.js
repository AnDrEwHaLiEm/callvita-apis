"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var dotenv_1 = __importDefault(require("dotenv"));
var taskRouter_1 = __importDefault(require("./Router/taskRouter"));
var cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
var app = (0, express_1.default)();
var port = process.env.PORT;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/task', taskRouter_1.default);
app.listen(port, function () {
    console.log("Server is running at https://localhost:".concat(port));
});
exports.default = app;
