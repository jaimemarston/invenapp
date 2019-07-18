import { Component } from '@angular/core';
import { MONTHS } from 'app/core/const';
import { FormControl } from '@angular/forms';
import { MonthService } from 'app/shared/components/footer/month.service';
import { FuseNavigationService } from '@fuse/components/navigation/navigation.service';

export interface Menu {
    path: string;
    name: string;
}
@Component({
    selector   : 'footer',
    templateUrl: './footer.component.html',
    styleUrls  : ['./footer.component.scss']
})
export class FooterComponent
{
    /**
     * Constructor
     */

    items: Menu[] = [
        {path: 'main', name: 'INVENTARIOS'},
        {path: 'produccion', name: 'PRODUCIÓN'}, 
        {path: 'empleados', name: 'EMPLEADOS'}
    ];

    months = MONTHS;

    year: number;

    menuControl = new FormControl('main');
    monthControl = new FormControl();

    monthString: string;

    now = new Date();
    constructor(
        private monthService: MonthService,
        private _fuseNavigationService: FuseNavigationService,
    )
    {
        this.year = this.now.getFullYear();
        this.monthControl.setValue(this.now.getMonth());
        this.monthControl.valueChanges.subscribe(month => {
            this.monthString = this.months[month];
            console.log(month);
            this.monthService.monthSelected.next(month);
        });

        this.menuControl.valueChanges.subscribe(path => {
            this._fuseNavigationService.setCurrentNavigation(path);
        });
    }
}
