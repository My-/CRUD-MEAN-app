import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable()
export class SideNavService {
    private opened = false;
    private subject = new Subject<boolean>();

    open(): void {
        this.opened = true;
        this.subject.next(this.opened);
    }

    close(): void {
        this.opened = false;
        this.subject.next(this.opened);
    }

    getState(): Observable<any> {
        return this.subject.asObservable();
    }


    toggle(): boolean {
        this.opened = !this.opened;
        this.subject.next(this.opened);
        return this.opened;
    }
}
