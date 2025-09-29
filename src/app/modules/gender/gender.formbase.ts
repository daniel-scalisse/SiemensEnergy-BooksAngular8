import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ElementRef } from '@angular/core';

import { FormBase } from 'src/app/base-class/form-base';
import { Gender } from './gender';

import { StringUtil } from 'src/app/utils/string-util';

export abstract class GenderFormBase extends FormBase {

    gender: Gender;
    genderForm: FormGroup;
    errors: any[] = [];

    minLengthName: number = 1;
    maxLengthName: number = 50;

    formResult: string = '';

    urlList: string = '/gender/list';

    constructor() {
        super();

        this.validationMessages = {
            Name: {
                required: 'Enter the Name',
                minlength: 'The Name must have at least ' + this.minLengthName + ' characters',
                maxlength: 'The Name must be at most ' + this.maxLengthName + ' characters'
            }
        };

        super.configureBaseValidationMessages(this.validationMessages);
    }

    protected configureFormValidation(formInputElements: ElementRef[]) {
        super.configureBaseFormValidation(formInputElements, this.genderForm);
    }

    protected configValidators(fb: FormBuilder) {
        this.genderForm = fb.group({
            Id: 0,
            Name: ['', [Validators.required, Validators.minLength(this.minLengthName), Validators.maxLength(this.maxLengthName)]],
            InclusionDate: []
        });
    }

    public formValid(): boolean {
        return this.genderForm.dirty && this.genderForm.valid;
    }

    public clearTextFields() {
        this.gender.Name = StringUtil.RemoveSpaces(this.gender.Name);
    }
}