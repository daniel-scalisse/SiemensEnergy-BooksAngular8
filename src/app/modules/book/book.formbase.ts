import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { ElementRef } from '@angular/core';

import { FormBase } from 'src/app/base-class/form-base';
import { Book } from './book';

import { KeyValueInt } from 'src/app/base-dto/keyValueInt';
import { ConvertFile } from 'src/app/utils/convert-file';
import { StringUtil } from 'src/app/utils/string-util';

export abstract class BookFormBase extends FormBase {

    book: Book;
    bookForm: FormGroup;
    genders: KeyValueInt[];
    authors: KeyValueInt[];
    imageName: string;
    imageUpload: string;

    errors: any[] = [];

    minLengthTitle: number = 1;
    maxLengthTitle: number = 100;

    minLengthSubTitle: number = 1;
    maxLengthSubTitle: number = 200;

    minLengthYear: number = 4;
    maxLengthYear: number = 4;

    minLengthEdition: number = 1;
    maxLengthEdition: number = 3;

    minLengthQtPag: number = 1;
    maxLengthQtPag: number = 4;

    minLengthISBN: number = 10;
    maxLengthISBN: number = 20;

    minLengthBarcode: number = 10;
    maxLengthBarcode: number = 30;

    minLengthValue: number = 1;
    maxLengthValue: number = 10;

    minLengthDate: number = 10;
    maxLengthDate: number = 10;

    minLengthObservation: number = 1;
    maxLengthObservation: number = 200;

    formResult: string = '';

    urlList: string = '/book/list';

    constructor() {
        super();

        this.validationMessages = {
            GenderId: { required: 'Select a Gender' },
            AuthorId: { required: 'Select an Author' },
            Title: {
                required: 'Enter the Title',
                minlength: 'The Title must have at least ' + this.minLengthTitle + ' characters',
                maxlength: 'The Title must be at most ' + this.maxLengthTitle + ' characters'
            },
            Subtitle: {
                minlength: 'The Subtitle must have at least ' + this.minLengthSubTitle + ' characters',
                maxlength: 'The Subtitle must be at most ' + this.maxLengthSubTitle + ' characters'
            },
            Year: {
                required: 'Enter the Year',
                minlength: 'The Year must have at least ' + this.minLengthYear + ' characters',
                maxlength: 'The Year must be at most ' + this.maxLengthYear + ' characters'
            },
            Edition: {
                required: 'Enter the Edition',
                minlength: 'The Edition must have at least ' + this.minLengthEdition + ' characters',
                maxlength: 'The Edition must be at most ' + this.maxLengthEdition + ' characters'
            },
            PageQuantity: {
                required: 'Enter the Page Quantity',
                minlength: 'The Page Quantity must have at least ' + this.minLengthQtPag + ' characters',
                maxlength: 'The Page Quantity must be at most ' + this.maxLengthQtPag + ' characters'
            },
            ISBN: {
                required: 'Enter the ISBN',
                minlength: 'The ISBN must have at least ' + this.minLengthISBN + ' characters',
                maxlength: 'The ISBN must be at most ' + this.maxLengthISBN + ' characters'
            },
            Barcode: {
                required: 'Enter the Barcode',
                minlength: 'The Barcode must have at least ' + this.minLengthBarcode + ' characters',
                maxlength: 'The Barcode must be at most ' + this.maxLengthBarcode + ' characters'
            },
            Value: {
                minlength: 'The Value must have at least ' + this.minLengthValue + ' characters',
                maxlength: 'The Value must be at most ' + this.maxLengthValue + ' characters'
            },
            PurchaseDate: {
                minlength: 'The Purchase Date must have at least ' + this.minLengthDate + ' characters',
                maxlength: 'The Purchase Date must be at most ' + this.maxLengthDate + ' characters'
            },
            Observation: {
                minlength: 'The Observation must have at least ' + this.minLengthObservation + ' characters',
                maxlength: 'The Observation must be at most ' + this.maxLengthObservation + ' characters'
            },
            Image: {
                required: 'Select the Image'
            }
        };

        super.configureBaseValidationMessages(this.validationMessages);
    }

    protected configureFormValidation(formInputElements: ElementRef[]) {
        super.configureBaseFormValidation(formInputElements, this.bookForm);
    }

    protected configValidators(fb: FormBuilder, action: string) {

        this.bookForm = fb.group({
            Id: 0,
            GenderId: ['', Validators.required],
            AuthorId: ['', Validators.required],
            Title: ['', [Validators.required, Validators.minLength(this.minLengthTitle), Validators.maxLength(this.maxLengthTitle)]],
            Subtitle: ['', [Validators.minLength(this.minLengthSubTitle), Validators.maxLength(this.maxLengthSubTitle)]],
            Year: ['', [Validators.required, Validators.minLength(this.minLengthYear), Validators.maxLength(this.maxLengthYear)]],
            Edition: ['', [Validators.required, Validators.minLength(this.minLengthEdition), Validators.maxLength(this.maxLengthEdition)]],
            PageQuantity: ['', [Validators.required, Validators.minLength(this.minLengthQtPag), Validators.maxLength(this.maxLengthQtPag)]],
            ISBN: ['', [Validators.required, Validators.minLength(this.minLengthISBN), Validators.maxLength(this.maxLengthISBN)]],
            Barcode: ['', [Validators.required, Validators.minLength(this.minLengthBarcode), Validators.maxLength(this.maxLengthBarcode)]],
            Value: ['', [Validators.minLength(this.minLengthValue), Validators.maxLength(this.maxLengthValue)]],
            PurchaseDate: [null, [Validators.minLength(this.minLengthDate), Validators.maxLength(this.maxLengthDate)]],
            Dedication: false,
            Observation: ['', [Validators.minLength(this.minLengthObservation), Validators.maxLength(this.maxLengthObservation)]],
            Image: (action == "I") ? ['', [Validators.required]] : [''],
            InclusionDate: []
        });
    }

    protected setObjToAPI() {
        this.book = Object.assign({}, this.book, this.bookForm.value);
        if (this.imageUpload != null && this.imageUpload.length > 0) {
            this.book.ImageUpload = this.imageUpload.split(',')[1];
        }

        this.formResult = JSON.stringify(this.book);
    }

    public formValid(): boolean {
        return this.bookForm.dirty && this.bookForm.valid;
    }

    public onFileChange(event: any): void {
        if (event.target.files && event.target.files[0]) {

            const filesName: string[] = [];
            for (let i = 0; i < event.target.files.length; i++) {
                filesName.push(event.target.files[i].name);
            }

            this.imageName = filesName.join(", ");

            ConvertFile.ToBase64(event.target.files[0])
                .then(result => this.imageUpload = result.toString());
        }
    }

    public clearTextFields() {
        this.book.Title = StringUtil.RemoveSpaces(this.book.Title);
        this.book.Subtitle = StringUtil.RemoveSpaces(this.book.Subtitle);
        this.book.ISBN = StringUtil.RemoveSpaces(this.book.ISBN);
        this.book.Barcode = StringUtil.RemoveSpaces(this.book.Barcode);
        this.book.Observation = StringUtil.RemoveSpaces(this.book.Observation);
    }
}