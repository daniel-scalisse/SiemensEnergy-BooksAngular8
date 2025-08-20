import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxSpinnerModule } from 'ngx-spinner';

import { AccountAppComponent } from './account.app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

import { AccountRoutingModule } from './account.route';

import { AccountService } from './services/account.service';
import { AccountGuard } from './services/account.guard';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AccountAppComponent,
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    NgxSpinnerModule,
    AccountRoutingModule
  ],
  providers: [
    AccountService,
    AccountGuard
  ]
})
export class AccountModule { }