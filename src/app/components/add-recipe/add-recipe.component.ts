import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, NgForm} from '@angular/forms';
import {RecipeService} from '../../services/recipe.service';
import {Recipe} from '../../model/recipe';
import {AddRecipeIngredientsComponent} from '../add-recipe-ingredients/add-recipe-ingredients.component';


@Component({
    selector: 'app-add-recipe',
    templateUrl: './add-recipe.component.html',
    styleUrls: ['./add-recipe.component.css']
})

/**
 * This component responsible for adding new recipes
 */
export class AddRecipeComponent implements OnInit {

    @ViewChild(AddRecipeIngredientsComponent) recipeIngredients: AddRecipeIngredientsComponent;

    constructor(private _recipeDB: RecipeService) {  }


    ngOnInit() { }

    onAddRecipe(form: NgForm) {
        console.log(form.value);

        const userRecipe: Recipe = {
            userID: 0,
            title: form.value.title,
            allergies: [],
            takesTime: 0,
            pictures: [],
            ingredients: this.recipeIngredients.ingredients,
            recipe: form.value.recipe,
        };

        this._recipeDB.add(userRecipe)
            .subscribe(res => {
                console.log(`>>>> got back: ${JSON.stringify(res, null, 4)}`);
            });

        form.resetForm();
    }

    /**
     * Loads (saves) predefined data to DB.
     * Used mainly for testing.
     */
    onLoadPredifinedData() {
        this._recipeDB.savePredefinedDataToDB();
    }
}
