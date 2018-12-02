import {User} from './user';


export interface Comment {
    _id?: string;
    User?: User;
    parentType?: string;
    Parent?: string;
    text?: string;
    comments?: Comment[];
    created?: string;
    updated?: string;
}
