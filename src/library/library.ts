import { Book } from "../book";
import { Borrowed } from "../book";
import { DefaultDateTimeProvider } from "../provider/time";
import { DateTimeProvider } from "../provider/time/contracts";
import { BookStore } from "../contracts";
import { LoggerProvider } from "../provider/logger/contracts";
import { PenaltyProvider } from "../provider/penalty/contracts";
import { ConsoleLoggerProvider } from "../provider/logger";
import { DefaultPenaltyCalculator } from "../provider/penalty";

export class Library implements BookStore {
    private readonly store: BookStore;
    private readonly borrowedBooks: Borrowed[];

    private readonly dateTimeProvider: DateTimeProvider;
    private readonly loggerProvider: LoggerProvider;
    private readonly penaltyProvider: PenaltyProvider;

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

    public add(book: Book): void {
        this.store.add(book);
    }

    public isAvailable(book: Book): boolean {
        return this.store.isAvailable(book);
    }

    public isFromThisStore(book: Book): boolean {
        return this.store.isFromThisStore(book);
    }

    public borrow(
        book: Book,
        startingFrom: Date = this.dateTimeProvider.getCurrentDateTime(),
    ): Borrowed {
        const borrowed = this.store.borrow(book, startingFrom);
        this.borrowedBooks.push(borrowed);

        return borrowed;
    }

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

    public getAll(): Book[] {
        return [...this.store.getAll()];
    }

    public getAvailable(): Book[] {
        return [...this.store.getAvailable()];
    }

    // TODO: maybe move the displays to dedicated class...
    public displayAllBooks(): void {
        this.loggerProvider.log("These are all the books in the library...");
        this.loggerProvider.log(this.store.getAll());
    }

    public displayAvailableBooks(): void {
        this.loggerProvider.log(
            "These are all the books available to be borrowed in the library...",
        );
        this.loggerProvider.log(this.store.getAvailable());
    }

    public displayBorrowedBooks(): void {
        this.loggerProvider.log(
            "These are all the borrowed books from the library...",
        );
        this.loggerProvider.log(this.borrowedBooks);
    }
}
