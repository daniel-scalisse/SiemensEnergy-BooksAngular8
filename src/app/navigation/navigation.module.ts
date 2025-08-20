import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { MenuLoginComponent } from './menu-login/menu-login.component';
import { NotFoundComponent } from './not-found/not-found.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    declarations: [
        AccessDeniedComponent,
        FooterComponent,
        HomeComponent,
        MenuComponent,
        MenuLoginComponent,
        NotFoundComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        NgbModule
    ],
    exports: [
        AccessDeniedComponent,
        FooterComponent,
        HomeComponent,
        MenuComponent,
        MenuLoginComponent,
        NotFoundComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NavigationModule { }