import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Recipe} from '../model/recipe';
import {Observable} from 'rxjs';

@Injectable()
export class RecipeService {

    constructor(private _http: HttpClient) {
    }


    add(userRecipe: Recipe): Observable<any> {
        // TODO: add recipe to DB
        console.log(`Sending to server: ${JSON.stringify(userRecipe, null, 4)}`);

        const msg = {message: 'hello'};

        return this._http.post('http://localhost:3000/recipe/save', userRecipe);
        // return Observable.create(sub => sub.next(userRecipe));
    }
}
