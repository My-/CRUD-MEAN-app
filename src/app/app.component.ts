import {Component} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {LoginComponent} from './components/login/login.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'Recipie';

    constructor(private _dialog: MatDialog) { }

    openDialog(): void {
        const dialogRef = this._dialog.open(LoginComponent, {
            // width: '250px',              // popup dialog width
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
        });
    }
}
