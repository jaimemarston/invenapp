import {Component, EventEmitter, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {MONTHS} from '../../../core/const';
import {BehaviorSubject} from 'rxjs';
import {MonthService} from './month.service';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
    months = MONTHS;

    year: number;

    monthControl = new FormControl();

    monthString: string;

    now = new Date();

    constructor(private monthService: MonthService) {
        this.year = this.now.getFullYear();
        this.monthControl.setValue(this.now.getMonth());

        this.monthControl.valueChanges.subscribe(month => {
            this.monthString = this.months[month];
            this.monthService.monthSelected.next(month);
        });
    }

    ngOnInit(): void {
    }


}
