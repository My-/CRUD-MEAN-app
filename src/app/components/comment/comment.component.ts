import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Comment} from '../../model/comment';
import {LoggedUser, User} from '../../model/user';
import {NgForm} from '@angular/forms';
import {UserService} from '../../services/user.service';


@Component({
    selector: 'app-comment',
    templateUrl: './comment.component.html',
    styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

    @Input() comment: Comment;
    @Output() commentEvent = new EventEmitter<Comment>();

    user: User = {};
    editable: boolean;
    edit: boolean;

    constructor(private _userService: UserService,
                ) { }

    ngOnInit() {
        // populate user from DB
        const userID: any = this.comment.User._id ? this.comment.User._id : this.comment.User;
        this._userService.getUser(userID).subscribe(
            user => this.user = user,
            err => console.log(err),
        );

        if ( !!LoggedUser.get() ) {
            this.editable = userID === LoggedUser.get()._id;
        }
    }

    onEdit(): void {
        this.edit = true;
    }

    onSubmitComment(form: NgForm): void {
        this.edit = false;
        this.comment.text = form.value.commentText;
        this.commentEvent.emit(this.comment);
    }

    onCancel() {
        this.edit = false;
    }
}
