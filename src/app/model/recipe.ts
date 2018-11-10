import {Ingredient} from './ingredient';

export interface Recipe {
    userID: number;
    title: string;
    allergies: string[];
    takesTime: number;
    pictures: string[];
    ingredients: Ingredient[];
    recipe: string;
}
