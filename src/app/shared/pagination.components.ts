import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-pagination',
    template: `
    <nav class="text-center" aria-label="Pagination">
        <ul class="pagination justify-content-center">
            <li class="pageSize">Page size:&nbsp;&nbsp;&nbsp;</li>
            <select [(ngModel)]="pageSize" (change)="onChangePageSize($event)">
                <option *ngFor="let s of pagesSize" value="{{s}}">{{s}}</option>
            </select>&nbsp;&nbsp;&nbsp;
            <li class="page-item">
                <button type="button" class="page-link" (click)="onToFirst()">First</button>
            </li>
            <li class="page-item">
                <button type="button" class="page-link" (click)="onToPrevious()">Previous</button>
            </li>
            <li class="page-item">
                <input type="number" [(ngModel)]="page" min="1" class="form-control page-number" />
            </li>
            <li class="page-item">
                <button type="button" class="page-link" (click)="onToNext()">Next</button>
            </li>
            <li class="page-item">
                <button type="button" class="page-link" (click)="onToLast()">Last</button>
            </li>
            <li class="pageSize">Pages: {{pages}}</li>
            <li class="pageSize">Total: {{total}}</li>
        </ul>
    </nav>
    `
})
export class PaginationComponent {

    @Input() pagesSize: number[];
    @Input() pageSize: number;

    @Input() page: number;
    @Input() pages: number;
    @Input() total: number;

    @Output() changePageSize = new EventEmitter<number>();
    @Output() toFirst = new EventEmitter();
    @Output() toPrevious = new EventEmitter();
    @Output() toNext = new EventEmitter();
    @Output() toLast = new EventEmitter();

    onChangePageSize(event) {
        this.changePageSize.emit(event.target.value);
    }

    onToFirst() {
        this.toFirst.emit();
    }

    onToPrevious() {
        this.toPrevious.emit();
    }

    onToNext() {
        this.toNext.emit();
    }

    onToLast() {
        this.toLast.emit();
    }
}