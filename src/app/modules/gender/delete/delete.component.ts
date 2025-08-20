import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { Gender, GenderDetails } from '../gender';
import { GenderService } from '../services/gender.service';
import { BookView } from '../../book/book';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styles: []
})
export class DeleteComponent {

  details: GenderDetails;
  gender: Gender;
  books: BookView[];
  errors: any[] = [];

  constructor(
    private service: GenderService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService) {

    this.details = this.route.snapshot.data['gender'];
    this.gender = this.details.Gender;
    this.books = this.details.Books;
  }

  del() {
    this.service.del(this.gender.Id)
      .subscribe(
        gender => { this.processSuccess(gender) },
        failure => { this.processError(failure) }
      );
  }

  processSuccess(gender: any) {

    const toast = this.toastr.success('Gender successfully deleted.', 'Success!');
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/gender/list']);
      });
    }
  }

  processError(failure: any) {
    this.errors = failure.error.errors;
    this.toastr.error('There was an error deleting!', 'Oops! :(');
  }
}