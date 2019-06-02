import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class MonthService {
    monthSelected = new BehaviorSubject<number>(null);

    constructor() {
    }
}
