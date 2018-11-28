import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from '../../../model/recipe';
import {RecipeService} from '../../../services/recipe.service';
import {UserService} from '../../../services/user.service';

@Component({
    selector: 'app-recipe-view',
    templateUrl: './recipe-view.component.html',
    styleUrls: ['./recipe-view.component.css']
})
export class RecipeViewComponent implements OnInit {

    @Input() recipe: Recipe;

    displayedColumns: string[] = ['name', 'amount'];

    constructor(private _recipeDB: RecipeService,
                private _userService: UserService,
                ) { }

    ngOnInit() { }

    deleteRecipe() {
        this._recipeDB.deleteFromDB(this.recipe);
    }

    claimOwnership() {
        this._recipeDB.updateDB_GM(this.recipe);
        this._userService.
    }
}
