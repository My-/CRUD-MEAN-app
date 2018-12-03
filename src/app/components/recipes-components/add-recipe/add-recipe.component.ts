import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, NgForm} from '@angular/forms';
import {RecipeService} from '../../../services/recipe.service';
import {Recipe} from '../../../model/recipe';
import {AddRecipeIngredientsComponent} from '../add-recipe-ingredients/add-recipe-ingredients.component';
import {AddRecipeImageComponent} from '../add-recipe-image/add-recipe-image.component';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';


@Component({
    selector: 'app-add-recipe',
    templateUrl: './add-recipe.component.html',
    styleUrls: ['./add-recipe.component.css']
})

/**
 * This component responsible for adding new recipes
 */
export class AddRecipeComponent implements OnInit, OnDestroy {

    @ViewChild(AddRecipeIngredientsComponent) recipeIngredients: AddRecipeIngredientsComponent;
    @ViewChild(AddRecipeImageComponent) image: AddRecipeImageComponent;
    recipe: Recipe = {
        title: '',
        instructions: '',
        ingredients: [],
    };
    subRecipe: Subscription;

    constructor(private _recipeDB: RecipeService,
                private _route: ActivatedRoute,
                ) {
        // subscribe on recipe inside recipe service
        this.subRecipe = this._recipeDB.getOneRecipeSubject().subscribe(
            recipe => { this.recipe = recipe; }
        );
    }


    ngOnInit() {
        // take data from route
        const recipeID = this._route.snapshot.paramMap.get('recipeID');
        this._recipeDB.getOne(recipeID).subscribe(
            data => this.recipe = data,
            err => console.log(err),
            // () => console.log(this.recipe)
        );
    }

    onAddRecipe(form: NgForm) {
        console.log(form.value);
        const imgArr = [];
        imgArr.push(this.image.imageURI);

        console.log(this.image.imageURI);
        console.log(imgArr);

        const userRecipe: Recipe = {
            // User: ,
            title: form.value.title,
            // allergies: [],
            takesTime: 0,
            pictures: imgArr,
            ingredients: this.recipeIngredients.ingredients,
            instructions: form.value.instructions,
        };

        console.log('sending');
        console.log(userRecipe);

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


    ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        this.subRecipe.unsubscribe();
    }
}
