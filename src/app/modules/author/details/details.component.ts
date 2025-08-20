import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Author, AuthorDetails } from '../author';
import { BookView } from '../../book/book';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html'
})
export class DetailsComponent {

  details: AuthorDetails;
  author: Author;
  books: BookView[];

  constructor(private route: ActivatedRoute) {

    this.details = this.route.snapshot.data['author'];
    this.author = this.details.Author;
    this.books = this.details.Books;
  }
}