"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const Board_1 = __importDefault(require("./Board"));
const Game = () => {
    const [age, setAge] = (0, react_1.useState)(1);
    const [players, setPlayers] = (0, react_1.useState)([(0, jsx_runtime_1.jsx)(Board_1.default, {}), (0, jsx_runtime_1.jsx)(Board_1.default, {})]);
    (0, react_1.useEffect)(() => {
        // distribute boards (which gives everyone 3 coins)
        // shuffle cards for age 1
        // deal 7 age 1 cards to each player
        // call method for wait for players to pick card
    }, []);
    // const pickCards () => {
    // }
    return ((0, jsx_runtime_1.jsx)("div", { className: "game-container", style: {
            display: "flex",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
        }, children: players[0] }));
};
exports.default = Game;
//# sourceMappingURL=Game.js.map