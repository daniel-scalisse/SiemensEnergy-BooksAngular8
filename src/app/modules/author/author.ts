import { BookView } from "../book/book";

export class Author {
    Id: number;
    Name: string;
    InclusionDate: Date;
}

export class AuthorDetails {
    Author: Author;
    Books: BookView[];
}