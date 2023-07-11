import {Book} from "../book/book";
import {Borrowed} from "../book/borrowed";
import {TimeZone} from "../service/time/timeZone";
import {Time} from "../service/time/contracts";

export class Library {
    private readonly books: Book[];
    private readonly availableBooks: Book[];
    private readonly borrowedBooks: Borrowed[];

    private readonly time: Time;

    public constructor(books: Book[], time: TimeZone = new TimeZone()) {
        this.books = [...books];
        this.availableBooks = [...books];
        this.borrowedBooks = [];
        this.time = time;
    }

    public add(book: Book): void {
        this.books.push(book);
        this.availableBooks.push(book);
    }

    public canBeBorrowed(book: Book): boolean {
        const isAvailable = this.availableBooks.find(available => available.name === book.name);
        return !!isAvailable;
    }

    public toBorrow(book: Book): Borrowed {
        if (this.canBeBorrowed(book)) {
            const index = this.availableBooks.findIndex(available => available.name === book.name);
            this.availableBooks.splice(index, 1);

            const borrowed = new Borrowed(book, this.time.getCurrent());
            this.borrowedBooks.push(borrowed);

            return borrowed;
        }
        throw new Error("Book can not be borrowed...");
    }

    public toReturn(book: Book): void {
        const isBookFromThisLibrary = this.books.find(thisBook => thisBook.name === book.name);

        if (!isBookFromThisLibrary) {
            throw new Error("The book that you are trying to return does not belong to this Library!");
        }

        const index = this.borrowedBooks.findIndex(borrowed => borrowed.book.name === book.name);
        if (index === -1) {
            throw new Error("This book was not borrowed from this library!");
        }

        const borrowed = this.borrowedBooks[index];
        const borrowedDate = new Date(borrowed.borrowedDate);
        const returnDate = new Date(this.time.getCurrent());
        const differenceInDays = (returnDate.getTime() - borrowedDate.getTime()) / (1000 * 3600 * 24);

        if (differenceInDays >= 15) {
            console.log("You are late with the book and need to pay a penalty...");
        } else {
            console.log("Book returned with no penalties.")
        }

        this.availableBooks.push(book);
        this.borrowedBooks.splice(index, 1);
    }

    public displayAllBooks(): void {
        console.log("These are all the books in the library...");
        console.log(this.books);
    }

    public displayAvailableBooks(): void {
        console.log("These are all the books available to be borrowed in the library...");
        console.log(this.availableBooks);
    }

    public displayBorrowedBooks(): void {
        console.log("These are all the borrowed books from the library...");
        console.log(this.borrowedBooks);
    }
}