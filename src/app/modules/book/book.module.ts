import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxSpinnerModule } from 'ngx-spinner';

import { BookAppComponent } from './book.app.component';
import { AddComponent } from './add/add.component';
import { DeleteComponent } from './delete/delete.component';
import { DetailsComponent } from './details/details.component';
import { EditComponent } from './edit/edit.component';
import { ListComponent } from './list/list.component';

import { BookRoutingModule } from './book.route';

import { BookService } from './services/book.service';
import { BookEditResolve, BookViewResolve } from './services/book.resolve';
import { BookGuard } from './services/book.guard';

import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    BookAppComponent,
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
    BookRoutingModule,
    SharedModule
  ],
  providers: [
    BookService,
    BookEditResolve,
    BookViewResolve,
    BookGuard
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BookModule { }