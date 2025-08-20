import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BookAppComponent } from './book.app.component';
import { AddComponent } from './add/add.component';
import { ListComponent } from './list/list.component';
import { EditComponent } from './edit/edit.component';
import { DeleteComponent } from './delete/delete.component';
import { DetailsComponent } from './details/details.component';

import { BookViewResolve, BookEditResolve } from './services/book.resolve';
import { BookGuard } from './services/book.guard';

const routerConfig: Routes = [
    {
        path: '', component: BookAppComponent,
        children: [
            //{ path: '', component: ListComponent },
            { path: 'list', component: ListComponent },
            {
                path: 'add', component: AddComponent,
                canActivate: [BookGuard],
                canDeactivate: [BookGuard],
                data: [{ claim: { Name: 'Book', valor: 'Add' } }]
            },
            {
                path: 'edit/:id', component: EditComponent,
                canActivate: [BookGuard],
                canDeactivate: [BookGuard],
                data: [{ claim: { Name: 'Book', valor: 'Edit' } }],
                resolve: { book: BookEditResolve }
            },
            {
                path: 'details/:id', component: DetailsComponent,
                resolve: { book: BookViewResolve }
            },
            {
                path: 'delete/:id', component: DeleteComponent,
                canActivate: [BookGuard],
                data: [{ claim: { Name: 'Book', valor: 'Del' } }],
                resolve: { book: BookViewResolve }
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routerConfig)],
    exports: [RouterModule]
})
export class BookRoutingModule { }