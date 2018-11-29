import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {LoginComponent} from '../user-components/login/login.component';
import {SideNavService} from '../../services/side-nav.service';
import {Subscription} from 'rxjs';
import {LoggedUser} from '../../model/user';
import {UserService} from '../../services/user.service';
import {RecipeService} from '../../services/recipe.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
    opened: boolean;
    subSideNav: Subscription;
    userLogged: boolean;
    subUserLog: Subscription;

    constructor(private _dialog: MatDialog,
                private _sideNavService: SideNavService,
                private _userService: UserService,
                private _recipeService: RecipeService,
    ) {
        // subscribe to side nav service to be able toggle "brothers" side nav (inner sibling communication)
        this.subSideNav = this._sideNavService.getState().subscribe(state => { this.opened = state; });
        // subscribe to user logged variable
        this.subUserLog = this._userService.getLoginState().subscribe(state => { this.userLogged = state; });
    }

    ngOnInit() {
        // check if user is logged. if is: don't show login button
        this.userLogged = !!LoggedUser.get();
        console.log('user logged: ' + this.userLogged);
    }

    /**
     * Toggle side navigation
     */
    toggle(): void {
        this.opened = this._sideNavService.toggle();
    }

    /**
     * Open Login dialog popup
     */
    openDialog(): void {
        const dialogRef = this._dialog.open(LoginComponent, {
            // width: '250px',              // popup dialog width
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
        });
    }

    ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        this.subSideNav.unsubscribe();
        this.subUserLog.unsubscribe();
    }


    loadRecipes() {
        this._recipeService.get().subscribe();
    }
}
