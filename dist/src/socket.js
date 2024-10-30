"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_client_1 = __importDefault(require("socket.io-client"));
const hostname = window.location.hostname;
const port = process.env.PORT || 8000;
const socket = (0, socket_io_client_1.default)(`http://${hostname}:${port}`);
// const socket = io(`https://${hostname}`);
exports.default = socket;
//# sourceMappingURL=socket.js.map