import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

import { AuthorDetails } from '../author';
import { AuthorService } from './author.service';

@Injectable({
    providedIn: 'root'
})
export class AuthorResolve implements Resolve<AuthorDetails> {

    constructor(private service: AuthorService) { }

    resolve(route: ActivatedRouteSnapshot) {
        return this.service.getById(route.params['id']);
    }
}