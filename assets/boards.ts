import { BoardModel } from "../src/models/BoardModel";

export const boards: Array<BoardModel> = [
    {
        id: 1,
        name: "Gizah",
        startingResource: "STEEL",
        pyramidStages: [
            {cost: ["WOOD", "WOOD"], gain: { points: 3}},
            {cost: ["BRICK", "BRICK", "RUG"], gain: { points: 5}},
            {cost: ["STEEL", "STEEL", "STEEL", "STEEL"], gain: { points: 7}},
        ],
        cardsPlayed: [],
        militaryPoints: 0,
    },
    {
        id: 2,
        name: "Alexandria",
        startingResource: "GLASS",
        pyramidStages: [
            {cost: ["STEEL", "STEEL"], gain: { points: 3}},
            {cost: ["ORE", "ORE"], gain: { resource: [["WOOD", "STEEL", "ORE", "BRICK"]]}},
            {cost: ["PAPER", "RUG"], gain: { points: 7}},
        ],
        cardsPlayed: [],
        militaryPoints: 0,
    },
    {
        id: 3,
        name: "Babylon",
        startingResource: "WOOD",
        pyramidStages: [
            {cost: ["BRICK", "BRICK"], gain: { points: 3}},
            {cost: ["ORE", "ORE", "RUG"], gain: { science: ["PROTRACTOR", "TABLET", "WHEEL"]}},
            {cost: ["WOOD", "WOOD", "WOOD", "WOOD"], gain: { points: 7}},
        ],
        cardsPlayed: [],
        militaryPoints: 0,
    },
    {
        id: 4,
        name: "Rhódos",
        startingResource: "ORE",
        pyramidStages: [
            {cost: ["WOOD", "WOOD"], gain: { points: 3}},
            {cost: ["BRICK", "BRICK", "BRICK"], gain: { military: 2}},
            {cost: ["ORE", "ORE", "ORE", "ORE"], gain: { points: 7}},
        ],
        cardsPlayed: [],
        militaryPoints: 0,
    },
    {
        id: 5,
        name: "Éphesos",
        startingResource: "PAPER",
        pyramidStages: [
            {cost: ["BRICK", "BRICK"], gain: { points: 3}},
            {cost: ["WOOD", "WOOD"], gain: { money: 9}},
            {cost: ["ORE", "ORE", "GLASS"], gain: { points: 7}},
        ],
        cardsPlayed: [],
        militaryPoints: 0,
    },
    {
        id: 6,
        name: "Olympía",
        startingResource: "BRICK",
        pyramidStages: [
            {cost: ["STEEL", "STEEL"], gain: { points: 3 }},
            {cost: ["WOOD", "WOOD"], gain: { func: () => {} }},
            {cost: ["BRICK", "BRICK", "BRICK"], gain: { points: 7}},
        ],
        cardsPlayed: [],
        militaryPoints: 0
    },
    {
        id: 7,
        name: "Halikarnassos",
        startingResource: "RUG",
        pyramidStages: [
            {cost: ["ORE", "ORE"], gain: { points: 3 }},
            {cost: ["GLASS", "PAPER"], gain: { func: () => {} }},
            {cost: ["STEEL", "STEEL", "STEEL"], gain: { points: 7}},
        ],
        cardsPlayed: [],
        militaryPoints: 0
    },
];
