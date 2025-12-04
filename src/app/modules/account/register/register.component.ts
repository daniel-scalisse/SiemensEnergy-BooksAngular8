import { Component, OnInit, AfterViewInit, ViewChildren, ElementRef, Renderer2 } from '@angular/core';
import { FormControlName, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { AccountFormBase } from '../account.formbase';

import { User } from '../user';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent extends AccountFormBase implements OnInit, AfterViewInit {

  /*
  É um selector que pega os dados do DOM.
  Especifica com FormControlName.
  Traz as referências de cada elemento do FormControl através da coleção de ElementRef.
  Observa o DOM do html através do ViewChildren.
  */
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  errors: any[] = [];
  registerForm: FormGroup;
  user: User;

  constructor(private fb: FormBuilder,
    private accountService: AccountService,
    private router: Router,
    private toastr: ToastrService,
    private renderer: Renderer2) {

    super();

    //rangeLength e equalTo não são nativos.
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
      },
      confirmPassword: {
        required: 'Confirm Password',
        minlength: 'The Confirm Password must have at least ' + this.minLengthPassword + ' characters',
        maxlength: 'The Confirm Password must be at most ' + this.maxLengthPassword + ' characters'
      }
    };

    super.configureBaseValidationMessages(this.validationMessages);
  }

  ngOnInit(): void {

    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email, Validators.minLength(this.minLengthEmail), Validators.maxLength(this.maxLengthEmail)]],
      password: ['', [Validators.required, Validators.minLength(this.minLengthPassword), Validators.maxLength(this.maxLengthPassword)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(this.minLengthPassword), Validators.maxLength(this.maxLengthPassword)]]
    });
  }

  ngAfterViewInit(): void {
    super.configureBaseFormValidation(this.formInputElements, this.registerForm);
    this.renderer.selectRootElement('#email').focus();
  }

  addAccount() {
    if (this.registerForm.dirty && this.registerForm.valid) {
      //Mapeia direto para o objeto conforme os campos do form, porque os nomes são os mesmos no front e back-end.
      this.user = Object.assign({}, this.user, this.registerForm.value);

      //O método é uma Observable e precisa fazer o subscribe.
      this.accountService.registrarUsuario(this.user)
        .subscribe(
          success => { this.processSuccess(success) },
          failure => { this.processError(failure) }
        );

      this.unsavedChanges = false;
    }
  }

  processSuccess(response: any) {
    this.registerForm.reset();
    this.errors = [];

    this.accountService.LocalStorage.saveLocalUserData(response);

    let toast = this.toastr.success('Registration completed successfully!', 'Welcome!!!');
    if (toast) {
      /*
      Toast retorna uma Observable, então usa subscribe pra criar um gatilho pra quando acontecer o evento.
      Depois do timeout faz o redirecionamento para a home.
      Dispara um evento e faz o subscribe nesse evento pra fazer uma ou mais ações.
      */
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/home']);
      });
    }
  }

  processError(failure: any) {
    this.errors = failure.error.errors;
    this.toastr.error('An error occurred!', 'Ops :(');
  }
}