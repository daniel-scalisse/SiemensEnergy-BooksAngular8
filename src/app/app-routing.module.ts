import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccessDeniedComponent } from './navigation/access-denied/access-denied.component';
import { HomeComponent } from './navigation/home/home.component';
import { NotFoundComponent } from './navigation/not-found/not-found.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: 'author',
    loadChildren: () => import('./modules/author/author.module')
      .then(m => m.AuthorModule)
  },
  {
    path: 'gender',
    loadChildren: () => import('./modules/gender/gender.module')
      .then(m => m.GenderModule)
  },
  {
    path: 'book',
    loadChildren: () => import('./modules/book/book.module')
      .then(m => m.BookModule)
  },
  {
    path: 'account',
    loadChildren: () => import('./modules/account/account.module')
      .then(m => m.AccountModule)
  },
  { path: 'access-denied', component: AccessDeniedComponent },
  { path: 'nao-encontrado', component: NotFoundComponent },
  { path: '**', component: NotFoundComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }