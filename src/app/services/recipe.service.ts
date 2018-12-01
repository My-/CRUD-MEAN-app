import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Recipe, RECIPES} from '../model/recipe';
import {Observable, Observer, Subject} from 'rxjs';
import {tap, map} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material';
import {LoggedUser} from '../model/user';

@Injectable()
export class RecipeService {

    // recipes array subject
    private subjectRecipesArr = new Subject<Recipe[]>();
    private recipesArr: Recipe[];

    // recipe subject
    private subjectRecipe = new Subject<Recipe>();
    private recipe: Recipe = {
        title: 'Recipe Title',
        instructions: 'Enter your recipe here',
    };


    constructor(private _http: HttpClient,
                private _snackBar: MatSnackBar,
    ) {

    }

    /**
     * Get recipe array instance
     */
    getRecipesArrFromSubject(): Observable<Recipe[]> {
        return this.subjectRecipesArr.asObservable();
    }

    /**
     * Get single recipe instance
     */
    getOneRecipeSubject(): Observable<Recipe> {
        return this.subjectRecipe.asObservable();
    }

    /**
     * Ser single recipe instance to
     * @param recipe instance of recipe
     */
    setRecipeSubjectTo(recipe: Recipe): void {
        this.recipe = recipe;
    }


    /*
    Create - POST
     */

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

    add(userRecipe: Recipe): Observable<any> {
        const link = `http://localhost:3000/recipe`;
        const headers = new HttpHeaders()
        // .set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
            .set('Authorization', `Bearer ${LoggedUser.getToken()}`)
            .set('cache-control', 'no-cache')
            .set('Content-Type', 'application/json'); // << OMG << magic fix

        console.log(`POST: ${link}`);

        return this._http.post(link, userRecipe, {headers})
            .pipe(
                tap(val => this._snackBar.open(`Recipe ${(val as any).title} saved`, 'OK', {
                    duration: 2000,
                })),
                tap(val => console.log(`   ...got from server: ${JSON.stringify(val, null, 4)}`)),
            );
        // return Observable.create(sub => sub.next(userRecipe));
    }


    /*
        Read - GET
     */

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
            tap(it => this.recipesArr = it),
            tap(it => this.subjectRecipesArr.next(this.recipesArr)),
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
            tap(it => this.recipesArr = it),
            tap(it => this.subjectRecipesArr.next(this.recipesArr)),
        );
    }


    /*
        Update - PUT
     */

    /**
     * Update recipe in God Mode.
     * @param recipe to be updated.
     */
    updateDB_GM(recipe: Recipe): Observable<Recipe> {
        const link = `http://localhost:3000/recipe/godmode`;
        console.log(`PUT: ${link}`);
        const body: any = recipe;
        const loggedUser = LoggedUser.get();

        if (loggedUser) { body.User = loggedUser._id; }
        else {
            this._snackBar.open('You need to login before claiming recipe');
            return;
        }

        console.log('user:');
        console.log(LoggedUser.get());
        console.log(' sending body:');
        console.log(body);

        return this._http.put(`${link}`, body).pipe(
            map(val => <Recipe>(val as any))
        );
    }


    /*
        Delete - DELETE
     */

    deleteFromDB(recipe: Recipe): Observable<Recipe> {
        const link = `http://localhost:3000/recipe`;
        console.log(`DELETE: ${link}`);

        const headers = new HttpHeaders()
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .set('Authorization', `Bearer ${LoggedUser.getToken()}`)
            .set('cache-control', 'no-cache');

        // delete from db
        return this._http.delete(`${link}?recipeID=${recipe._id}`, {headers}).pipe(
            map(it => <Recipe>(it as any)),
            tap(it => this.recipesArr = this.recipesArr.filter(e => it._id !== e._id))
        );

    }

    /**
     * Get one recipe by id from DB.
     * @param id recipe id.
     */
    getOne(id: string): Observable<Recipe> {
        const link = `http://localhost:3000/recipe?recipeID=${id}`;
        console.log(`GET: ${link}`);

        return this._http.get(link).pipe(
            map(val => <Recipe>(val as any)),
            tap(it => console.log(it)),
            tap(it => this.setRecipeSubjectTo(it)),
        );
    }
}
