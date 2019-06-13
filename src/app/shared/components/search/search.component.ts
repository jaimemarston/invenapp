import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';

@Component({
    selector: 'search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class SearchComponent implements OnInit {
    @Output() onKeyup: EventEmitter<string> = new EventEmitter();

    @Input() disabled: boolean;

    constructor() {
    }

    ngOnInit(): void {
    }

    keyup(value: string): void {
        this.onKeyup.emit(value);
    }

}
