import { Component, OnInit, AfterViewInit, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControlName } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { AccountFormBase } from '../account.formbase';

import { User } from '../user';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent extends AccountFormBase implements OnInit, AfterViewInit {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  errors: any[] = [];
  loginForm: FormGroup;
  user: User;

  returnUrl: string;

  /*
  ActivatedRoute: dados sobre rota, origem, etc.
  Consegue tirar um snapshot da rota, qualquer informação como resolvers e tudo mais.
  Pode ser que não tenha nada, como no próprio login.
  */

  constructor(private fb: FormBuilder,
    private accountService: AccountService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService) {

    super();

    this.validationMessages = {
      email: {
        required: 'Enter the E-mail',
        email: 'Invalid E-mail',
        minlength: 'The E-mail must have at least ' + this.minLengthEmail + ' characters',
        maxlength: 'The E-mail must be at most ' + this.maxLengthEmail + ' characters'
      },
      password: {
        required: 'Enter the Password',
        minlength: 'The Password must have at least ' + this.minLengthPassword + ' characters',
        maxlength: 'The Password must be at most ' + this.maxLengthPassword + ' characters'
      }
    };

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'];

    super.configureBaseValidationMessages(this.validationMessages);
  }

  ngOnInit(): void {

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email, Validators.minLength(this.minLengthEmail), Validators.maxLength(this.maxLengthEmail)]],
      password: ['', [Validators.required, Validators.minLength(this.minLengthPassword), Validators.maxLength(this.maxLengthPassword)]]
    });
  }

  ngAfterViewInit(): void {
    super.configureBaseFormValidation(this.formInputElements, this.loginForm);
  }

  login() {
    if (this.loginForm.dirty && this.loginForm.valid) {
      this.user = Object.assign({}, this.user, this.loginForm.value);

      this.accountService.login(this.user)
        .subscribe(
          sucesso => { this.processSuccess(sucesso) },
          falha => { this.processError(falha) }
        );
    }
  }

  processSuccess(response: any) {

    this.loginForm.reset();
    this.errors = [];

    this.accountService.LocalStorage.saveLocalUserData(response);

    let toast = this.toastr.success('Login successful!', 'Welcome!!!');
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.returnUrl
          ? this.router.navigate([this.returnUrl])
          : this.router.navigate(['/home']);
      });
    }
  }

  processError(fail: any) {
    this.errors = fail.error.errors;
    this.toastr.error('An error occurred!', 'Ops :(');
  }
}