import {NgModule} from '@angular/core';

import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {
    MatDialogModule, MatPaginatorModule,
    MatSortModule, MatToolbarModule,
} from '@angular/material';



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
    ]
})

export class MaterialModule {
}
