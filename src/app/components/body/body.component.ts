import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {SideNavService} from '../../services/side-nav.service';
import {Subscription} from 'rxjs';
import {UserService} from '../../services/user.service';
import {LoggedUser} from '../../model/user';

@Component({
    selector: 'app-body',
    templateUrl: './body.component.html',
    styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit, OnDestroy {
    opened: boolean;
    subSideNav: Subscription;
    userLogged: boolean;
    subUserLog: Subscription;

    constructor(private _sideNavService: SideNavService,
                private _userService: UserService,
                ) {
        this.subSideNav = this._sideNavService.getState().subscribe(state => { this.opened = state; });
        this.subUserLog = this._userService.getLoginState().subscribe(state => { this.userLogged = state; });
    }



    ngOnInit(): void {
        this.userLogged = !!LoggedUser.get();
    }

    ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        this.subSideNav.unsubscribe();
        this.subUserLog.unsubscribe();
    }

    logOut() {
        this.opened = false;
        this._userService.logOut();
    }

}
