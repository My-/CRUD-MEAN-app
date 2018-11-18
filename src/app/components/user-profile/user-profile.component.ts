import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {LoggedUser, User} from '../../model/user';

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

    currentUser: User;

    constructor() { }

    ngOnInit() {
        this.currentUser = LoggedUser.get();
    }

}
