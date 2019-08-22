import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ToolbarTableComponent} from './toolbar-table.component';
import {FuseSharedModule} from '../../../../@fuse/shared.module';
import {SearchModule} from '../search/search.module';
import {MatButtonModule, MatIconModule, MatMenuModule, MatDialogModule, MatFormFieldModule} from '@angular/material';
import {FuseSearchBarModule} from '../../../../@fuse/components';
import { ExcelService } from '../../../core/services/excel.service';
import { UploadFileComponent } from './upload-file/upload-file.component';
import { ConfirmarComponent } from './confirmar/confirmar.component';

@NgModule({
    imports: [
        CommonModule,
        FuseSharedModule,
        SearchModule,
        MatButtonModule,
        MatIconModule,
        MatDialogModule,
        MatFormFieldModule,
        FuseSearchBarModule,
        MatMenuModule,
        
    ],
    declarations: [
        ToolbarTableComponent,
        ConfirmarComponent,
        UploadFileComponent
    ],
    entryComponents: [
        ConfirmarComponent,
        UploadFileComponent
    ],
    exports: [ToolbarTableComponent],
    providers: [ExcelService]
})
export class ToolbarTableModule {
}
