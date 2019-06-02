import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatSelectModule} from '@angular/material';
import {FooterComponent} from './footer.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        MatSelectModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [FooterComponent],
    exports: [FooterComponent]
})
export class FooterModule {
}
