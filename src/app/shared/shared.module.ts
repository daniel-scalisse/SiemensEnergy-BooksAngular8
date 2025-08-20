import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { GlobalErrorsComponent } from './global-errors.component';
import { PaginationComponent } from './pagination.components';
import { BookListSummaryComponent } from './book-list-summary/book-list-summary.component';

@NgModule({
  declarations: [
    GlobalErrorsComponent,
    PaginationComponent,
    BookListSummaryComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    GlobalErrorsComponent,
    PaginationComponent,
    BookListSummaryComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }