import { BoardModel } from "../../src/models/BoardModel";
import { age1cards } from "../../assets/cards/age1cards";
import { CardModel } from "../../src/models/CardModel";

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
    socketID: string;
    name: string | undefined;
    isReady: boolean;
    board: BoardModel;
    cardsInHand: CardModel[];
};

export const createPlayerState = (socketID: string) : PlayerState => {
    return {
        socketID,
        name: undefined,
        isReady: false,
        board: {},
        cardsInHand: []
    }
}

export const initializeGame = async (gameState: GameState) => {
    const playerSockets = Object.keys(gameState.players);

    for (const socket of playerSockets) {
        // deal boards
        // deal cards?
    }
}

export const initializeAge = async () => {

}

export const dealHands = async (gameState: GameState) => {
    let cards;
    switch (gameState.currentAge) {
        case 1:
        default:
            cards = age1cards;
            break;
    }

    let dealtCards = new Set<number>();
    for (const [_, player] of gameState.players) {
        for (let i = 0; i < 7; i++) {
            let nextCard;
            do {
                nextCard = Math.floor(Math.random() * cards.length);
            } while (nextCard in dealtCards);

            player.cardsInHand.push(cards[nextCard]);
            dealtCards.add(nextCard);
        }
    }
}