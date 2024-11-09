import { CardModel } from "../../models/CardModel";

export const age1cards: Array<CardModel> = [
    {
        id: 1,
        name: "Ore Vein",
        cost: {},
        color: "brown",
        gain: {resource: ["ORE"]},
        playersRequired: 4
    },
    {
        id: 2,
        name: "Guard Tower",
        cost: {resource: ["BRICK"]},
        color: "red",
        gain: {military: 1},
        playersRequired: 4
    },
    {
        id: 3,
        name: "Press",
        cost: {},
        color: "gray",
        gain: {resource: ["PAPER"]},
        playersRequired: 6
    },
    {
        id: 4,
        name: "Scriptorium",
        cost: {resource: ["PAPER"]},
        color: "green",
        gain: {science: "TABLET", symbol: ["SCALES", "BOOK"]},
        playersRequired: 3
    },
    {
        id: 5,
        name: "Baths",
        cost: {resource: ["STEEL"]},
        color: "blue",
        gain: {points: 3, symbol: ["RAINDROP"]},
        playersRequired: 3
    },
    {
        id: 6,
        name: "Tavern",
        cost: {},
        color: "orange",
        gain: {money: 5},
        playersRequired: 7
    },
    {
        id: 7,
        name: "Forest Cave",
        cost: {money: 1},
        color: "brown",
        //one of resource
        gain: {resource: [["ORE", "WOOD"]]},
        playersRequired: 5
    },
    {
        id: 8,
        name: "Glassworks",
        cost: {},
        color: "gray",
        gain: {resource: ["GLASS"]},
        playersRequired: 3
    },
]