import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {LoginComponent} from '../user-components/login/login.component';
import {SideNavService} from '../../model/side-nav';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
    opened: boolean;
    subscription: Subscription;

    constructor(private _dialog: MatDialog,
                private _sideNavService: SideNavService,
                ) {
        this.subscription = this._sideNavService.getState().subscribe(state => { this.opened = state; });
    }

    ngOnInit() { }

    toggle(): void {
        this.opened = this._sideNavService.toggle();
    }

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
        this.subscription.unsubscribe();
    }


}
