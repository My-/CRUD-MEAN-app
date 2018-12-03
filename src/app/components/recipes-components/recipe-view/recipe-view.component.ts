import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Recipe} from '../../../model/recipe';
import {Comment} from '../../../model/comment';
import {RecipeService} from '../../../services/recipe.service';
import {UserService} from '../../../services/user.service';
import {LoggedUser, User} from '../../../model/user';
import {MatDialog, MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {ANONYMOUS} from '../../../model/user';
import {LoginComponent} from '../../user-components/login/login.component';
import {AddCommentComponent} from '../../add-comment/add-comment.component';

@Component({
    selector: 'app-recipe-view',
    templateUrl: './recipe-view.component.html',
    styleUrls: ['./recipe-view.component.css']
})
export class RecipeViewComponent implements OnInit, OnDestroy {

    @Input() recipe: Recipe;
    comments: Comment[];

    isRecipeOwner: boolean;

    // subscribe to service variable
    userLogged: boolean;
    subUserLog: Subscription;

    displayedColumns: string[] = ['name', 'amount'];

    constructor(private _recipeDB: RecipeService,
                private _userService: UserService,
                private _snackBar: MatSnackBar,
                private _router: Router,
                private _dialog: MatDialog,
    ) {
        // subscribe to user logged variable
        this.subUserLog = this._userService.getLoginState().subscribe(
            state => { this.userLogged = state; }
        );


    }


    ngOnInit() {
        // on refresh keep user logged if he is logged in
        this.userLogged = !!LoggedUser.get();

        if ( !this.recipe.User ) {
            this.recipe.User = ANONYMOUS;
        }

        // populate recipe user if not populated
        if ( !this.recipe.User._id ) {
            const userID: any = this.recipe.User;
            this._userService.getUser(userID).subscribe(
                val => this.recipe.User = val,
                err => console.log(err),
                () => {
                    // check recipe user id against logged user id.
                    if ( this.userLogged && this.recipe.User) {
                        this.isRecipeOwner = LoggedUser.get()._id === this.recipe.User._id;
                        console.log('recipe owner: ' + this.isRecipeOwner);
                        console.log(LoggedUser.get()._id);
                        console.log(this.recipe.User._id);
                    }
                }
            );
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

    /**
     * Adds comment to recipe
     */
    addComment() {
        // let text;
        const dialogRef = this._dialog.open(AddCommentComponent, {
            // width: '250px',              // popup dialog width
            data: {
                User: LoggedUser.get(),
            },
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            const recipeID = this.recipe._id;
            this._userService.createComment(result, recipeID).subscribe(
                data => {
                    console.log(data);
                    // this.recipe.comments.push(data);
                },
                err => console.log(err),
                () => console.log(this.recipe.comments)
            );
        });
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

    isUserComment(comment: Comment): boolean {
        return this.userLogged && <any>LoggedUser.get()._id === (<any>comment).User;
    }

    /**
     * Save / Update recipe comment
     * @param comment should be updated/created
     */
    saveComment(comment: Comment) {
        console.log(comment);

        if ( comment._id ) { // if comment has id update it..
            this._userService.updateComment(comment._id, comment.text).subscribe(
                val => console.log(val),
                err => console.log(err),
            );
        }
        else { // ..else create new
            const recipeID = this.recipe._id;
            this._userService.createComment(comment.text, recipeID).subscribe(
                val => console.log(val),
                err => console.log(err),
            );
        }


    }
}
