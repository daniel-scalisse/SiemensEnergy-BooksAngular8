import { Component, OnInit, AfterViewInit, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormControlName } from '@angular/forms';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { User } from '../user';
import { AccountService } from '../services/account.service';
import { FormBase } from 'src/app/base-class/form-base';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent extends FormBase implements OnInit, AfterViewInit {

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

  minLengthEmail: number = 10;
  maxLengthEmail: number = 100;

  minLengthPassword: number = 6;
  maxLengthPassword: number = 15;

  constructor(private fb: FormBuilder,
    private accountService: AccountService,
    private router: Router,
    private toastr: ToastrService) {

    super();

    //rangeLength e equalTo não são nativos.
    this.validationMessages = {
      email: {
        required: 'Enter the E-mail',
        minlength: 'The Password must have at least ' + this.minLengthEmail + ' characters',
        maxlength: 'The Password must be at most ' + this.maxLengthEmail + ' characters'
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
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(this.minLengthPassword), Validators.maxLength(this.maxLengthPassword)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(this.minLengthPassword), Validators.maxLength(this.maxLengthPassword)]]
    });
  }

  ngAfterViewInit(): void {
    super.configureBaseFormValidation(this.formInputElements, this.registerForm);
  }

  addAccount() {
    if (this.registerForm.dirty && this.registerForm.valid) {
      //Mapeia direto para o objeto conforme os campos do form, porque os nomes são os mesmos no front e back-end.
      this.user = Object.assign({}, this.user, this.registerForm.value);

      //O método é uma Observable e precisa fazer o subscribe.
      this.accountService.registrarUsuario(this.user)
        .subscribe(
          sucesso => { this.processarSucesso(sucesso) },
          falha => { this.processarFalha(falha) }
        );

      this.unsavedChanges = false;
    }
  }

  processarSucesso(response: any) {
    this.registerForm.reset();
    this.errors = [];

    this.accountService.LocalStorage.saveLocalUserData(response);

    let toast = this.toastr.success('Registro realizado com sucesso!', 'Bem vindo!!!');
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

  processarFalha(fail: any) {
    this.errors = fail.error.errors;
    this.toastr.error('Ocorreu um erro!', 'Opa :(');
  }
}