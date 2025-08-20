import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxSpinnerModule } from 'ngx-spinner';

import { GenderAppComponent } from './gender.app.component';
import { AddComponent } from './add/add.component';
import { DeleteComponent } from './delete/delete.component';
import { DetailsComponent } from './details/details.component';
import { EditComponent } from './edit/edit.component';
import { ListComponent } from './list/list.component';

import { GenderRoutingModule } from './gender.route';

import { GenderService } from './services/gender.service';
import { GenderResolve } from './services/gender.resolve';
import { GenderGuard } from './services/gender.guard';

import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    GenderAppComponent,
    AddComponent,
    DeleteComponent,
    DetailsComponent,
    EditComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    GenderRoutingModule,
    SharedModule
  ],
  providers: [
    GenderService,
    GenderResolve,
    GenderGuard
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GenderModule { }