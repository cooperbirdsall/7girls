"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const Card = (props) => {
    return ((0, jsx_runtime_1.jsx)("div", { style: {
            width: 100,
            height: 150,
            backgroundColor: props.model.color,
            borderRadius: 10,
        }, children: (0, jsx_runtime_1.jsx)("button", { onClick: props.playCard(props.model.id), children: "Play me" }) }));
};
exports.default = Card;
//# sourceMappingURL=Card.js.map