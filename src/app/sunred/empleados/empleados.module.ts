import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EmpleadosComponent} from './empleados.component';
import {RouterModule, Routes} from '@angular/router';
import {
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatDialogModule,
    MatInputModule,
    MatSnackBarModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatChipsModule,
    MatListModule,
    MatSelectModule,
    MatAutocompleteModule,
    MAT_SNACK_BAR_DEFAULT_OPTIONS, MatMenuModule, MatRippleModule, MatOptionModule, MatDividerModule,
} from '@angular/material';
import {EditEmpleadosComponent} from './empleadosmaestro/editempleados/editempleados.component';
import {EmpleadosmaestroComponent} from './empleadosmaestro/empleadosmaestro.component';
import {EmpleadosdetalleComponent} from './empleadosdetalle/empleadosdetalle.component';
import {EditempleadosdetalleComponent} from './empleadosdetalle/editempleadosdetalle/editempleadosdetalle.component';
import {FuseSharedModule} from '../../../@fuse/shared.module';
import {ToolbarTableModule} from '../../shared/components/toolbar-table/toolbar-table.module';
import {FuseConfirmDialogModule, FuseSidebarModule} from '../../../@fuse/components';
import {ActionIconsModule} from '../../shared/components/action-icons/action-icons.module';
import {EditempleadosdetalleModule} from './empleadosdetalle/editempleadosdetalle/editempleadosdetalle.module';

const routes: Routes = [
    {
        path: '',
        component: EmpleadosComponent
    }
];

@NgModule({
    imports: [
        CommonModule,
        MatButtonModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatRippleModule,
        MatTabsModule,
        MatTableModule,
        MatToolbarModule,
        MatPaginatorModule,
        MatSnackBarModule,
        MatOptionModule,
        MatSelectModule,
        FuseSharedModule,
        ToolbarTableModule,
        FuseConfirmDialogModule,
        FuseSidebarModule,
        MatDatepickerModule,
        MatNativeDateModule,         // <----- import(optional)
        MatChipsModule,
        MatSelectModule,
        MatAutocompleteModule,
        RouterModule.forChild(routes),
        ActionIconsModule,
        MatDividerModule,

        EditempleadosdetalleModule
    ],
    declarations: [EmpleadosComponent, EmpleadosmaestroComponent, EmpleadosdetalleComponent, EditEmpleadosComponent],
    providers: [{provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2000}}]
})
export class EmpleadosModule {
}
