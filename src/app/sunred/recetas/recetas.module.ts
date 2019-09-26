import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RecetasComponent} from './recetas.component';
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
import {EditRecetasComponent} from './recetasmaestro/editrecetas/editrecetas.component';
import {RecetasmaestroComponent} from './recetasmaestro/recetasmaestro.component';
import {RecetasdetalleComponent} from './recetasdetalle/recetasdetalle.component';
import {EditrecetasdetalleComponent} from './recetasdetalle/editrecetasdetalle/editrecetasdetalle.component';
import {FuseSharedModule} from '../../../@fuse/shared.module';
import {ToolbarTableModule} from '../../shared/components/toolbar-table/toolbar-table.module';
import {FuseConfirmDialogModule, FuseSidebarModule} from '../../../@fuse/components';
import {ActionIconsModule} from '../../shared/components/action-icons/action-icons.module';
import {EditrecetasdetalleModule} from './recetasdetalle/editrecetasdetalle/editrecetasdetalle.module';

const routes: Routes = [
    {
        path: '',
        component: RecetasComponent
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

        EditrecetasdetalleModule
    ],
    declarations: [RecetasComponent, RecetasmaestroComponent, RecetasdetalleComponent, EditRecetasComponent],
    providers: [{provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2000}}]
})
export class RecetasModule {
}
