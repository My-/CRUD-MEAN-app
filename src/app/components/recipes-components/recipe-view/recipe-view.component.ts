import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Recipe} from '../../../model/recipe';
import {RecipeService} from '../../../services/recipe.service';
import {UserService} from '../../../services/user.service';
import {LoggedUser, User} from '../../../model/user';
import {MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-recipe-view',
    templateUrl: './recipe-view.component.html',
    styleUrls: ['./recipe-view.component.css']
})
export class RecipeViewComponent implements OnInit, OnDestroy {

    @Input() recipe: Recipe;

    userLogged: boolean;
    subUserLog: Subscription;

    displayedColumns: string[] = ['name', 'amount'];

    constructor(private _recipeDB: RecipeService,
                private _userService: UserService,
                private _snackBar: MatSnackBar,
                private _router: Router,
    ) {
        // subscribe to user logged variable
        this.subUserLog = this._userService.getLoginState().subscribe(state => { this.userLogged = state; });
    }


    ngOnInit() {
        // on refresh keep user logged if he is logged
        this.userLogged = !!LoggedUser.get();
    }


    /**
     * Delete recipe from DB
     */
    deleteRecipe() {
        this._recipeDB.deleteFromDB(this.recipe).subscribe(
            data => {
                console.log('Deleted: ');
                console.log(data);
            },
            err => console.log(err)
        );
    }


    addComment() {
        // TODO: popup create comment form >> save it >> display it
    }

    /**
     * Edit recipe
     */
    editRecipe() {
        this._router.navigate(['/recipe/createRecipe', {recipeID: this.recipe._id}]);
    }

    ngOnDestroy(): void {
        // unsubscribe to ensure no memory leaks
        this.subUserLog.unsubscribe();
    }
}
