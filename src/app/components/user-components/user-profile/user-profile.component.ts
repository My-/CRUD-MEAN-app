import {Component, OnChanges, OnInit} from '@angular/core';
import {UserService} from '../../../services/user.service';
import {LoggedUser, User} from '../../../model/user';
import {Subscription} from 'rxjs';
import {Recipe} from '../../../model/recipe';
import {RecipeService} from '../../../services/recipe.service';

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

    currentUser: User = new class implements User {
        _id: '';
        loginMethod: '';
        userName: '';
    };
    subUserLog: Subscription;

    constructor(private _userService: UserService,
                private _recipeService: RecipeService,
                ) {
        this.subUserLog = this._userService.getUserState().subscribe(state => { this.currentUser = state; });
    }

    ngOnInit() { }


    showRecipes() {
        this._recipeService.getUserRecipes().subscribe();
    }

    showComments() {

    }
}
