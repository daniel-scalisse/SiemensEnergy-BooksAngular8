import { Component } from '@angular/core';

/*
Faz o roteamento dos componentes filhos.
É o componente principal onde a rota será registrada apontando pra ele em alguns momentos.
*/
@Component({
    selector: 'account-app-root',
    template: '<router-outlet></router-outlet>'
})
export class AccountAppComponent {}