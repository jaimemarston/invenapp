import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ToolbarTableComponent} from './toolbar-table.component';
import {FuseSharedModule} from '../../../../@fuse/shared.module';
import {SearchModule} from '../search/search.module';
import {MatButtonModule, MatIconModule, MatMenuModule} from '@angular/material';
import {FuseSearchBarModule} from '../../../../@fuse/components';
import { ExcelService } from '../../../core/services/excel.service';

@NgModule({
    imports: [
        CommonModule,
        FuseSharedModule,
        SearchModule,
        MatButtonModule,
        MatIconModule,
        FuseSearchBarModule,
        MatMenuModule,
        
    ],
    declarations: [ToolbarTableComponent],
    exports: [ToolbarTableComponent],
    providers: [ExcelService]
})
export class ToolbarTableModule {
}
