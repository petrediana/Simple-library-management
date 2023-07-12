import { InMemoryStore } from "../../store/inMemory";
import { Book } from "../../book";

describe("InMemoryStore", () => {
    let store: InMemoryStore;

    beforeEach(() => {
        store = new InMemoryStore();
    });

    describe("add", () => {
        it("Should add a book to the store", () => {
            const book = new Book("book", "isbn...", 69.42);

            store.add(book);

            expect(store.getAll()).toContain(book);
            expect(store.getAll()).toHaveLength(1);

            expect(store.getAvailable()).toContain(book);
            expect(store.getAvailable()).toHaveLength(1);
        });
    });

    describe("isAvailable", () => {
        it("Should return true if the book is available", () => {
            const book = new Book("book", "isbn...", 69.42);
            store.add(book);

            const result = store.isAvailable(book);

            expect(result).toBe(true);
        });

        it("Should return false if the book is not available", () => {
            const book = new Book("book", "isbn...", 69.42);
            store.add(book);

            const result = store.isAvailable(
                new Book("anotherBook!", "isbn", 10),
            );

            expect(result).toBe(false);
        });
    });

    describe("borrow", () => {
        it("Should borrow a book and return a Borrowed object", () => {
            const book = new Book("book", "isbn...", 69.42);
            const date = new Date("2023-07-15");
            store.add(book);

            const borrowed = store.borrow(book, date);

            expect(borrowed.book).toBe(book);
            expect(borrowed.borrowedDate).toBe(date.getTime());

            expect(store.getAvailable()).not.toContain(book);
            expect(store.getAvailable()).toHaveLength(0);
        });

        it("Should throw an error if the book cannot be borrowed", () => {
            const book = new Book("book", "isbn...", 69.42);

            expect(() => store.borrow(book, new Date())).toThrow(
                "Book cannot be borrowed...",
            );
        });
    });

    describe("returnBack", () => {
        it("Should return a book to the store", () => {
            const book = new Book("book", "isbn...", 69.42);
            store.add(book);

            store.borrow(book, new Date());
            store.returnBack(book);

            expect(store.isAvailable(book)).toBe(true);
            expect(store.getAvailable()).toContain(book);
            expect(store.getAvailable()).toHaveLength(1);
        });

        it("Should throw an error if the book does not belong to the store", () => {
            const book = new Book("book", "isbn...", 69.42);

            expect(() => store.returnBack(book)).toThrow(
                "The book you are trying to return does not belong to this store!",
            );
        });
    });

    describe("isFromThisStore", () => {
        test("Should return true if the book belongs to the store", () => {
            const book = new Book("book", "isbn...", 69.42);
            store.add(book);

            const result = store.isFromThisStore(book);

            expect(result).toBe(true);
        });

        test("Should return false if the book does not belong to the store", () => {
            const book = new Book("book", "isbn...", 69.42);

            const result = store.isFromThisStore(book);

            expect(result).toBe(false);
        });
    });
});
