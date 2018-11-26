import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Recipe, RECIPES} from '../model/recipe';
import {Observable, Subject} from 'rxjs';
import {tap, map} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material';
import {LoggedUser} from '../model/user';

@Injectable()
export class RecipeService {
    private recipes: Recipe[];
    private subject = new Subject<Recipe[]>();

    constructor(private _http: HttpClient,
                private _snackBar: MatSnackBar,
                ) {

    }

    getRecipesfromSubject(): Observable<Recipe[]> {
        return this.subject.asObservable();
    }

    add(userRecipe: Recipe): Observable<any> {
        const link = `http://localhost:3000/recipe`;
        const headers = new HttpHeaders()
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .set('Authorization', `Bearer ${LoggedUser.getToken()}`)
            .set('cache-control', 'no-cache');

        console.log(`POST: ${link}`);

        return this._http.post(link, userRecipe) // , {headers})
            .pipe(
                tap(val => this._snackBar.open(`Recipe ${(val as any).title} saved`, 'OK', {
                    duration: 2000,
                })),
                tap(val => console.log(`   ...got from server: ${JSON.stringify(val, null, 4)}`)),
            );
        // return Observable.create(sub => sub.next(userRecipe));
    }

    getUserRecipes(): Observable<Recipe[]> {
        const link = `http://localhost:3000/user/recipes`;
        const headers = new HttpHeaders()
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .set('Authorization', `Bearer ${LoggedUser.getToken()}`)
            .set('cache-control', 'no-cache');

        console.log(`..GET: ${link}`);
        // console.log(headers);

        return this._http.get(link, {headers}).pipe(
            map(it => <Recipe[]>it),
            tap(it => this.recipes = it),
            tap(it => this.subject.next(this.recipes)),
        );
    }

    /**
     * Get all recipes from DataBase
     */
    get(): Observable<Recipe[]> {
        console.log(`${'\nGET: http://localhost:3000/recipe/all'}`);

        return this._http.get('http://localhost:3000/recipe/all').pipe(
            map(data => <Recipe[]>data),
            tap(val => console.log(`   ...got from server:`)),
            tap(data => console.log(data)),
            tap(it => this.recipes = it),
            tap(it => this.subject.next(this.recipes)),
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

    delete(recipe: Recipe) {
        const link = `http://localhost:3000/recipe`;
        console.log(`DELETE: ${link}`);

        const headers = new HttpHeaders()
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .set('Authorization', `Bearer ${LoggedUser.getToken()}`)
            .set('cache-control', 'no-cache');

        // delete from db
        this._http.delete(`${link}?recipeID=${recipe._id}`, {headers}).subscribe();
        // go to db and reload recipes.( stupid, but it confirms deletion)
        this.get();

    }
}
