import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';

import {LoggedUser, User} from '../model/user';

import {Observable, Observer, Subject, throwError} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material';
import {Recipe} from '../model/recipe';

@Injectable()

export class UserService {
    private loggedIn = false;
    private subject = new Subject<boolean>();
    private user: User;
    private userSubject = new Subject<User>();

    constructor(private _http: HttpClient) { }

    getLoginState(): Observable<boolean> {
        return this.subject.asObservable();
    }

    getUserState(): Observable<User> {
        return this.userSubject.asObservable();
    }

    logOut(): void {
        this.loggedIn = false;
        this.subject.next(this.loggedIn);
        LoggedUser.remove();
        this.user = new class implements User {
            _id: '';
            loginMethod: '';
            userName: '';
        };
        this.userSubject.next(this.user);
        console.log('Logged out');
    }

    /**
     * Get user details from Local storage
     */
    getUserDetailsLocalStorage(): Observable<User> {
        return Observable.create((observer: Observer<User>) => {
            observer.next(LoggedUser.get());
        });
    }


    updateDB(user: User){
        this._http.put('/')
    }



    /**
     * Get user details from DB by it's ID.
     */
    getUserDetailsDB(): Observable<User> {

        const headers = new HttpHeaders()
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .set('Authorization', `Bearer ${LoggedUser.getToken()}`)
            .set('cache-control', 'no-cache');

        return this._http.get(`$http://localhost:3000/user`,
            {headers: headers})
            .pipe(
                map(val => <User>(val as any).user)
            );
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
     *          - if valid, express sends back {user:{}, JWT: 'token'},
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
                tap(val => {
                    LoggedUser.set(val);
                    this.loggedIn = true;
                    this.subject.next(this.loggedIn);
                    this.user = LoggedUser.get();
                    this.userSubject.next(this.user);
                }),
            );
    }

    /**
     * Gets logged user. If here in no logged user returns null
     */
    getLoggedUser(): User {
        return LoggedUser.get();
    }
}
