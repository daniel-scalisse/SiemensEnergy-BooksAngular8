import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ElementRef } from '@angular/core';

import { FormBase } from 'src/app/base-class/form-base';
import { Author } from './author';

import { StringUtil } from 'src/app/utils/string-util';

export abstract class AuthorFormBase extends FormBase {

    author: Author;
    authorForm: FormGroup;
    errors: any[] = [];

    minLengthName: number = 4;
    maxLengthName: number = 50;

    formResult: string = '';

    urlList: string = '/author/list';

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

    protected configurarValidacaoFormulario(formInputElements: ElementRef[]) {
        super.configureBaseFormValidation(formInputElements, this.authorForm);
    }

    protected configValidators(fb: FormBuilder) {
        this.authorForm = fb.group({
            Id: 0,
            Name: ['', [Validators.required, Validators.minLength(this.minLengthName), Validators.maxLength(this.maxLengthName)]],
            InclusionDate: []
        });
    }

    public formValid(): boolean {
        return this.authorForm.dirty && this.authorForm.valid;
    }

    public clearTextFields() {
        this.author.Name = StringUtil.RemoveSpaces(this.author.Name);
    }
}