import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule, Routes} from '@angular/router';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import {MatButtonModule, MatIconModule, MatSnackBarModule} from '@angular/material';
import {TranslateModule} from '@ngx-translate/core';
import 'hammerjs';

import {FuseModule} from '@fuse/fuse.module';
import {FuseSharedModule} from '@fuse/shared.module';
import {FuseProgressBarModule, FuseSidebarModule, FuseThemeOptionsModule} from '@fuse/components';

import {fuseConfig} from 'app/fuse-config';

import {AppComponent} from 'app/app.component';

import {LayoutModule} from 'app/layout/layout.module';
import {SampleModule} from 'app/sunred/sample/sample.module';
import {routes} from './app.routing';
import {InMemoryWebApiModule} from 'angular-in-memory-web-api';
import {FakeDbService} from './fake-db/fake-db.service';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {JwtInterceptor} from './shared/interceptors/jwt.service';
import {FooterModule} from './shared/components/footer/footer.module';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule.forRoot(routes),

        TranslateModule.forRoot(),
        InMemoryWebApiModule.forRoot(FakeDbService, {
            delay: 0,
            passThruUnknownUrl: true
        }),

        // Material moment date module
        MatMomentDateModule,

        // Material
        MatButtonModule,
        MatIconModule,

        // Fuse modules
        FuseModule.forRoot(fuseConfig),
        FuseProgressBarModule,
        FuseSharedModule,
        FuseSidebarModule,
        FuseThemeOptionsModule,
        MatSnackBarModule,

        // App modules
        LayoutModule,
        SampleModule,
        FooterModule
    ],
    providers: [
        {provide: LocationStrategy, useClass: HashLocationStrategy},
        {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {
}
