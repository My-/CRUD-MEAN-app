import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Comment} from '../../model/comment';

@Component({
    selector: 'app-add-comment',
    templateUrl: './add-comment.component.html',
    styleUrls: ['./add-comment.component.css']
})
export class AddCommentComponent implements OnInit {

    constructor(public dialogRef: MatDialogRef<AddCommentComponent>,
                @Inject(MAT_DIALOG_DATA) public data: Comment,
    ) { }

    ngOnInit() { }

    onNoClick(): void {
        this.dialogRef.close();
    }

}
