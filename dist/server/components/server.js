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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
const crypto_1 = __importDefault(require("crypto"));
const path_1 = __importDefault(require("path"));
const body_parser_1 = __importDefault(require("body-parser"));
const api_1 = require("./api");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
const server = http_1.default.createServer(app);
const io = require('socket.io')(server, {
    cors: { origin: "*" }
});
// Serve the static files from the React app
app.use(express_1.default.static(path_1.default.join(__dirname, '../build')));
app.use(express_1.default.static('build', {
    setHeaders: (res, path) => {
        if (path.endsWith('.ts')) {
            res.setHeader('Content-Type', 'application/typescript');
        }
    }
}));
// Define a route that serves static TS files
app.use('/static/ts', express_1.default.static(path_1.default.join(__dirname, '../build/static/ts'), {
    setHeaders: function (res, path) {
        if (path.endsWith('.ts')) {
            res.setHeader('Content-Type', 'application/typescript');
        }
    }
}));
// Define a route that serves the index.html file
//__dirname : It will resolve to your project folder
app.get('/*', function (req, res) {
    res.sendFile(path_1.default.join(__dirname, '../../build', 'index.tsx'));
});
// Catch-all route that serves the index.html file for any other routes
app.get('*', function (req, res) {
    res.sendFile(path_1.default.join(__dirname, '../../build', 'index.tsx'));
});
// Delays code by a specificed amount (in miliseconds)
const delay = (ms) => {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
};
const games = new Map();
const socketToGameMap = new Map();
// IO handler for new socket connection
io.on('connection', (socket) => {
    console.log(`Socket ${socket.id} connected.`);
    // Event handler for creating a game room
    socket.on("createGameRoom", () => {
        const gameID = crypto_1.default.randomBytes(3).toString('hex');
        const gameState = (0, api_1.createGameState)(gameID);
        gameState.players.set(socket.id, (0, api_1.createPlayerState)(socket.id));
        socketToGameMap.set(socket.id, gameID);
        games.set(gameID, gameState);
        socket.join(gameID);
        socket.emit("createRoomResponse", { gameID: gameID, success: true });
    });
    // Event handler for joining a game room
    socket.on("joinGameRoom", (data) => {
        const gameID = data.gameID;
        const gameState = games.get(gameID);
        if (!gameID || !gameState) {
            socket.emit("joinRoomResponse", { error: "bad girl." });
            return;
        }
        gameState.players.set(socket.id, (0, api_1.createPlayerState)(socket.id));
        socketToGameMap.set(socket.id, gameID);
        if (!socket.rooms.has(gameID)) {
            socket.join(gameID);
        }
        socket.emit("joinRoomResponse", { gameID: gameID, success: true });
    });
    // Event handler for when a player has joined a room and is ready
    socket.on("onPlayerReady", (data) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const gameID = socketToGameMap.get(socket.id);
        const gameState = games.get(gameID !== null && gameID !== void 0 ? gameID : '');
        const playerState = (_a = games.get(gameID !== null && gameID !== void 0 ? gameID : '')) === null || _a === void 0 ? void 0 : _a.players.get(socket.id);
        if (!gameID || !gameState || !playerState) {
            console.error("Error: bad girl.");
            return;
        }
        playerState.name = data.name;
        playerState.isReady = true;
    }));
    // Event handler for when a game creator player starts the game
    socket.on("onGameStart", (data) => __awaiter(void 0, void 0, void 0, function* () {
        const gameID = socketToGameMap.get(socket.id);
        const gameState = games.get(gameID !== null && gameID !== void 0 ? gameID : '');
        if (!gameID || !gameState) {
            console.error("Error: bad girl.");
            return;
        }
        const numReadyPlayers = [...gameState.players.values()].filter((playerState) => playerState.isReady).length;
        if (numReadyPlayers < 3 || numReadyPlayers > 7) {
            console.error("Error: bad girl.");
            return;
        }
        if (!gameState.hasStarted) {
            gameState.hasStarted = true;
            yield (0, api_1.initializeGame)(gameState);
            io.to(gameID).emit("startGameSession", { success: true });
        }
    }));
    // Event handler for getting the game state
    socket.on("getGameState", (data) => {
        const gameID = data.gameID;
        const gameState = games.get(gameID);
        if (!gameID || !gameState) {
            console.error(`Error: Bad girl.`);
            return;
        }
        socket.emit("getGameStateResponse", { gameState: gameState, success: true });
    });
    // Event handler for when a game has reached an end state
    socket.on("gameEnd", ({}) => {
        var _a;
        const gameID = socketToGameMap.get(socket.id);
        const gameState = games.get(gameID !== null && gameID !== void 0 ? gameID : '');
        const playerState = (_a = games.get(gameID !== null && gameID !== void 0 ? gameID : '')) === null || _a === void 0 ? void 0 : _a.players.get(socket.id);
        if (playerState) {
            playerState.isReady = false;
        }
        if (gameState) {
            gameState.hasStarted = false;
        }
    });
    // Event handler for when a socket disconnects
    socket.on('disconnect', () => {
        var _a;
        const gameID = socketToGameMap.get(socket.id);
        const gameState = games.get(gameID !== null && gameID !== void 0 ? gameID : '');
        if (gameID && gameState) {
            (_a = games.get(gameID)) === null || _a === void 0 ? void 0 : _a.players.delete(socket.id);
            if (Object.keys(gameState.players).length == 0) {
                games.delete(gameID);
            }
            socketToGameMap.delete(socket.id);
        }
        console.log(`Socket ${socket.id} disconnected.`);
    });
});
const port = process.env.PORT || 8000;
server.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
//# sourceMappingURL=server.js.map