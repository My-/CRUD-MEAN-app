export interface Ingredient {
    name: string;
    amount: number;

    calories?: number;
    fat?: number;
    carbs?: number;
    protein?: number;

    cholesterol?: number;
    sodium?: number;
}

export const INGREDIENTS: Ingredient[] = [
    {name: 'Beef', amount: 100, calories: 198},
    {name: 'Pork', amount: 100, calories: 518},
    {name: 'Sweet potato', amount: 100, calories: 89},
    {name: 'Potato white', amount: 100, calories: 69},
    {name: 'Butter', amount: 100, calories: 717},
    {name: 'Milk', amount: 100, calories: 64},
    {name: 'Bread', amount: 100, calories: 267},
    {name: 'Egg', amount: 100, calories: 143},
];
