import { BoardModel } from "../../src/models/BoardModel";
import { age1cards } from "../../src/assets/cards/age1cards";
import { boards } from "../../src/assets/boards";
import { CardModel } from "../../src/models/CardModel";
import { GameState, PlayerState } from "../../src/types";

export const createGameState = (gameID: string) : GameState => {
    return {
        gameID,
        hasStarted: false,
        players: {},
        currentAge: 1,
        cardDirectionClockwise: true,
    }
}

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
        playerOnRight: "",
        waitingToPlayCard: false,
    }
}

export const initializeGame = async (gameState: GameState) => {
    setRightAndLeftPlayers(gameState);
    setPlayerBoards(gameState);
    startAge(gameState);
}

const setRightAndLeftPlayers = async (gameState: GameState) => {
    let map : string[] = [];
    for (const playerID of Object.keys(gameState.players)) {
        map.push(playerID); 
    }
    for (let i = 0; i < map.length; i++) {
        const player = gameState.players[map[i]];
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
}

const startAge = async (gameState: GameState) => {
    dealHands(gameState);
    startTurn(gameState);
}

const startTurn = async (gameState: GameState) => {
    for (let player of Object.values(gameState.players)) {
        player.waitingToPlayCard = true;
    }
}

export const handleCardPlayed = async (gameState: GameState, nextGameState: GameState, playerID: string, cardData: {card: CardModel, moneyCost: number}) => {
    let playerBoard = nextGameState.players[playerID].board;
    if (playerBoard) {
        playerBoard.money -= cardData.moneyCost;
        playerBoard.cardsPlayed.push(cardData.card);
        nextGameState.players[playerID].cardsInHand = nextGameState.players[playerID].cardsInHand.filter((card) => card.id !== cardData.card.id);
        console.log(nextGameState.players[playerID].cardsInHand)
    }

    gameState.players[playerID].waitingToPlayCard = false;

    const numWaitingPlayers: number = Object.values(gameState.players).filter((playerState: PlayerState) => playerState.waitingToPlayCard).length;

    if (numWaitingPlayers > 0) {
        return false;
    } else {
        endTurn(gameState, nextGameState)
        return true;
    }
}

export const endTurn = async (gameState: GameState, nextGameState: GameState) => {
    gameState = nextGameState;
    // passCards(gameState);
}

/**
 * Score the military at the end of the round
 * Advance the age up 1
 * 
 * gameState: the current state of the game
 */
const endAge = async (gameState: GameState) => {
    for (const player of Object.values(gameState.players)) {
        let playerVersusPlayerLeft = player.board?.militaryPoints ?? 0 - (gameState.players[player.playerOnLeft].board?.militaryPoints ?? 0);
        let playerVersusPlayerRight = player.board?.militaryPoints ?? 0 - (gameState.players[player.playerOnRight].board?.militaryPoints ?? 0);
        
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
                break;
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

const dealHands = async (gameState: GameState) => {
    let cards;
    switch (gameState.currentAge) {
        case 1:
        default:
            cards = age1cards;
            break;
    }

    let dealtCards = new Set<number>();
    for (const player of Object.values(gameState.players)) {
        for (let i = 0; i < 7; i++) {
            let nextCard;
            do {
                nextCard = Math.floor(Math.random() * cards.length);
            } while (dealtCards.has(nextCard));

            player.cardsInHand.push(cards[nextCard]);
            dealtCards.add(nextCard);
        }
    }
}

const passCards = async (gameState: GameState) => {
    let newCards = new Map<string, CardModel[]>;
    for (const [playerID, player] of Object.entries(gameState.players)) {
        if (gameState.cardDirectionClockwise) {
            newCards.set(playerID, gameState.players[player.playerOnRight].cardsInHand ?? []);
        } else {
            newCards.set(playerID, gameState.players[player.playerOnLeft].cardsInHand ?? []);
        }
    }

    for (const [playerID, player] of Object.entries(gameState.players)) {
        player.cardsInHand = newCards.get(playerID) ?? [];
    }
}

const setPlayerBoards = async (gameState: GameState) => {
    let dealtBoards = new Set<number>();
    for (const player of Object.values(gameState.players)) {
        let nextBoard;
        do {
            nextBoard = Math.floor(Math.random() * boards.length);
        } while (nextBoard in dealtBoards);

        player.board = boards[nextBoard];
    }
}