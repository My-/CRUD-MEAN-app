import {Ingredient} from './ingredient';
import {Allergy} from './allergy';

export interface Recipe {
    userID: number;
    title: string;
    allergies: Allergy[];
    takesTime: number;
    pictures: string[];
    ingredients: Ingredient[];
    recipe: string;
}


export const RECIPES: Recipe[] = [
    {
        userID: 0,
        title: 'Egg breakfast',
        allergies: [
            {name: 'Egg allergy', uri: 'https://en.wikipedia.org/wiki/Egg_allergy'}
        ],
        takesTime: 10,
        pictures: [
            'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Eggs-as-food.jpg/1200px-Eggs-as-food.jpg',
        ],
        ingredients: [
            {name: 'Egg', amount: 100, calories: 143},
            {name: 'Bread', amount: 100, calories: 267},
            {name: 'Butter', amount: 100, calories: 717},
        ],
        recipe: 'Man up, take pan and cook an egg :)',
    }, {
        userID: 1,
        title: 'Simple sandwich',
        allergies: [],
        takesTime: 5,
        pictures: [
            'https://www.wikihow.com/images/2/23/Make-a-Fried-Bologna-Sandwich-Intro.jpg',
        ],
        ingredients: [
            {name: 'Bread', amount: 100, calories: 267},
            {name: 'Butter', amount: 100, calories: 717},
            {name: 'Pork', amount: 100, calories: 518},
        ],
        recipe: 'Ask woman :)',
    },


    // {name: 'Beef', amount: 100, calories: 198},
    // {name: 'Pork', amount: 100, calories: 518},
    // {name: 'Sweet potato', amount: 100, calories: 89},
    // {name: 'Potato white', amount: 100, calories: 69},
    // {name: 'Butter', amount: 100, calories: 717},
    // {name: 'Milk', amount: 100, calories: 64},
    // {name: 'Bread', amount: 100, calories: 267},
    // {name: 'Egg', amount: 100, calories: 143},
];
