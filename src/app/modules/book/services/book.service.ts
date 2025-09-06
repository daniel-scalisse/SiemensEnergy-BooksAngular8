import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { BaseService } from 'src/app/services/base.service';
import { Book, BookEdit, BookLists, BookView } from '../book';
import { PagedDTO } from 'src/app/base-dto/pagedDTO';

@Injectable()
export class BookService extends BaseService {

    constructor(private http: HttpClient) { super(); }

    listAll(ps: number, p: number, q: string): Observable<PagedDTO> {
        return this.http
            .get<PagedDTO>(this.UrlServiceV1 + "books?ps=" + ps + "&p=" + p + "&q=" + q, super.GetAuthHeaderJson())
            .pipe(catchError(super.serviceError));
    }

    getById(id: number): Observable<BookView> {
        return this.http
            .get<BookView>(this.UrlServiceV1 + "books/" + id, super.GetAuthHeaderJson())
            .pipe(catchError(super.serviceError));
    }

    getByIdWithLists(id: number): Observable<BookEdit> {
        return this.http
            .get<BookEdit>(this.UrlServiceV1 + "books/getWithLists?id=" + id, super.GetAuthHeaderJson())
            .pipe(catchError(super.serviceError));
    }

    add(book: Book): Observable<Book> {
        return this.http
            .post(this.UrlServiceV1 + "books", book, this.GetAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

    update(book: Book): Observable<Book> {
        return this.http
            .put(this.UrlServiceV1 + "books/" + book.Id, book, super.GetAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

    del(id: number): Observable<any> {
        return this.http
            .delete(this.UrlServiceV1 + "books/" + id, super.GetAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

    getLists(): Observable<BookLists> {
        return this.http
            .get<BookLists>(this.UrlServiceV1 + "books/getLists", super.GetAuthHeaderJson())
            .pipe(catchError(super.serviceError));
    }
}