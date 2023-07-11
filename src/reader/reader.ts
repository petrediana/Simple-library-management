import {Borrowed} from "../book/borrowed";
import {Library} from "../library/library";
import {Book} from "../book/book";

export class Reader {
    public readonly name: string;
    private readonly borrowedBooks: Borrowed[] = [];

    public constructor(name: string) {
        this.name = name;
    }

    public borrowFrom(library: Library, book: Book): void {
        console.log(`${this.name} wants to borrow ${book.name}`);

        this.borrowedBooks.push(library.toBorrow(book))
    }

    public returnFirstBorrowedTo(library: Library): void {
        const first = this.borrowedBooks.shift();

        try {
            library.toReturn(first.book);
        } catch (e) {
            console.log(e);
            this.borrowedBooks.unshift(first);
        }
    }
}