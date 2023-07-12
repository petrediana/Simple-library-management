import {Book} from "../book";
import {Borrowed} from "../book";

export interface BookStore {
    add(book: Book): void;
    isAvailable(book: Book): boolean;
    borrow(book: Book, startingFrom?: Date): Borrowed;
    returnBack(book: Book): void;
    isFromThisStore(book: Book): boolean;
    getAll(): Book[];
    getAvailable(): Book[];
}