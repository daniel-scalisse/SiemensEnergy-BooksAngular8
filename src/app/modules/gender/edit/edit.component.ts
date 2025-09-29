import { Component, OnInit, AfterViewInit, ViewChildren, ElementRef } from '@angular/core';
import { FormControlName, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

import { GenderService } from '../services/gender.service';
import { GenderFormBase } from '../gender.formbase';
import { GenderDetails } from '../gender';
import { BookView } from '../../book/book';
import { FormatDateTime } from 'src/app/utils/format-date';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styles: []
})
export class EditComponent extends GenderFormBase implements OnInit, AfterViewInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  details: GenderDetails;
  books: BookView[];
  inclusionDate: Date;//Auxiliar para devolver no post.

  constructor(
    private fb: FormBuilder,
    private service: GenderService,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService) {

    super();

    this.details = this.route.snapshot.data['gender'];
    this.gender = this.details.Gender;
    this.books = this.details.Books;

    this.inclusionDate = this.gender.InclusionDate;
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
    this.genderForm.patchValue({
      Id: this.gender.Id,
      Name: this.gender.Name,
      //Formata para mostrar no input.
      InclusionDate: FormatDateTime.ToEn(this.gender.InclusionDate)
    });
  }

  ngAfterViewInit() {
    super.configurarValidacaoFormulario(this.formInputElements);
  }

  save() {
    if (super.formValid()) {
      this.gender = Object.assign({}, this.gender, this.genderForm.value);
      super.clearTextFields();

      this.gender.InclusionDate = this.inclusionDate;

      this.service.update(this.gender)
        .subscribe(
          success => { this.processSuccess(success) },
          failure => { this.processError(failure) }
        );
    }
  }

  processSuccess(response: any) {
    this.errors = [];
    this.unsavedChanges = false;

    let toast = this.toastr.success('Gender successfully changed.', 'Success!');
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