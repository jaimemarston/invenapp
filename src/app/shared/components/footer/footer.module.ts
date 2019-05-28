import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule, MatIconModule, MatInputModule } from '@angular/material';

import { FuseSharedModule } from '../../../../@fuse/shared.module';
import { FooterComponent } from './footer.component';

@NgModule({
    imports: [
        CommonModule,
        MatIconModule,
        MatButtonModule,
        FuseSharedModule,
        MatInputModule
    ],
    declarations: [FooterComponent],
    exports: [FooterComponent]
})
export class FooterModule {
}
