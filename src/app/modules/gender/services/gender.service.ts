import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { BaseService } from 'src/app/services/base.service';
import { Gender, GenderDetails } from '../gender';
import { PagedDTO } from 'src/app/base-dto/pagedDTO';

@Injectable()
export class GenderService extends BaseService {

    gender: Gender = new Gender();

    constructor(private http: HttpClient) { super(); }

    listAll(ps: number, p: number, q: string): Observable<PagedDTO> {
        return this.http
            .get<PagedDTO>(this.UrlServiceV1 + "genders?ps=" + ps + "&p=" + p + "&q=" + q, super.GetAuthHeaderJson())
            .pipe(catchError(super.serviceError));
    }

    getById(id: number): Observable<GenderDetails> {
        return this.http
            .get<GenderDetails>(this.UrlServiceV1 + "genders/" + id, super.GetAuthHeaderJson())
            .pipe(catchError(super.serviceError));
    }

    add(gender: Gender): Observable<Gender> {
        return this.http
            .post(this.UrlServiceV1 + "genders", gender, this.GetAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

    update(gender: Gender): Observable<Gender> {
        return this.http
            .put(this.UrlServiceV1 + "genders/" + gender.Id, gender, super.GetAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

    del(id: number): Observable<any> {
        return this.http
            .delete(this.UrlServiceV1 + "genders/" + id, super.GetAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }
}