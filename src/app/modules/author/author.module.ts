import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxSpinnerModule } from 'ngx-spinner';

import { AuthorAppComponent } from './author.app.component';
import { AddComponent } from './add/add.component';
import { DeleteComponent } from './delete/delete.component';
import { DetailsComponent } from './details/details.component';
import { EditComponent } from './edit/edit.component';
import { ListComponent } from './list/list.component';

import { AuthorRoutingModule } from './author.route';

import { AuthorService } from './services/author.service';
import { AuthorResolve } from './services/author.resolve';
import { AuthorGuard } from './services/author.guard';

import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    AuthorAppComponent,
    AddComponent,
    DeleteComponent,
    DetailsComponent,
    EditComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    AuthorRoutingModule,
    SharedModule
  ],
  providers: [
    AuthorService,
    AuthorResolve,
    AuthorGuard
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AuthorModule { }