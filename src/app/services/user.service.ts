import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {LoggedUser, User} from '../model/user';

import {Observable} from 'rxjs';
import {throwError} from 'rxjs';
import {map, tap} from 'rxjs/operators';

@Injectable()

export class UserService {

    constructor(private _http: HttpClient) { }

    /**
     * Get user from DB by it's ID.
     * @param id - of the user we requesting
     */
    getByID(id: number): Observable<User> {
        return Observable.create();
    }

    /**
     * Save new user to DB.
     * @param user - we want to save
     */
    saveToDB(user: User): Observable<any> {
        return Observable.create();
    }

    /**
     * Logs user in.
     *      - post user to express,
     *          - express validates user,
     *          - if valid, express sends back user + JWT,
     *      - saves JWT to local storage,
     *      - saves user to LoggedUser
     *
     * @param user user to login
     */
    login({user}): Observable<User> {
        // validate if required values exist
        if (!user || !user.username || !user.password) {
            return throwError({
                message: `Missing data... user:  ${JSON.stringify(user, null, 4)}`,
            });
        }

        // send post request to express server
        return this._http.post('http://localhost:3000/auth/localLogin', user)
                .pipe(
                    // log response
                    tap(val => console.log(`...got ${JSON.stringify(val, null, 4)}`)),
                    // save JWT to local storage
                    tap(val => localStorage.setItem(LoggedUser.localStorageJWT, (val as any).token)),
                    // map to User object
                    map(val => <User>(val as any).user),
                    // save logged user as saved user
                    tap(val => LoggedUser.set(val)),
                );
    }
}
