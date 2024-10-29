export type GameState = {
    gameID: string,
    hasStarted: boolean,
    players: Map<string, PlayerState>,
    currentAge: number,
    cardsPerHand: number,
};

export const createGameState = (gameID: string) : GameState => {
    return {
        gameID,
        hasStarted: false,
        players: new Map<string, PlayerState>(),
        currentAge: 1,
        cardsPerHand: 7,
    }
}

export type PlayerState = {
    socketID: string,
    name?: string,
    isReady: boolean;
};

export const createPlayerState = (socketID: string) : PlayerState => {
    return {
        socketID,
        isReady: false
    }
}

export const initializeGame = async (gameState: GameState) => {
    const playerSockets = Object.keys(gameState.players);

    for (const socket of playerSockets) {
        // deal cards?
    }
}