import { Component, OnInit } from '@angular/core';

import { Book } from '../book';
import { BookService } from '../services/book.service';
import { ToastrService } from 'ngx-toastr';
import { Pagination } from 'src/app/utils/pagination';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html'
})
export class ListComponent implements OnInit {

  books: Book[];
  pagesSize: number[] = Pagination.getPagesSize();
  pageSize: number = this.pagesSize[0];
  page: number = 1;
  pages: number;
  total: number;
  query: string = "";
  errors: any[] = [];

  constructor(
    private service: BookService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.search();
  }

  startSearch() {
    this.page = 1;
    this.search();
  }

  search() {
    this.errors = [];
    this.service.listAll(this.pageSize, this.page, this.query)
      .subscribe(p => {
        this.books = p.List;
        this.pages = p.Pages;
        this.total = p.Total;
      },
        error => this.processError(error));
  }

  clear() {
    this.errors = [];
    this.query = "";
    this.books = [];
    this.page = 1;
    this.pages = 1;
    this.total = 0;
  }

  changePageSize(pageSize: number) {
    this.pageSize = pageSize;
    this.page = 1;
    this.search();
  }

  toFirst() {
    if (this.page != 1) {
      this.page = 1;
      this.search();
    }
  }

  toPrevious() {
    if (this.page > 1 && this.page <= this.pages) {
      this.page--;
      this.search();
    }
  }

  toNext() {
    if (this.page > 0 && this.page < this.pages) {
      this.page++;
      this.search();
    }
  }

  toLast() {
    this.page = this.pages;
    this.search();
  }

  processError(failure: any) {
    this.errors = failure.error.errors;
    this.toastr.error('There was an error listing!' + this.errors, 'Oops! :(');
  }
}