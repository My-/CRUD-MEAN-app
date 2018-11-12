import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Recipe, RECIPES} from '../model/recipe';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material';

@Injectable()
export class RecipeService {

    constructor(private _http: HttpClient,
                private _snackBar: MatSnackBar) { }


    // TODO: add load data method

    add(userRecipe: Recipe): Observable<any> {
        console.log(`Sending to server: ${JSON.stringify(userRecipe, null, 4)}...`);

        return this._http.post('http://localhost:3000/recipe/save', userRecipe)
            .pipe(
                tap(val => this._snackBar.open(`Recipe ${(val as any).title} saved`, 'OK', {
                    duration: 2000,
                })),
                tap(val => console.log(`   ...got from server: ${JSON.stringify(val, null, 4)}`)),
            );
        // return Observable.create(sub => sub.next(userRecipe));
    }

    /**
     * Loads all data from const array RECIPES to DB.
     * Use just for testing/initial data purposes.
     */
    savePredifinedDataToDB() {
        console.log('Loading predefined data to DB...');

        RECIPES.forEach(recipe => {
            this._http.post('http://localhost:3000/recipe/save', recipe)
                .pipe(
                    tap(val => console.log(`    ${val ? '...saved ("' + (val as any).title + '")' : 'ERROR: DB didn\'t responded back!'}`)),
                )
                .subscribe(
                    () => console.log('All saved!'),
                    err => console.log(err)
                );
        });


    }
}
