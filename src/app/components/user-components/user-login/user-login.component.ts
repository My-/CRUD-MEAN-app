import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LoginService} from '../../../services/login.service';
import {UserService} from '../../../services/user.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar} from '@angular/material';
import {LoggedUser} from '../../../model/user';
import {LoginComponent} from '../login/login.component';

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
            Validators.minLength(4),
            // Validators.pattern(this._specialChars),     // needs: special character
            // Validators.pattern('^[A-Z]+'),      // needs: upper case letter
            // Validators.pattern('^[a-z]+'),      // needs: lowercase letter
            // Validators.pattern('^[0-9]+'),      // needs: number
        ]),
    });

    hide: boolean = true;

    constructor(private _router: Router,
                private _loginService: LoginService,
                private _userService: UserService,
                private _dialogRef: MatDialogRef<LoginComponent>,
                private _snackBar: MatSnackBar,
                ) { }

    ngOnInit() { }

    goToRgister() {
        this._router.navigate(['/register']);
    }

    /**
     * Logs user using user service.
     */
    login() {
        if (!this.loginForm.valid) {
            console.log(`Invalid Login: ${JSON.stringify(this.loginForm.value)}`);
            return;
        }

        // console.log(JSON.stringify(this.loginForm.value));
        const user = {
            username: this.loginForm.value.userName,
            password: this.loginForm.value.password,
        };

        this._userService.login({user}).subscribe(
            val => {
                this._snackBar.open(`Hi ${val.userName}    🍽️`, 'OK', {duration: 3000});
                this.closeDialog();
            },
            err => {
                console.log('User login error: '); console.log(err);
                this._snackBar.open(`Couldn't log you in. ${err.error.message}`, 'OK', {
                    duration: 3000,
                });
            });
    }

    closeDialog(): void {
        this._dialogRef.close();
    }

}
