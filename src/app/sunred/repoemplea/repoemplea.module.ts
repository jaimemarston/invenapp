import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {RepoempleaComponent} from './repoemplea.component';
import {
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule, MatOptionModule, MatPaginatorModule,
    MatRippleModule, MatSelectModule, MatSnackBarModule,
    MatTableModule, MatToolbarModule
} from '@angular/material';
import {FuseSharedModule} from '../../../@fuse/shared.module';
import {ToolbarTableModule} from '../../shared/components/toolbar-table/toolbar-table.module';
import {FuseConfirmDialogModule, FuseSidebarModule} from '../../../@fuse/components';
import {ActionIconsModule} from '../../shared/components/action-icons/action-icons.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TableExpandableModule} from '../../shared/components/table-expandable/table-expandable.module';
import {FuseProgressBarModule} from '../../shared/components/progress-bar/progress-bar.module';
import {SearchModule} from '../../shared/components/search/search.module';

const routes: Routes = [
    {
        path: '',
        component: RepoempleaComponent,
        children: [
            {
                path: '',
                component: RepoempleaComponent
            },
        ]
    },
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes),
        MatButtonModule,
        SearchModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatRippleModule,
        MatTableModule,
        MatToolbarModule,
        MatPaginatorModule,
        MatSnackBarModule,
        MatOptionModule,
        MatSelectModule,
        FuseSharedModule,
        ToolbarTableModule,
        FuseConfirmDialogModule,
        ActionIconsModule,
        FuseSidebarModule,
        FuseProgressBarModule,
        TableExpandableModule
    ],
    declarations: [RepoempleaComponent]
})
export class RepoempleaModule {
}
