import { HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

import { LocalStorageUtils } from '../utils/localstorage';

export abstract class BaseService {

    protected UrlServiceV1: string = environment.apiUrlv1;
    public LocalStorage = new LocalStorageUtils();

    protected GetHeaderJson() {
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
    }

    protected GetAuthHeaderJson() {
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.LocalStorage.getUserToken()}`
            })
        };
    }

    protected extractData(response: any) {
        return (response && response.data) || {};
    }

    protected serviceError(response: Response | any) {

        let customError: string[] = [];
        let customResponse = { error: { errors: [] } };

        if (response instanceof HttpErrorResponse) {

            if (response.statusText === "Unknown Error") {
                customError.push("An unknown error has occurred");
                response.error.errors = customError;
            }
        }

        let msg = "An error occurred while processing, please try again later or contact our support.";

        if (response.status === 500) {
            customError.push(msg);

            customResponse.error.errors = customError;
            return throwError(customResponse);
        }

        if (response.status === 400) {
            if (response.error && response.error.errors && response.error.errors.length > 0) {
                response.error.errors.forEach(m => {
                    customError.push(m);
                });
            }
            else
                customError.push(msg);

            customResponse.error.errors = customError;
            return throwError(customResponse);
        }

        return throwError(response);
    }
}