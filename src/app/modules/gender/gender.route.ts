import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GenderAppComponent } from './gender.app.component';
import { AddComponent } from './add/add.component';
import { DeleteComponent } from './delete/delete.component';
import { DetailsComponent } from './details/details.component';
import { EditComponent } from './edit/edit.component';
import { ListComponent } from './list/list.component';

import { GenderResolve } from './services/gender.resolve';
import { GenderGuard } from './services/gender.guard';

const routerConfig: Routes = [
    {
        path: '', component: GenderAppComponent,
        children: [
            {
                path: 'add', component: AddComponent,
                canActivate: [GenderGuard],
                canDeactivate: [GenderGuard],
                data: [{ claim: { Name: 'Gender', valor: 'Add' } }]
            },
            {
                path: 'delete/:id', component: DeleteComponent,
                canActivate: [GenderGuard],
                data: [{ claim: { Name: 'Gender', valor: 'Del' } }],
                resolve: { gender: GenderResolve }
            },
            {
                path: 'details/:id', component: DetailsComponent,
                resolve: { gender: GenderResolve }
            },
            {
                path: 'edit/:id', component: EditComponent,
                canActivate: [GenderGuard],
                canDeactivate: [GenderGuard],
                data: [{ claim: { Name: 'Gender', valor: 'Edit' } }],
                resolve: { gender: GenderResolve }
            },
            { path: 'list', component: ListComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routerConfig)],
    exports: [RouterModule]
})
export class GenderRoutingModule { }