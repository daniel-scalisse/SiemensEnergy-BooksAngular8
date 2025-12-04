import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { BaseService } from 'src/app/services/base.service';
import { User } from '../user';

@Injectable({
    providedIn: 'root'
})
export class AccountService extends BaseService {

    constructor(private http: HttpClient) { super(); }

    register(user: User): Observable<User> {
        /*
        O parâmetro de header deveria ter uma implementação, mas é opcional.
        O pipe processa o retorno com map.
        O map mapeia o resultado para um formato desejado.
        */
        let response = this.http
            .post(this.UrlServiceV1 + 'new-account', user, this.GetHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError));

        return response;
    }

    login(user: User): Observable<User> {
        let response = this.http
            .post(this.UrlServiceV1 + 'login', user, this.GetHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError));

        return response;
    }
}