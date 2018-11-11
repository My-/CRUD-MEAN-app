import {Component, OnInit} from '@angular/core';
import {Ingredient} from '../../model/ingredient';
import {RECIPES} from '../../model/recipe';




@Component({
    selector: 'app-recipe',
    templateUrl: './recipe.component.html',
    styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {
    recipes = RECIPES;

    constructor() { }

    ngOnInit() {
    }

}
