import {Component, OnInit} from '@angular/core';
import {Ingredient} from '../../model/ingredient';
import {Recipe} from '../../model/recipe';
import {RecipeService} from '../../services/recipe.service';


@Component({
    selector: 'app-recipe',
    templateUrl: './recipe.component.html',
    styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {
    recipes: Recipe[];

    constructor(private _recipeService: RecipeService) {
        // pull data from database
        this._recipeService.get().subscribe(
            data => this.recipes = data,
            err => console.log('ERROR' + err)
        );
    }

    ngOnInit() { }

}
