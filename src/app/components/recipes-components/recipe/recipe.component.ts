import {Component, OnInit} from '@angular/core';
import {Ingredient} from '../../../model/ingredient';
import {Recipe} from '../../../model/recipe';
import {RecipeService} from '../../../services/recipe.service';
import {YummlyService} from '../../../services/yummly.service';
import {Subscription} from 'rxjs';


@Component({
    selector: 'app-recipe',
    templateUrl: './recipe.component.html',
    styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {
    recipes: Recipe[] = [];
    subRecipes: Subscription;
    searchRecipe: string;

    constructor(private _recipeService: RecipeService,
                private _yummlyService: YummlyService,
                ) {
        // subscribe to service recipe variable
        this.subRecipes = this._recipeService.getRecipesfromSubject().subscribe(state => { this.recipes = state; });

        // pull data from database
        this._recipeService.get().subscribe(
            data => this.recipes = data,
            err => console.log('ERROR' + err)
        );
    }

    ngOnInit() { }

    searchYummily() {
        this._yummlyService.search(this.searchRecipe)
            .subscribe(
                data => console.log(data),
                err => console.log(err),
            );

    }
}
