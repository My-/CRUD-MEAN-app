import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
    selector: 'app-user-register',
    templateUrl: './user-register.component.html',
    styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {

    registerForm: FormGroup = new FormGroup({
        email: new FormControl(null, [
            Validators.email,
            Validators.required,
        ]),
        username: new FormControl(null, [
            Validators.required,
        ]),
        password: new FormControl(null, [
            Validators.required,
        ]),
        repass: new FormControl(null, Validators.required)
    });

    constructor(private _router: Router) { }

    ngOnInit() { }

    goToLogin() {
        this._router.navigate(['/login']);
    }

    register() {
        const pass1 = this.registerForm.controls.password.value;
        const pass2 = this.registerForm.controls.repass.value;

        if( !this.registerForm.valid || pass1 !== pass2 ) {
            console.log('Invalid form');
            return;
        }

        console.log(JSON.stringify(this.registerForm.value));
    }

}
