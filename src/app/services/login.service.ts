import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material'

@Injectable()
export class LoginService {

    constructor(private _http: HttpClient,
                private _snackBar: MatSnackBar) {
    }
    // TODO: add login method to message
    github(): Observable<any> {
        return this._http.get('http://localhost:3000/auth/github').pipe(
            tap(val => this._snackBar.open(`${'add method'} logged!`, 'OK', {
                duration: 2000,
            }))
        );
    }
    // TODO: add login method to message
    logout(): Observable<any> {
        return this._http.get('http://localhost:3000/auth/logout').pipe(
            tap(val => this._snackBar.open(`${'add method'} logged!`, 'OK', {
                duration: 2000,
            }))
        );
    }
    // TODO: add login method to message
    google(): Observable<any> {
        return this._http.get('http://localhost:3000/auth/google').pipe(
            tap(val => this._snackBar.open(`${'add method'} logged!`, 'OK', {
                duration: 2000,
            }))
        );
    }
}
