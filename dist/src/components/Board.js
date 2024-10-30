"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const Board = () => {
    const [money, setMoney] = (0, react_1.useState)(3);
    const [cardsPlayed, setCardsPlayed] = (0, react_1.useState)();
    //   const [cardsInHand, setCardsInHand] = useState([] : CardModel[]);
    const [warScore, setWarScore] = (0, react_1.useState)(0);
    const [pyramidStagesUnlocked, setPyramidStagesUnlocked] = (0, react_1.useState)([]);
    //   const handlePlayCard = (id: number) => {
    //     const playCardIndex = cardsInHand.findIndex((card) => card.id == id);
    //     const playCard = cardsInHand[playCardIndex]
    //     if(canPlayCard(playCard)) {
    //       setCardsInHand(...cardsPlayed, playCard)
    //       let hand = [...cardsInHand];
    //       hand.splice(playCardIndex, playCardIndex);
    //       setCardsInHand(hand);
    //     }
    //   };
    const getAvailableResources = () => {
        return [];
    };
    const canPlayCard = (card) => {
        let availableResources = getAvailableResources();
        for (let i = 0; i < card.resourceCost.length; i++) {
            const currCardResourceType = card.resourceCost[i];
            // count available
            let availableCount = 0;
            for (let j = 0; j < card.resourceCost.length; j++) {
                if (currCardResourceType == card.resourceCost[j]) {
                    availableCount++;
                }
            }
            // count needed
            let neededCount = 0;
            for (let k = 0; k < availableResources.length; k++) {
                if (currCardResourceType == availableResources[k]) {
                    neededCount++;
                }
            }
            // TODO count neighbords resources
            if (availableCount < neededCount)
                return false;
        }
        return true;
    };
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("div", { className: "played-cards" }), (0, jsx_runtime_1.jsx)("div", { className: "board", style: {
                    width: 420,
                    height: 200,
                    backgroundColor: "gray",
                    borderRadius: 10,
                } }), (0, jsx_runtime_1.jsx)("div", { className: "tucked-cards" })] }));
};
exports.default = Board;
//# sourceMappingURL=Board.js.map