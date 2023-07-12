import { BookStore } from "../../contracts";
import { Book } from "../../book";
import { Borrowed } from "../../book";

/**
 * Represents an in-memory book store.
 * Implements the BookStore interface.
 */
export class InMemoryStore implements BookStore {
    /**
     * The array of all books in the store.
     */
    private readonly books: Book[];

    /**
     * The array of available books in the store.
     */
    private readonly availableBooks: Book[];

    /**
     * Creates an instance of InMemoryStore.
     */
    public constructor() {
        this.books = [];
        this.availableBooks = [];
    }

    /**
     * Adds a book to the store.
     *
     * @param {Book} book - The book to add.
     * @returns {void}
     */
    public add(book: Book): void {
        this.books.push(book);
        this.availableBooks.push(book);
    }

    /**
     * Checks if a book is available in the store.
     *
     * @param {Book} book - The book to check availability for.
     * @returns {boolean} - Returns true if the book is available, false otherwise.
     */
    public isAvailable(book: Book): boolean {
        return this.availableBooks.some(
            (available) => available.name === book.name,
        );
    }

    /**
     * Borrows a book from the store.
     *
     * @param {Book} book - The book to borrow.
     * @param {Date} startingFrom - The starting date of the borrowing.
     * @returns {Borrowed} - Returns the Borrowed object representing the borrowed book.
     * @throws {Error} - Throws an error if the book cannot be borrowed.
     */
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

    /**
     * Returns a book back to the store.
     *
     * @param {Book} book - The book to return.
     * @returns {void}
     * @throws {Error} - Throws an error if the book does not belong to this store.
     */
    public returnBack(book: Book): void {
        if (!this.isFromThisStore(book)) {
            throw new Error(
                "The book you are trying to return does not belong to this store!",
            );
        }

        this.availableBooks.push(book);
    }

    /**
     * Checks if a book belongs to this store.
     *
     * @param {Book} book - The book to check.
     * @returns {boolean} - Returns true if the book belongs to this store, false otherwise.
     */
    public isFromThisStore(book: Book): boolean {
        return this.books.some((stored) => stored.name === book.name);
    }

    /**
     * Returns all the books in the store.
     *
     * @returns {Book[]} - Returns an array of all books in the store.
     */
    public getAll(): Book[] {
        return [...this.books];
    }

    /**
     * Returns all the available books in the store.
     *
     * @returns {Book[]} - Returns an array of available books in the store.
     */
    public getAvailable(): Book[] {
        return [...this.availableBooks];
    }
}
