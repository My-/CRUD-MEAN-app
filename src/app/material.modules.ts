import {NgModule} from '@angular/core';

import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatDialogModule} from '@angular/material/dialog';
import {MatCardModule} from '@angular/material/card';
import {MatExpansionModule} from '@angular/material/expansion';

import {MatPaginatorModule, MatSortModule, MatToolbarModule} from '@angular/material';



@NgModule({
    imports: [
        MatTableModule,
        MatInputModule,
        MatButtonModule,
        MatDialogModule,
        MatIconModule,
        MatPaginatorModule,
        MatSortModule,
        MatToolbarModule,
        MatAutocompleteModule,
        MatSnackBarModule,
        MatTooltipModule,
        MatCardModule,
        MatExpansionModule,
    ],
    exports: [
        MatTableModule,
        MatInputModule,
        MatButtonModule,
        MatDialogModule,
        MatIconModule,
        MatPaginatorModule,
        MatSortModule,
        MatToolbarModule,
        MatAutocompleteModule,
        MatSnackBarModule,
        MatTooltipModule,
        MatCardModule,
        MatExpansionModule,
    ]
})

export class MaterialModules { }
