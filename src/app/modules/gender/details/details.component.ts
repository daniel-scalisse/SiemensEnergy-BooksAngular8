import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Gender, GenderDetails } from '../gender';
import { BookView } from '../../book/book';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html'
})
export class DetailsComponent {

  details: GenderDetails;
  gender: Gender;
  books: BookView[];

  constructor(private route: ActivatedRoute) {

    this.details = this.route.snapshot.data['gender'];
    this.gender = this.details.Gender;
    this.books = this.details.Books;
  }
}