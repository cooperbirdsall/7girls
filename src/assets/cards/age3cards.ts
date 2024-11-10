import { CardModel } from "../../models/CardModel";

export const age3cards: Array<CardModel> = [
    {
        id: 1000,
        name: "Lighthouse",
        cost: { money: 0 },
        color: "orange",
        gain: {
            money: 1,
            points: 1,
            nowAction: {
                forColor: "orange", 
                fromNeighbors: false,
                fromYou: true,
                fromWonders: false
            },
            endAction: {
                forColor: "orange",
                fromNeighbors: false,
                fromYou: true,
                fromWonders: false
            }
        },
        playersRequired: 4
    },
    {
        id: 1001,
        name: "Haven",
        cost: { money: 0 },
        color: "orange",
        gain: {
            money: 1,
            points: 1,
            nowAction: {
                forColor: "brown", 
                fromNeighbors: false,
                fromYou: true,
                fromWonders: false
            },
            endAction: {
                forColor: "brown",
                fromNeighbors: false,
                fromYou: true,
                fromWonders: false
            }
        },
        playersRequired: 4
    },
    {
        id: 1002,
        name: "Chamber of Commerce",
        cost: { money: 0 },
        color: "orange",
        gain: {
            money: 2,
            points: 2,
            nowAction: {
                forColor: "silver", 
                fromNeighbors: false,
                fromYou: true,
                fromWonders: false
            },
            endAction: {
                forColor: "silver",
                fromNeighbors: false,
                fromYou: true,
                fromWonders: false
            }
        },
        playersRequired: 4
    },
    {
        id: 1002,
        name: "Ludus",
        cost: { money: 0 },
        color: "orange",
        gain: {
            money: 3,
            points: 1,
            nowAction: {
                forColor: "red", 
                fromNeighbors: false,
                fromYou: true,
                fromWonders: false
            },
            endAction: {
                forColor: "red",
                fromNeighbors: false,
                fromYou: true,
                fromWonders: false
            }
        },
        playersRequired: 4
    },
]