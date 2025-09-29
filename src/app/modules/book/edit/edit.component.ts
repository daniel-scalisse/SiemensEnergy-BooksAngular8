import { Component, OnInit, AfterViewInit, ViewChildren, ElementRef } from '@angular/core';
import { FormControlName, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

import { BookService } from '../services/book.service';
import { BookFormBase } from '../book.formbase';
import { BookEdit } from '../book';
import { FormatDate, FormatDateTime } from 'src/app/utils/format-date';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['../book.css']
})
export class EditComponent extends BookFormBase implements OnInit, AfterViewInit {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  edit: BookEdit;
  orderDate: string;
  purchaseDate: string;
  inclusionDate: Date;//Auxiliar para devolver no post.

  constructor(
    private fb: FormBuilder,
    private service: BookService,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService) {

    super();

    this.edit = this.route.snapshot.data['book'];
    this.book = this.edit.Book;
    this.genders = this.edit.BookLists.Genders;
    this.authors = this.edit.BookLists.Authors;

    this.purchaseDate = this.book.PurchaseDate != null && this.book.PurchaseDate.toString() != "" ? FormatDate.ToEn(this.book.PurchaseDate) : null;
    this.inclusionDate = this.book.InclusionDate;
  }

  ngOnInit() {
    this.spinner.show();

    super.configValidators(this.fb, 'U');

    this.setFormFields();

    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
  }

  setFormFields() {
    this.bookForm.patchValue({
      Id: this.book.Id,
      GenderId: this.book.GenderId,
      AuthorId: this.book.AuthorId,
      Title: this.book.Title,
      Subtitle: this.book.Subtitle,
      Year: this.book.Year,
      Edition: this.book.Edition,
      PageQuantity: this.book.PageQuantity,
      ISBN: this.book.ISBN,
      Barcode: this.book.Barcode,
      Value: this.book.Value,
      OrderDate: this.orderDate,
      PurchaseDate: this.purchaseDate,
      Observation: this.book.Observation,
      Dedication: this.book.Dedication,
      //Formata para mostrar no input.
      InclusionDate: FormatDateTime.ToEn(this.book.InclusionDate)
    });
  }

  ngAfterViewInit(): void {
    super.configureFormValidation(this.formInputElements);
  }

  save() {
    if (super.formValid()) {
      super.setObjToAPI();
      super.clearTextFields();

      this.book.InclusionDate = this.inclusionDate;

      this.service.update(this.book)
        .subscribe(
          success => { this.processSuccess(success) },
          failure => { this.processError(failure) }
        );
    }
  }

  processSuccess(response: any) {
    this.errors = [];
    this.unsavedChanges = false;

    let toast = this.toastr.success('Book successfully changed.', 'Success!');
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate([this.urlList]);
      });
    }
  }

  processError(failure: any) {
    console.log("failure...: ", failure);
    this.errors = failure.error.errors;
    this.toastr.error('An error occurred!', 'Oops :(');
  }
}