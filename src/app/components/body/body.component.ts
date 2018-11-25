import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {SideNavService} from '../../model/side-nav';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-body',
    templateUrl: './body.component.html',
    styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnDestroy {
    opened: boolean;
    subscription: Subscription;

    constructor(private _sideNavService: SideNavService) {
        this.subscription = this._sideNavService.getState().subscribe(state => { this.opened = state; });
    }

    ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        this.subscription.unsubscribe();
    }

}
