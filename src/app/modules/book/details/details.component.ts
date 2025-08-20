import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BookView } from '../book';
import { ConvertBool } from 'src/app/utils/convert-bool';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html'
})
export class DetailsComponent {

  book: BookView;
  authorsName: string = "";
  dedication: string;

  constructor(private route: ActivatedRoute) {

    this.book = this.route.snapshot.data['book'];
    this.dedication = ConvertBool.ToYesOrNo(this.book.Dedication);
  }
}