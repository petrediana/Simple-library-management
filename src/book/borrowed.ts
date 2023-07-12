import { Book } from "./book";

export class Borrowed {
    private readonly _book: Book;
    private readonly _borrowedDate: number;

    public constructor(book: Book, borrowedDate: number) {
        this._book = book;
        this._borrowedDate = borrowedDate;
    }

    public get book(): Book {
        return this._book;
    }

    public get borrowedDate(): number {
        return this._borrowedDate;
    }
}
