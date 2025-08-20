import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { Author, AuthorDetails } from '../author';
import { AuthorService } from '../services/author.service';
import { BookView } from '../../book/book';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styles: []
})
export class DeleteComponent {

  details: AuthorDetails;
  author: Author;
  books: BookView[];
  errors: any[] = [];

  constructor(
    private service: AuthorService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService) {

    this.details = this.route.snapshot.data['author'];
    this.author = this.details.Author;
    this.books = this.details.Books;
  }

  del() {
    this.service.del(this.author.Id)
      .subscribe(
        author => { this.processSuccess(author) },
        failure => { this.processError(failure) }
      );
  }

  processSuccess(author: any) {

    const toast = this.toastr.success('Author successfully deleted.', 'Success!');
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/author/list']);
      });
    }
  }

  processError(failure: any) {
    this.errors = failure.error.errors;
    this.toastr.error('There was an error deleting!', 'Oops! :(');
  }
}