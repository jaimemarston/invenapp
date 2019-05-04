import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MovmaterialComponent} from './movmaterial.component';
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
import {EditMovmaterialComponent} from './movmaterialmaestro/editmovmaterial/editmovmaterial.component';
import {MovmaterialmaestroComponent} from './movmaterialmaestro/movmaterialmaestro.component';
import {MovmaterialdetalleComponent} from './movmaterialdetalle/movmaterialdetalle.component';
import {EditmovmaterialdetalleComponent} from './movmaterialdetalle/editmovmaterialdetalle/editmovmaterialdetalle.component';
import {FuseSharedModule} from '../../../@fuse/shared.module';
import {ToolbarTableModule} from '../../shared/components/toolbar-table/toolbar-table.module';
import {FuseConfirmDialogModule, FuseSidebarModule} from '../../../@fuse/components';
import {ActionIconsModule} from '../../shared/components/action-icons/action-icons.module';
import {EditmovmaterialdetalleModule} from './movmaterialdetalle/editmovmaterialdetalle/editmovmaterialdetalle.module';

const routes: Routes = [
    {
        path: '',
        component: MovmaterialComponent
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

        EditmovmaterialdetalleModule
    ],
    declarations: [MovmaterialComponent, MovmaterialmaestroComponent, MovmaterialdetalleComponent, EditMovmaterialComponent],
    providers: [{provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2000}}]
})
export class MovmaterialModule {
}
