import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthorAppComponent } from './author.app.component';
import { AddComponent } from './add/add.component';
import { DeleteComponent } from './delete/delete.component';
import { DetailsComponent } from './details/details.component';
import { EditComponent } from './edit/edit.component';
import { ListComponent } from './list/list.component';

import { AuthorResolve } from './services/author.resolve';
import { AuthorGuard } from './services/author.guard';

const routerConfig: Routes = [
    {
        path: '', component: AuthorAppComponent,
        children: [
            {
                path: 'add', component: AddComponent,
                canActivate: [AuthorGuard],
                canDeactivate: [AuthorGuard],
                data: [{ claim: { Name: 'Author', valor: 'Add' } }]
            },
            {
                path: 'delete/:id', component: DeleteComponent,
                canActivate: [AuthorGuard],
                data: [{ claim: { Name: 'Author', valor: 'Del' } }],
                resolve: { author: AuthorResolve }
            },
            {
                path: 'details/:id', component: DetailsComponent,
                resolve: { author: AuthorResolve }
            },
            {
                path: 'edit/:id', component: EditComponent,
                canActivate: [AuthorGuard],
                canDeactivate: [AuthorGuard],
                data: [{ claim: { Name: 'Author', valor: 'Edit' } }],
                resolve: { author: AuthorResolve }
            },
            { path: 'list', component: ListComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routerConfig)],
    exports: [RouterModule]
})
export class AuthorRoutingModule { }