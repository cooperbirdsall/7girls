import { BoardModel } from "../../src/models/BoardModel";
import { age1cards } from "../../assets/cards/age1cards";
import { CardModel } from "../../src/models/CardModel";

export type GameState = {
    gameID: string,
    hasStarted: boolean,
    players: Map<string, PlayerState>,
    currentAge: number,
    cardDirectionClockwise: boolean
};

export const createGameState = (gameID: string) : GameState => {
    return {
        gameID,
        hasStarted: false,
        players: new Map<string, PlayerState>(),
        currentAge: 1,
        cardDirectionClockwise: true,
    }
}

export type PlayerState = {
    socketID: string;
    name: string | undefined;
    isReady: boolean;
    board: BoardModel | undefined;
    cardsInHand: CardModel[];
    militaryWins: number[];
    militaryLosses: number[];
    playerOnLeft: string;
    playerOnRight: string;
};

export const createPlayerState = (socketID: string) : PlayerState => {
    return {
        socketID,
        name: undefined,
        isReady: false,
        board: undefined,
        cardsInHand: [],
        militaryWins: [],
        militaryLosses: [],
        playerOnLeft: "",
        playerOnRight: ""
    }
}

export const initializeGame = async (gameState: GameState) => {
    let map : string[] = [];
    for (const [playerID, _] of gameState.players) {
        map.push(playerID); 
    }
    for (let i = 0; i < map.length; i++) {
        const player = gameState.players.get(map[i]);
        if (player) {
            if (i === 0) {
                player.playerOnLeft = map[map.length - 1];
                player.playerOnRight = map[i + 1];
            } else if (i === map.length - 1) {
                player.playerOnLeft = map[i - 1]
                player.playerOnRight = map[0];
            } else {
                player.playerOnLeft = map[i - 1];
                player.playerOnRight = map[i + 1];
            }
        }
    }

    startAge(gameState);
}

export const startAge = async (gameState: GameState) => {
    dealHands(gameState);
}

/**
 * Score the military at the end of the round
 * Advance the age up 1
 * 
 * gameState: the current state of the game
 */
export const endAge = async (gameState: GameState) => {
    for (const [_, player] of gameState.players) {
        let playerVersusPlayerLeft = player.board?.militaryPoints ?? 0 - (gameState.players.get(player.playerOnLeft)?.board?.militaryPoints ?? 0);
        let playerVersusPlayerRight = player.board?.militaryPoints ?? 0 - (gameState.players.get(player.playerOnRight)?.board?.militaryPoints ?? 0);
        
        let playerWins = 0;
        let playerLosses = 0;
        if (playerVersusPlayerLeft > 0) {
            playerWins++;
        } else if (playerVersusPlayerLeft < 0) {
            playerLosses++;
        }

        if (playerVersusPlayerRight > 0) {
            playerWins++;
        } else if (playerVersusPlayerRight < 0) {
            playerLosses++;
        }

        let militaryValue = 0;
        switch (gameState.currentAge) {
            case 1:
                militaryValue = 1;
                break;
            case 2:
                militaryValue = 3;
                break;
            case 3:
                militaryValue = 5;
            default:
                break;
        }

        for (let i = 0; i < playerWins; i++) {
            player.militaryWins.push(militaryValue);
        }

        for (let i = 0; i < playerLosses; i++) {
            player.militaryLosses.push(militaryValue);
        }
    }

    gameState.currentAge++;
    gameState.cardDirectionClockwise = !gameState.cardDirectionClockwise;
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

export const passCards = async (gameState: GameState) => {
    let newCards = new Map<string, CardModel[]>;
    for (const [playerID, player] of gameState.players) {
        if (gameState.cardDirectionClockwise) {
            newCards.set(playerID, gameState.players.get(player.playerOnRight)?.cardsInHand ?? []);
        } else {
            newCards.set(playerID, gameState.players.get(player.playerOnLeft)?.cardsInHand ?? []);
        }
    }

    for (const [playerID, player] of gameState.players) {
        player.cardsInHand = newCards.get(playerID) ?? [];
    }
}