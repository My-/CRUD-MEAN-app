import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class LoginService {

    constructor(private _http: HttpClient) {
    }

    github(): Observable<any> {
        return this._http.get('http://localhost:3000/auth/github');
    }

    logout(): Observable<any> {
        return this._http.get('http://localhost:3000/auth/logout');
    }

    google(): Observable<any> {
        return this._http.get('http://localhost:3000/auth/google');
    }
}
