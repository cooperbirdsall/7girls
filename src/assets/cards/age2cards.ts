import { CardModel } from "../../models/CardModel";

export const age2cards: Array<CardModel> = [
    {
        id: 100,
        name: "Vineyard",
        cost: { money: 0 },
        color: "orange",
        gain: {
            money: 1,
            nowAction: {
                forColor: "brown", 
                fromNeighbors: true,
                fromYou: true,
                fromWonders: false
         }
        },
        playersRequired: 4
    },
    {
        id: 101,
        name: "Vineyard",
        cost: { money: 0 },
        color: "orange",
        gain: {
            money: 1,
            nowAction: { 
                forColor: "brown", 
                fromNeighbors: true,
                fromYou: true,
                fromWonders: false
         }
        },
        playersRequired: 4
    },
    {
        id: 102,
        name: "Bazar",
        cost: { money: 0 },
        color: "orange",
        gain: {
            money: 2,
            nowAction: { 
                forColor: "silver", 
                fromNeighbors: true,
                fromYou: true,
                fromWonders: false
         }
        },
        playersRequired: 4
    },
]