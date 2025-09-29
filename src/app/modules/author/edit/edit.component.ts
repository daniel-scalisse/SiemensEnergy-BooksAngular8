import { Component, OnInit, AfterViewInit, ViewChildren, ElementRef } from '@angular/core';
import { FormControlName, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

import { AuthorService } from '../services/author.service';
import { AuthorFormBase } from '../author.formbase';
import { AuthorDetails } from '../author';
import { BookView } from '../../book/book';
import { FormatDateTime } from 'src/app/utils/format-date';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styles: []
})
export class EditComponent extends AuthorFormBase implements OnInit, AfterViewInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  details: AuthorDetails;
  books: BookView[];
  inclusionDate: Date;//Auxiliar para devolver no post.

  constructor(
    private fb: FormBuilder,
    private service: AuthorService,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService) {

    super();

    this.details = this.route.snapshot.data['author'];
    this.author = this.details.Author;
    this.books = this.details.Books;

    this.inclusionDate = this.author.InclusionDate;
  }

  ngOnInit() {
    this.spinner.show();

    super.configValidators(this.fb);

    this.setFormFields();

    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
  }

  setFormFields() {
    this.authorForm.patchValue({
      Id: this.author.Id,
      Name: this.author.Name,
      //Formata para mostrar no input.
      InclusionDate: FormatDateTime.ToEn(this.author.InclusionDate)
    });
  }

  ngAfterViewInit() {
    super.configurarValidacaoFormulario(this.formInputElements);
  }

  save() {
    if (super.formValid()) {
      this.author = Object.assign({}, this.author, this.authorForm.value);
      super.clearTextFields();

      this.author.InclusionDate = this.inclusionDate;

      this.service.update(this.author)
        .subscribe(
          success => { this.processSuccess(success) },
          failure => { this.processError(failure) }
        );
    }
  }

  processSuccess(response: any) {
    this.errors = [];
    this.unsavedChanges = false;

    let toast = this.toastr.success('Author successfully changed.', 'Success!');
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