import { KeyValueInt } from "src/app/base-dto/keyValueInt";

export class Book {
    Id: number;
    GenderId: number;
    AuthorId: number;
    Title: string;
    Subtitle: string;
    Year: number;
    Edition: number;
    PageQuantity: number;
    ISBN: string;
    Barcode: string;
    Value: number | null = null;
    PurchaseDate: Date | null = null;
    Dedication: boolean;
    Observation: string;
    ImageUpload: string;
    InclusionDate: Date;
}

export class BookView {
    Id: number;
    GenderName: string;
    AuthorName: string;
    Title: string;
    Subtitle: string;
    Year: number;
    Edition: number;
    PageQuantity: number;
    ISBN: string;
    Barcode: string;
    Value: number;
    PurchaseDate: Date;
    Dedication: boolean;
    Observation: string;
    ImageUpload: string;
    InclusionDate: Date;
}

export class BookLists {
    Genders: KeyValueInt[];
    Authors: KeyValueInt[];
}

export class BookEdit {
    Book: Book;
    BookLists: BookLists;
}