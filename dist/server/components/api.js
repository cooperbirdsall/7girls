"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeGame = exports.createPlayerState = exports.createGameState = void 0;
const createGameState = (gameID) => {
    return {
        gameID,
        hasStarted: false,
        players: new Map(),
        currentAge: 1,
        cardsPerHand: 7,
    };
};
exports.createGameState = createGameState;
const createPlayerState = (socketID) => {
    return {
        socketID,
        name: undefined,
        isReady: false
    };
};
exports.createPlayerState = createPlayerState;
const initializeGame = (gameState) => __awaiter(void 0, void 0, void 0, function* () {
    const playerSockets = Object.keys(gameState.players);
    for (const socket of playerSockets) {
        // deal cards?
    }
});
exports.initializeGame = initializeGame;
//# sourceMappingURL=api.js.map