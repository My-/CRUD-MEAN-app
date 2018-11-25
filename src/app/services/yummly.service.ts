import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {keys} from '../../../.keys/keys';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

@Injectable()
export class YummlyService {

    constructor(private _http: HttpClient) { }

    search(recipe: string): Observable<any> {
        recipe = recipe.trim().replace(' ', '+');
        const url = `${keys.Yummily.URI}&${recipe}`;

        console.log('\nGET: ' + url + '...');

        return this._http.get(url).pipe(
            tap(it => console.log(it))
        );
    }

}
