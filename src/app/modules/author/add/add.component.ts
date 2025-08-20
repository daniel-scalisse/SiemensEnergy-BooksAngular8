import { Component, OnInit, AfterViewInit, ViewChildren, ElementRef } from '@angular/core';
import { FormControlName, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { AuthorService } from '../services/author.service';
import { AuthorFormBase } from '../author.formbase';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html'
})
export class AddComponent extends AuthorFormBase implements OnInit, AfterViewInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  constructor(
    private fb: FormBuilder,
    private service: AuthorService,
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
    if (this.formValid()) {
      this.author = Object.assign({}, this.author, this.authorForm.value);
      this.formResult = JSON.stringify(this.author);
      super.clearTextFields();

      this.service.add(this.author)
        .subscribe(
          success => { this.processSuccess(success) },
          failure => { this.processError(failure) }
        );
    }
  }

  processSuccess(response: any) {
    this.authorForm.reset();
    this.errors = [];
    this.unsavedChanges = false;

    let toast = this.toastr.success('Author successfully included.', 'Success!');
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