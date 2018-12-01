import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatSort, MatTableDataSource} from '@angular/material';
import {NgForm} from '@angular/forms';
import {FormControl} from '@angular/forms';

import {Ingredient, INGREDIENTS} from '../../../model/ingredient';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
    selector: 'app-add-recipe-ingredients',
    templateUrl: './add-recipe-ingredients.component.html',
    styleUrls: ['./add-recipe-ingredients.component.css']
})
export class AddRecipeIngredientsComponent implements OnInit {

    @Input() ingredients: Ingredient[];

    displayedColumns: string[] = ['name', 'amount'];
    dataSource: MatTableDataSource<Ingredient>;

    @ViewChild(MatSort) sort: MatSort;

    sortedData: Ingredient[];
    filteredIngredients: Observable<Ingredient[]>;
    ingredientsCtrl = new FormControl();

    constructor() {
        if ( !this.ingredients ) { this.ingredients = []; }
        this.dataSource = new MatTableDataSource(this.ingredients);

        this.sortedData = this.ingredients.slice();

        // Auto complete
        this.filteredIngredients = this.ingredientsCtrl.valueChanges
            .pipe(
                startWith(''),
                map(state => state ? this._filterIngredients(state) : INGREDIENTS.slice())
            );
    }

    private _filterIngredients(value: string): Ingredient[] {
        const filterValue = value.toLowerCase();

        return INGREDIENTS.filter(ingredient => ingredient.name.toLowerCase().indexOf(filterValue) === 0);
    }

    ngOnInit() {
        this.dataSource = new MatTableDataSource(this.ingredients);
        this.dataSource.sort = this.sort;
    }

    onAddIngredient(form: NgForm) {
        console.log(form.value);

        const recipeIngredient: Ingredient = {
            name: form.value.ingredient,
            amount: form.value.amount,
        };

        this.ingredients.push(recipeIngredient);

        console.log(this.ingredients);
        this.ngOnInit();

        form.resetForm();
    }
}
