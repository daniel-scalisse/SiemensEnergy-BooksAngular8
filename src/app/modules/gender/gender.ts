import { BookView } from "../book/book";

export class Gender {
    Id: number;
    Name: string;
    InclusionDate: Date;
}

export class GenderDetails {
    Gender: Gender;
    Books: BookView[];
}