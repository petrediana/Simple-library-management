import { BookStore } from "../../contracts";
import { Book } from "../../book";
import { Borrowed } from "../../book";

export class InMemoryStore implements BookStore {
    private readonly books: Book[];
    private readonly availableBooks: Book[];

    public constructor() {
        this.books = this.availableBooks = [];
    }

    public add(book: Book): void {
        this.books.push(book);
        this.availableBooks.push(book);
    }

    public isAvailable(book: Book): boolean {
        return this.availableBooks.some(
            (available) => available.name === book.name,
        );
    }

    public borrow(book: Book, startingFrom: Date): Borrowed {
        if (this.isAvailable(book)) {
            const index = this.availableBooks.findIndex(
                (available) => available.name === book.name,
            );
            this.availableBooks.splice(index, 1);

            return new Borrowed(book, startingFrom.getTime());
        }

        throw new Error("Book cannot be borrowed...");
    }

    public returnBack(book: Book): void {
        if (!this.isFromThisStore(book)) {
            throw new Error(
                "The book you are trying to return does not belong to this store!",
            );
        }

        this.availableBooks.push(book);
    }

    public isFromThisStore(book: Book): boolean {
        return this.books.some((stored) => stored.name === book.name);
    }

    public getAll(): Book[] {
        return [...this.books];
    }

    public getAvailable(): Book[] {
        return [...this.availableBooks];
    }
}
