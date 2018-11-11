import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Recipe} from '../model/recipe';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material';

@Injectable()
export class RecipeService {

    constructor(private _http: HttpClient,
                private _snackBar: MatSnackBar) {
    }


    add(userRecipe: Recipe): Observable<any> {
        // TODO: add recipe to DB
        console.log(`Sending to server: ${JSON.stringify(userRecipe, null, 4)}`);

        const msg = {message: 'hello'};

        return this._http.post('http://localhost:3000/recipe/save', userRecipe)
            .pipe(
                tap(val => this._snackBar.open(`Recipe ${val.title} saved`, 'OK', {
                    duration: 2000,
                })),
            );
        // return Observable.create(sub => sub.next(userRecipe));
    }
}
