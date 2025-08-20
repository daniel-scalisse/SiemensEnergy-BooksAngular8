import { Component, OnInit } from '@angular/core';

import { Gender } from '../gender';
import { GenderService } from '../services/gender.service';
import { ToastrService } from 'ngx-toastr';
import { Pagination } from 'src/app/utils/pagination';

@Component({
  selector: 'app-lista',
  templateUrl: './list.component.html'
})
export class ListComponent implements OnInit {

  public genders: Gender[];
  pagesSize: number[] = Pagination.getPagesSize();
  pageSize: number = this.pagesSize[0];
  page: number = 1;
  pages: number;
  total: number;
  query: string = "";
  errors: any[] = [];

  constructor(
    private service: GenderService,
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
        this.genders = p.List;
        this.pages = p.Pages;
        this.total = p.Total;
      },
        error => this.processError(error));
  }

  clear() {
    this.errors = [];
    this.query = "";
    this.genders = [];
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