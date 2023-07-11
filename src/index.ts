import {Book} from "./book/book";
import {Library} from "./library/library";
import {Reader} from "./reader/reader";

const books: Book[] = [
    new Book("BlaBla1", "isbn1", 10.20),
    new Book("BlaBla1", "isbn1", 10.20),
    new Book("BlaBla3", "isbn3", 15.70),
    new Book("BlaBla2", "isbn2", 12.50),
];

const library = new Library(books);
const reader = new Reader("a smart book reader");

reader.borrowFrom(library, new Book("BlaBla2", "isbn2", 12.50));

library.displayAllBooks();
library.displayAvailableBooks();
library.displayBorrowedBooks();

reader.returnFirstBorrowedTo(library);
library.displayAvailableBooks();
library.displayBorrowedBooks();