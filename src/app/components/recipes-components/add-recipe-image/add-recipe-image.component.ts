import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-add-recipe-image',
    templateUrl: './add-recipe-image.component.html',
    styleUrls: ['./add-recipe-image.component.css']
})
export class AddRecipeImageComponent implements OnInit {
    imageURI: string;

    constructor() { }

    ngOnInit() {
    }

}
