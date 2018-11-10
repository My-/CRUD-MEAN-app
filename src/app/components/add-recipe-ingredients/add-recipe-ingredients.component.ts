import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort, MatTableDataSource} from '@angular/material';
import {Ingredient} from '../../model/ingredient';
import {NgForm} from '@angular/forms';
import {Recipe} from '../../model/recipe';

@Component({
    selector: 'app-add-recipe-ingredients',
    templateUrl: './add-recipe-ingredients.component.html',
    styleUrls: ['./add-recipe-ingredients.component.css']
})
export class AddRecipeIngredientsComponent implements OnInit {

    public ingredients: Ingredient[] = [
        {name: 'Frozen yogurt', amount: 3},
        {name: 'Ice cream sandwich', amount: 5},
        {name: 'Eclair', amount: 7},
        {name: 'Cupcake', amount: 11},
        {name: 'Gingerbread', amount: 13},
    ];

    displayedColumns: string[] = ['name', 'amount'];
    dataSource = new MatTableDataSource(this.ingredients);

    @ViewChild(MatSort) sort: MatSort;

    sortedData: Ingredient[];

    constructor() {
        this.sortedData = this.ingredients.slice();
    }

    ngOnInit() {
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
