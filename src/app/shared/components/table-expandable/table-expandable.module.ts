import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TableExpandableComponent} from './table-expandable.component';
import {MatTableModule} from '@angular/material';

@NgModule({
    imports: [
        CommonModule,
        MatTableModule,
    ],
    declarations: [TableExpandableComponent],
    exports: [TableExpandableComponent]
})
export class TableExpandableModule {
}
