import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from '../../../model/recipe';
import {RecipeService} from '../../../services/recipe.service';
import {UserService} from '../../../services/user.service';
import {LoggedUser, User} from '../../../model/user';
import {MatSnackBar} from '@angular/material';

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
                private _snackBar: MatSnackBar,
    ) { }

    ngOnInit() { }

    deleteRecipe() {
        this._recipeDB.deleteFromDB(this.recipe);
    }

    claimOwnership() {
        const user: User = LoggedUser.get();

        // Check if user is logged in
        if (!user) {
            this._snackBar.open('You need to login before claiming recipe.', 'OK', {duration: 3000});
            return;
        }

        // update Recipe
        this._recipeDB.updateDB_GM(this.recipe).subscribe(
            recipe => {

                console.log('got:');
                console.log(recipe);

                this._snackBar.open('recipe claimed', 'OK', {duration: 2000});

                if ( user._id !== recipe.User._id ) {
                    return new Error(`Fatal. ID' should be the same. ${user._id} !== ${recipe.User}`);
                }

                // update user
                user.recipes.push(recipe);
                console.log('user');
                console.log(user);
                this._userService.updateDB(user).subscribe(
                    it => {
                        console.log(it);
                        this._snackBar.open('recipe added to user', 'OK', {duration: 2000});
                    },
                    err => console.log(err)
                );
            },
            err => console.log(err)

        );
    }
}
