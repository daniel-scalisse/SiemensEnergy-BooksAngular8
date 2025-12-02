import { Injectable } from '@angular/core';
import { CanDeactivate, CanActivate, Router } from '@angular/router';

import { LocalStorageUtils } from 'src/app/utils/localstorage';
import { RegisterComponent } from '../register/register.component';

@Injectable({
    providedIn: 'root'
})
export class AccountGuard implements CanDeactivate<RegisterComponent>, CanActivate {

    localStorageUtils = new LocalStorageUtils();

    constructor(private router: Router) { }

    //Descobre se já alterou o estado do componente e sugere se realmente quer abandonar o preenchimento dos campos.
    canDeactivate(component: RegisterComponent) {
        if (component.unsavedChanges)
            return window.confirm('Are you sure you want to stop filling out the form?');

        return true;
    }

    /*
    Evita que navegue entre login e cadastro de conta, se estiver logado.
    Valida se tem usuario logado no storage do browser.
    */
    canActivate() {
        if (this.localStorageUtils.getUserToken())
            this.router.navigate(['/home']);

        return true;
    }
}