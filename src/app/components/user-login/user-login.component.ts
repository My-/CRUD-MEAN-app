import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LoginService} from '../../services/login.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
    selector: 'app-user-login',
    templateUrl: './user-login.component.html',
    styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
    // TODO: matdialog of login page

    loginForm: FormGroup = new FormGroup({
        email: new FormControl(null, [Validators.email, Validators.required]),
        password: new FormControl(null, Validators.required)
    });

    hide: boolean = true;

    constructor(private _router: Router, private _loginService: LoginService) {
    }

    ngOnInit() {
    }

    goToRgister() {
        this._router.navigate(['/register']);
    }

    login() {
        if (!this.loginForm.valid) {
            console.log('Invalid Login');
            return;
        }

        console.log(JSON.stringify(this.loginForm.value));
    }

    logout() {
        this._loginService.logout().subscribe(res => console.log(res));

    }

    loginGitHub() {
        this._loginService.github().subscribe(res => console.log(res));
    }

    loginGoogle() {
        this._loginService.google().subscribe(res => console.log(res));
    }
}
