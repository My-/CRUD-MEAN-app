import {User} from './user';


export interface Comment {
    id: string;
    User: User;
    parentType: string;
    ParentID: string;
    text: string;
    comments: Comment[];
    created: string;
    updated: string;
}
