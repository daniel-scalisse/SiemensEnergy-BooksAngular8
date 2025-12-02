import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

import { GenderDetails } from '../gender';
import { GenderService } from './gender.service';

@Injectable({
    providedIn: 'root'
})
export class GenderResolve implements Resolve<GenderDetails> {

    constructor(private service: GenderService) { }

    resolve(route: ActivatedRouteSnapshot) {
        return this.service.getById(route.params['id']);
    }
}