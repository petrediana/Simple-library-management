import { Book } from "../book";
import { Borrowed } from "../book";
import { DefaultDateTimeProvider } from "../provider/time";
import { DateTimeProvider } from "../provider/time/contracts";
import { BookStore } from "../contracts";
import { LoggerProvider } from "../provider/logger/contracts";
import { PenaltyProvider } from "../provider/penalty/contracts";
import { ConsoleLoggerProvider } from "../provider/logger";
import { DefaultPenaltyCalculator } from "../provider/penalty";

/**
 * Represents a library that implements the BookStore interface.
 */
export class Library implements BookStore {
    /**
     * The underlying book store.
     */
    private readonly store: BookStore;

    /**
     * The array of borrowed books.
     */
    private readonly borrowedBooks: Borrowed[];

    /**
     * The DateTimeProvider instance used for time-related operations.
     */
    private readonly dateTimeProvider: DateTimeProvider;

    /**
     * The LoggerProvider instance used for logging.
     */
    private readonly loggerProvider: LoggerProvider;

    /**
     * The PenaltyProvider instance used for penalty calculation.
     */
    private readonly penaltyProvider: PenaltyProvider;

    /**
     * Creates an instance of Library.
     *
     * @param {BookStore} store - The underlying book store.
     * @param {DateTimeProvider} [dateTimeProvider=new DefaultDateTimeProvider()] - The DateTimeProvider instance for time-related operations.
     * @param {LoggerProvider} [loggerProvider=new ConsoleLoggerProvider()] - The LoggerProvider instance for logging.
     * @param {PenaltyProvider} [penaltyProvider=new DefaultPenaltyCalculator(dateTimeProvider)] - The PenaltyProvider instance for penalty calculation.
     */
    public constructor(
        store: BookStore,
        dateTimeProvider: DateTimeProvider = new DefaultDateTimeProvider(),
        loggerProvider: LoggerProvider = new ConsoleLoggerProvider(),
        penaltyProvider: PenaltyProvider = new DefaultPenaltyCalculator(
            dateTimeProvider,
        ),
    ) {
        this.store = store;
        this.borrowedBooks = [];
        this.dateTimeProvider = dateTimeProvider;
        this.loggerProvider = loggerProvider;
        this.penaltyProvider = penaltyProvider;
    }

    /**
     * Adds a book to the library.
     *
     * @param {Book} book - The book to add.
     * @returns {void}
     */
    public add(book: Book): void {
        this.store.add(book);
    }

    /**
     * Checks if a book is available in the library.
     *
     * @param {Book} book - The book to check availability for.
     * @returns {boolean} - Returns true if the book is available, false otherwise.
     */
    public isAvailable(book: Book): boolean {
        return this.store.isAvailable(book);
    }

    /**
     * Checks if a book belongs to this library.
     *
     * @param {Book} book - The book to check.
     * @returns {boolean} - Returns true if the book belongs to this library, false otherwise.
     */
    public isFromThisStore(book: Book): boolean {
        return this.store.isFromThisStore(book);
    }

    /**
     * Borrows a book from the library.
     *
     * @param {Book} book - The book to borrow.
     * @param {Date} [startingFrom=this.dateTimeProvider.getCurrentDateTime()] - The starting date of the borrowing.
     * @returns {Borrowed} - Returns the Borrowed object representing the borrowed book.
     */
    public borrow(
        book: Book,
        startingFrom: Date = this.dateTimeProvider.getCurrentDateTime(),
    ): Borrowed {
        const borrowed = this.store.borrow(book, startingFrom);
        this.borrowedBooks.push(borrowed);

        return borrowed;
    }

    /**
     * Returns a book back to the library.
     *
     * @param {Book} book - The book to return.
     * @returns {void}
     * @throws {Error} - Throws an error if the book was not borrowed from this library.
     */
    public returnBack(book: Book): void {
        const borrowed = this.borrowedBooks.find(
            (borrowed) => borrowed.book.name === book.name,
        );
        if (!borrowed) {
            throw new Error("This book was not borrowed from this library!");
        }

        const penalty = this.penaltyProvider.calculate(borrowed);
        if (penalty !== 0) {
            this.loggerProvider.log(
                `You have to pay this penalty: **${penalty}**!`,
            );
        }

        this.store.returnBack(book);
        this.borrowedBooks.splice(this.borrowedBooks.indexOf(borrowed), 1);
    }

    /**
     * Returns all the books in the library.
     *
     * @returns {Book[]} - Returns an array of all books in the library.
     */
    public getAll(): Book[] {
        return [...this.store.getAll()];
    }

    /**
     * Returns all the available books in the library.
     *
     * @returns {Book[]} - Returns an array of available books in the library.
     */
    public getAvailable(): Book[] {
        return [...this.store.getAvailable()];
    }

    /**
     * Displays all the books in the library.
     *
     * @returns {void}
     */
    public displayAllBooks(): void {
        this.loggerProvider.log("These are all the books in the library...");
        this.loggerProvider.log(this.store.getAll());
    }

    /**
     * Displays all the available books in the library.
     *
     * @returns {void}
     */
    public displayAvailableBooks(): void {
        this.loggerProvider.log(
            "These are all the books available to be borrowed in the library...",
        );
        this.loggerProvider.log(this.store.getAvailable());
    }

    /**
     * Displays all the borrowed books in the library.
     *
     * @returns {void}
     */
    public displayBorrowedBooks(): void {
        this.loggerProvider.log(
            "These are all the borrowed books from the library...",
        );
        this.loggerProvider.log(this.borrowedBooks);
    }
}
