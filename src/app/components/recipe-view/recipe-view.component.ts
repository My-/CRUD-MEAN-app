import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from '../../model/recipe';

@Component({
    selector: 'app-recipe-view',
    templateUrl: './recipe-view.component.html',
    styleUrls: ['./recipe-view.component.css']
})
export class RecipeViewComponent implements OnInit {

    @Input() recipe: Recipe;

    displayedColumns: string[] = ['name', 'amount'];

    constructor() { }

    ngOnInit() { }

}
