import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from '../../../model/recipe';
import {RecipeService} from '../../../services/recipe.service';

@Component({
    selector: 'app-recipe-view',
    templateUrl: './recipe-view.component.html',
    styleUrls: ['./recipe-view.component.css']
})
export class RecipeViewComponent implements OnInit {

    @Input() recipe: Recipe;

    displayedColumns: string[] = ['name', 'amount'];

    constructor(private _recipeDB: RecipeService) { }

    ngOnInit() { }

    deleteRecipe() {
        this._recipeDB.delete(this.recipe);
    }
}
