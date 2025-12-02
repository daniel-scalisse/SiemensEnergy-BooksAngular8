import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

import { BookView, BookEdit } from '../book';
import { BookService } from './book.service';

@Injectable({
    providedIn: 'root'
})
export class BookViewResolve implements Resolve<BookView> {

    constructor(private service: BookService) { }

    resolve(route: ActivatedRouteSnapshot) {
        return this.service.getById(route.params['id']);
    }
}

@Injectable({
    providedIn: 'root'
})
export class BookEditResolve implements Resolve<BookEdit> {

    constructor(private service: BookService) { }

    resolve(route: ActivatedRouteSnapshot) {
        return this.service.getByIdWithLists(route.params['id']);
    }
}