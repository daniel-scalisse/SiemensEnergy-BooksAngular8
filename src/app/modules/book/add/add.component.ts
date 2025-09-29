import { Component, OnInit, AfterViewInit, ViewChildren, ElementRef, ViewChild } from '@angular/core';
import { FormControlName, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { BookService } from '../services/book.service';
import { BookFormBase } from '../book.formbase';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['../book.css']
})
export class AddComponent extends BookFormBase implements OnInit, AfterViewInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  @ViewChild('modal', { read: ElementRef, static: false }) private modal?: ElementRef<HTMLDialogElement>;
  showModal: boolean;

  constructor(
    private fb: FormBuilder,
    private service: BookService,
    private router: Router,
    private toastr: ToastrService) {

    super();
  }

  ngOnInit() {

    this.service.getLists()
      .subscribe(
        result => {
          this.genders = result.Genders;
          this.authors = result.Authors;
        },
        error => this.processError(error)
      );

    super.configureValidators(this.fb, 'I');
  }

  ngAfterViewInit(): void {
    super.configureFormValidation(this.formInputElements);
  }

  save() {
    if (super.formValid()) {
      super.setObjToAPI();
      super.clearTextFields();

      this.service.add(this.book)
        .subscribe(
          success => { this.processSuccess(success) },
          failure => { this.processError(failure) }
        );
    }
  }

  processSuccess(response: any) {
    this.bookForm.reset();
    this.errors = [];
    this.unsavedChanges = false;

    let toast = this.toastr.success('Book successfully included.', 'Success!');
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate([this.urlList]);
      });
    }
  }

  processError(failure: any) {
    this.errors = failure.error.errors;
    this.toastr.error('An error occurred!', 'Oops :(');
  }
}