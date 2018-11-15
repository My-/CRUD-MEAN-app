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

    // https://stackoverflow.com/a/13946696/5322506
    private _specialChars = '^[!@#$%^&*()_+\\-=\\[\\]{};\':"\\\\|,.<>\\/?]+';
    private _alowedChar = '^[\\w&.\\-]*';

    loginForm: FormGroup = new FormGroup({
        userName: new FormControl(null, [
            Validators.required,
            // Validators.email,,
            Validators.minLength(3),
            // Validators.pattern(this._alowedChar),
        ]),
        password: new FormControl(null, [
            Validators.required,
            Validators.minLength(6),
            // Validators.pattern(this._specialChars),     // needs: special character
            // Validators.pattern('^[A-Z]+'),      // needs: upper case letter
            // Validators.pattern('^[a-z]+'),      // needs: lowercase letter
            // Validators.pattern('^[0-9]+'),      // needs: number
        ]),
    });

    hide: boolean = true;

    constructor(private _router: Router, private _loginService: LoginService) { }

    ngOnInit() { }

    goToRgister() {
        this._router.navigate(['/register']);
    }

    login() {
        if (!this.loginForm.valid) {

            console.log(`Invalid Login: ${JSON.stringify(this.loginForm.value)}`);
            return;
        }

        console.log(JSON.stringify(this.loginForm.value));
    }

    logout() {
        this._loginService.logout().subscribe(res => console.log(res));

    }

}
