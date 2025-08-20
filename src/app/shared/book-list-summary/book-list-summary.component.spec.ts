import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookListSummaryComponent } from './book-list-summary.component';

describe('BookListSummaryComponent', () => {
  let component: BookListSummaryComponent;
  let fixture: ComponentFixture<BookListSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookListSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookListSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
