import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Recipe, RECIPES} from '../model/recipe';
import {Observable} from 'rxjs';
import {tap, map} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material';

@Injectable()
export class RecipeService {

    constructor(private _http: HttpClient,
                private _snackBar: MatSnackBar) { }


    add(userRecipe: Recipe): Observable<any> {
        console.log('POST: http://localhost:3000/recipe...');
        console.log(`Sending to server: `);
        console.log(userRecipe);

        return this._http.post('http://localhost:3000/recipe', userRecipe)
            .pipe(
                tap(val => this._snackBar.open(`Recipe ${(val as any).title} saved`, 'OK', {
                    duration: 2000,
                })),
                tap(val => console.log(`   ...got from server: ${JSON.stringify(val, null, 4)}`)),
            );
        // return Observable.create(sub => sub.next(userRecipe));
    }

    /**
     * Get recipes from DataBase
     */
    get(): Observable<Recipe[]> {
        console.log(`${'\nGET: http://localhost:3000/recipe/'}`);

        return this._http.get('http://localhost:3000/recipe/all').pipe(
            map(data => <Recipe[]>data),
            tap(val => console.log(`   ...got from server:`)),
            tap( data => console.log(data))
        );
    }

    /**
     * Loads all data from const array RECIPES to DB.
     * Use just for testing/initial data purposes.
     */
    savePredefinedDataToDB() {
        const link = `http://localhost:3000/recipe`;

        console.log('\nLoading predefined data to DB...');
        console.log(`..POST: ${link}..`);

        RECIPES.forEach(recipe => {
            // console.log(`   ..data: ${JSON.stringify(recipe, null, 4)}`);

            this._http.post('http://localhost:3000/recipe', recipe)
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
