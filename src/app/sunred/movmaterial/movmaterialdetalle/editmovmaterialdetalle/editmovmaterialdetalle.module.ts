import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatAutocompleteModule, MatButtonModule, MatInputModule, MatSelectModule, MatSnackBarModule} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {EditmovmaterialdetalleComponent} from './editmovmaterialdetalle.component';
import {FlexLayoutModule} from '@angular/flex-layout';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        MatInputModule,
        MatButtonModule,
        MatAutocompleteModule,
        MatSelectModule,
        MatSnackBarModule,
        FlexLayoutModule
    ],
    declarations: [EditmovmaterialdetalleComponent],
    exports: [EditmovmaterialdetalleComponent]
})
export class EditmovmaterialdetalleModule {
}
