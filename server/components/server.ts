import express from 'express';
import cors from 'cors';
import http from 'http';
import crypto from "crypto";
import path from 'path';
import bodyParser from 'body-parser';
import { createGameState, createPlayerState, GameState, initializeGame, PlayerState } from './api';
import { Socket } from 'socket.io';

const app = express()

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const server = http.createServer(app);

const io = require('socket.io')(server, { 
  cors: { origin: "*" }
});

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, '../build')));

app.use(express.static('build', { 
    setHeaders: (res, path) => {
      if (path.endsWith('.ts')) {
        res.setHeader('Content-Type', 'application/typescript');
      }
    }
}));

// Define a route that serves static TS files
app.use('/static/ts', express.static(path.join(__dirname, '../build/static/ts'), {
    setHeaders: function (res, path) {
      if (path.endsWith('.ts')) {
        res.setHeader('Content-Type', 'application/typescript');
      }
    }
}));

// Define a route that serves the index.html file
//__dirname : It will resolve to your project folder
app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, '../../build', 'index.tsx'));
});

// Catch-all route that serves the index.html file for any other routes
app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '../../build', 'index.tsx'));
});

// Delays code by a specificed amount (in miliseconds)
const delay = (ms: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
};

const games: Map<string, GameState> = new Map<string, GameState>();
const socketToGameMap: Map<string, string> = new Map<string, string>();

// IO handler for new socket connection
io.on('connection', (socket : Socket) => {
    console.log(`Socket ${socket.id} connected.`);

     // Event handler for creating a game room
    socket.on("createGameRoom", () => {
        const gameID = crypto.randomBytes(3).toString('hex');
        const gameState = createGameState(gameID);

        gameState.players.set(socket.id, createPlayerState(socket.id));
        socketToGameMap.set(socket.id, gameID);
        games.set(gameID, gameState);
        socket.join(gameID);
        
        socket.emit("createRoomResponse", { gameID: gameID, success: true });
    });

    // Event handler for joining a game room
    socket.on("joinGameRoom", (data: {gameID: string}) => {
        const gameID = data.gameID;
        const gameState = games.get(gameID);

        if (!gameID || !gameState) {
            socket.emit("joinRoomResponse", { error: `Error: Unable to join game ${gameID}.` });
            return;
        }

        gameState.players.set(socket.id, createPlayerState(socket.id));
        socketToGameMap.set(socket.id, gameID);

        if (!socket.rooms.has(gameID)) {
            socket.join(gameID);
        }

        socket.emit("joinRoomResponse", { gameID: gameID, success: true });
    });

    // Event handler for when a player has joined a room and is ready
    socket.on("onPlayerReady", async (data: {name: string}) => {
        const gameID = socketToGameMap.get(socket.id);
        const gameState = games.get(gameID ?? '');
        const playerState = games.get(gameID ?? '')?.players.get(socket.id);

        if (!gameID || !gameState || !playerState) {
            console.error(`Error: Unable to join game ${gameID}.`);
            return;
        }

        playerState.name = data.name;
        playerState.isReady = true;

        const readyPlayers = [...gameState.players.values()].filter((playerState: PlayerState) => playerState.isReady);
        io.to(gameID).emit("playerReadyResponse", { numReadyPlayers: readyPlayers.length, readyPlayers: readyPlayers, success: true });
    });

    // Event handler for when a game creator player starts the game
    socket.on("onGameStart", async (data: {name: string}) => {
        const gameID = socketToGameMap.get(socket.id);
        const gameState = games.get(gameID ?? '');

        if (!gameID || !gameState) {
            console.error("Error: Error starting game.");
            return;
        }

        const numReadyPlayers: number = [...gameState.players.values()].filter((playerState: PlayerState) => playerState.isReady).length;

        if (numReadyPlayers < 3 || numReadyPlayers > 7) {
            console.error("Error: Too few or too many players.");
            return;
        }

        if (!gameState.hasStarted) {
            gameState.hasStarted = true;
            await initializeGame(gameState);
            io.to(gameID).emit("startGameSession", { success: true });
        }
    });

    // Event handler for getting the game state
    socket.on("getGameState", (data : {gameID: string}) => {
        const gameID = data.gameID;
        const gameState = games.get(gameID);

        if (!gameID || !gameState) {
        console.error(`Error: Unable to retrieve game state for ${gameID}.`);
        return;
        }

        socket.emit("getGameStateResponse", { gameState: gameState, success: true });
    });

    // Event handler for when a game has reached an end state
    socket.on("gameEnd", ({}) => {
        const gameID = socketToGameMap.get(socket.id);
        const gameState = games.get(gameID ?? '');
        const playerState = games.get(gameID ?? '')?.players.get(socket.id);

        if (playerState) {
            playerState.isReady = false;
        }
        if (gameState) {
            gameState.hasStarted = false;
        }
    });

    // Event handler for when a socket disconnects
    socket.on('disconnect', () => {
    const gameID = socketToGameMap.get(socket.id);
    const gameState = games.get(gameID ?? '');
    if (gameID && gameState) {
        games.get(gameID)?.players.delete(socket.id)
        if (Object.keys(gameState.players).length == 0) {
            games.delete(gameID)
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