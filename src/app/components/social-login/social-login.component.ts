import {Component, OnInit} from '@angular/core';
import {LoginService} from '../../services/login.service';

@Component({
    selector: 'app-social-login',
    templateUrl: './social-login.component.html',
    styleUrls: ['./social-login.component.css']
})
export class SocialLoginComponent implements OnInit {

    constructor(private _loginService: LoginService) { }

    ngOnInit() { }

    loginGitHub() {
        this._loginService.github().subscribe(res => console.log(res));
    }

    loginGoogle() {
        this._loginService.google().subscribe(res => console.log(res));
    }

    login() { }

}
