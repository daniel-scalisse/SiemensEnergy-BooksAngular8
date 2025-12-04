import { FormBase } from "src/app/base-class/form-base";

export abstract class AccountFormBase extends FormBase {

    minLengthEmail: number = 5;
    maxLengthEmail: number = 100;

    minLengthPassword: number = 6;
    maxLengthPassword: number = 15;
}