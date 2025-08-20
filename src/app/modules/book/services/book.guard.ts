import { Injectable } from '@angular/core';
import { CanActivate, CanDeactivate, Router, ActivatedRouteSnapshot } from '@angular/router';

import { BaseGuard } from 'src/app/services/base.guard';
import { AddComponent } from '../add/add.component';

@Injectable()
export class BookGuard extends BaseGuard implements CanActivate, CanDeactivate<AddComponent> {

    constructor(protected router: Router) { super(router); }

    canActivate(route: ActivatedRouteSnapshot) {
        //return super.validateClaims(route);
        return true;
    }

    canDeactivate(component: AddComponent) {
        if (component.unsavedChanges)
            return window.confirm('Do you want to skip filling it out?');
        return true;
    }
}