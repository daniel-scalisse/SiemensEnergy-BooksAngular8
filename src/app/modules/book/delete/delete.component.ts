import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { BookView } from '../book';
import { BookService } from '../services/book.service';
import { ConvertBool } from 'src/app/utils/convert-bool';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styles: []
})
export class DeleteComponent {

  book: BookView;
  dedication: string;
  errors: any[] = [];

  constructor(
    private service: BookService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService) {

    this.book = this.route.snapshot.data['book'];
    this.dedication = ConvertBool.ToYesOrNo(this.book.Dedication);
  }

  del() {
    this.service.del(this.book.Id)
      .subscribe(
        book => { this.processSuccess(book) },
        failure => { this.processError(failure) }
      );
  }

  processSuccess(book: any) {

    const toast = this.toastr.success('Book successfully deleted.', 'Success!');
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/book/list']);
      });
    }
  }

  processError(failure: any) {
    this.errors = failure.error.errors;
    this.toastr.error('There was an error deleting!', 'Oops! :(');
  }
}