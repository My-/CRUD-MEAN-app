import {Injectable} from '@angular/core';
import {Recipe} from '../model/recipe';
import {Observable} from 'rxjs';

@Injectable()
export class RecipeService {

    constructor() {
    }


    add(userRecipe: Recipe): Observable<any> {
        // TODO: add recipe to DB
        console.log(userRecipe);
        return Observable.create(sub => sub.next(userRecipe));
    }
}
