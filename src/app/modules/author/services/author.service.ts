import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { BaseService } from 'src/app/services/base.service';
import { Author, AuthorDetails } from '../author';
import { PagedDTO } from 'src/app/base-dto/pagedDTO';

@Injectable({
    providedIn: 'root'
})
export class AuthorService extends BaseService {

    constructor(private http: HttpClient) { super(); }

    listAll(ps: number, p: number, q: string): Observable<PagedDTO> {
        return this.http
            .get<PagedDTO>(this.UrlServiceV1 + "authors?ps=" + ps + "&p=" + p + "&q=" + q, super.GetAuthHeaderJson())
            .pipe(catchError(super.serviceError));
    }

    getById(id: number): Observable<AuthorDetails> {
        return this.http
            .get<AuthorDetails>(this.UrlServiceV1 + "authors/" + id, super.GetAuthHeaderJson())
            .pipe(catchError(super.serviceError));
    }

    add(author: Author): Observable<Author> {
        return this.http
            .post(this.UrlServiceV1 + "authors", author, this.GetAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

    update(author: Author): Observable<Author> {
        return this.http
            .put(this.UrlServiceV1 + "authors/" + author.Id, author, super.GetAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

    del(id: number): Observable<any> {
        return this.http
            .delete(this.UrlServiceV1 + "authors/" + id, super.GetAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }
}