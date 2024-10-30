"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const socket_1 = __importDefault(require("../socket"));
const Landing = () => {
    const [name, setName] = (0, react_1.useState)("");
    const [gameCode, setGameCode] = (0, react_1.useState)("");
    const [errorText, setErrorText] = (0, react_1.useState)("");
    const navigate = (0, react_router_dom_1.useNavigate)();
    const checkName = () => {
        if (name.length > 0) {
            setErrorText("");
            return true;
        }
        else {
            setErrorText("make your name longer");
            return false;
        }
    };
    const joinGame = () => {
        if (checkName()) {
            socket_1.default.emit("createGameRoom", (response) => {
                if (response.success) {
                    const roomID = response.gameID;
                    navigate(`/waiting/${roomID}`);
                }
                else {
                    setErrorText("socket error");
                    console.error(response.error);
                }
            });
        }
    };
    const createGame = () => {
        if (checkName()) {
        }
    };
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h1", { children: "7 girls" }), (0, jsx_runtime_1.jsx)("input", { type: "text", placeholder: "name", value: name, onChange: (event) => {
                    setName(event.target.value);
                } }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)("button", { onClick: createGame, children: "create game" }) }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("input", { type: "text", placeholder: "game code", value: gameCode, onChange: (event) => {
                                    setGameCode(event.target.value);
                                } }), (0, jsx_runtime_1.jsx)("button", { onClick: joinGame, children: "join game" })] })] }), (0, jsx_runtime_1.jsx)("p", { style: { color: "red" }, children: errorText })] }));
};
exports.default = Landing;
//# sourceMappingURL=Landing.js.map