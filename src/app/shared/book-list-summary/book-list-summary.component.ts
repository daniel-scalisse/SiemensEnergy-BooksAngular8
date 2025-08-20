import { Component, Input, OnInit } from '@angular/core';
import { Book } from 'src/app/modules/book/book';

@Component({
    selector: 'book-list-summary',
    templateUrl: './book-list-summary.component.html'
})
export class BookListSummaryComponent implements OnInit {
    title: string;

    @Input()
    books: Book[];

    ngOnInit(): void {
        this.title = "Books - " + this.books.length.toString() + (this.books.length > 1 ? " registers" : " register");
    }
}