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
    comments: Component[];

    showMenu: boolean;

    // subscribe to service variable
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

        // load comments
        // this._userService.getComments().subscribe(
        //     comments => {
        //         comments.forEach(it => console.log(it));
        //     },
        //     err => console.log(err),
        // );

    }


    ngOnInit() {
        // on refresh keep user logged if he is logged in
        this.userLogged = !!LoggedUser.get();

        // check recipe user id against logged user id.
        if ( this.userLogged && this.recipe.User) {
            this.showMenu = LoggedUser.get()._id === this.recipe.User;
        }

        // load comments
        if ( !this.recipe.comments && this.recipe.comments.length > 0 ) {
            console.log('Comments');
            console.log(this.recipe.comments);
        }
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

    getComment(comment: Comment): string {
        return comment.text;
    }
}
