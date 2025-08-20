import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-global-errors',
  template: `
    <div id="divMsg" class="alert alert-danger" [style.display]="errors.length > 0?'block':'none'">
      <button type="button" class="close" data-dismiss="alert" (click)="closeMsg()">x</button>
      <h3 id="msgRetorno">Oops! Something went wrong:</h3>
      <ul>
        <li *ngFor="let error of errors">{{ error }}</li>
      </ul>
    </div>`
})
export class GlobalErrorsComponent {
  @Input() errors: any[] = [];

  closeMsg() {
    this.errors = [];
  }
}