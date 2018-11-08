import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-user-login',
    templateUrl: './user-login.component.html',
    styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

    loginForm: FormGroup =  new FormGroup({
        email: new FormControl(null, [Validators.email, Validators.required]),
        password: new FormControl(null, Validators.required)
    });

    constructor(private _router: Router) {
    }

    ngOnInit() {
    }

    goToRgister(){
        this._router.navigate(['/register']);
    }

    login() {
        if (!this.loginForm.valid) {
            console.log('Invalid Login'); return;
        }

        console.log(JSON.stringify(this.loginForm.value));
    }
}
