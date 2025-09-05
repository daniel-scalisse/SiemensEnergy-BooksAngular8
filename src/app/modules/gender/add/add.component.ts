import { Component, OnInit, AfterViewInit, ViewChildren, ElementRef } from '@angular/core';
import { FormControlName, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { GenderService } from '../services/gender.service';
import { GenderFormBase } from '../gender.formbase';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html'
})
export class AddComponent extends GenderFormBase implements OnInit, AfterViewInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  constructor(
    private fb: FormBuilder,
    private service: GenderService,
    private router: Router,
    private toastr: ToastrService) {

    super();
  }

  ngOnInit() {
    super.configValidators(this.fb);
  }

  ngAfterViewInit(): void {
    super.configurarValidacaoFormulario(this.formInputElements);
  }

  save() {
    if (super.formValid()) {
      this.gender = Object.assign({}, this.gender, this.genderForm.value);
      this.formResult = JSON.stringify(this.gender);
      super.clearTextFields();

      this.service.add(this.gender)
        .subscribe(
          success => { this.processSuccess(success) },
          failure => { this.processError(failure) }
        );
    }
  }

  processSuccess(response: any) {
    this.genderForm.reset();
    this.errors = [];
    this.unsavedChanges = false;

    let toast = this.toastr.success('Gender successfully included.', 'Success!');
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