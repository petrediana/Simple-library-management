import { DateTimeProvider } from "../../provider/time/contracts";
import { DefaultPenaltyCalculator } from "../../provider/penalty";
import { Book, Borrowed } from "../../book";

class MockTimeProvider implements DateTimeProvider {
    private readonly date: Date = new Date("2023-07-15");

    getCurrentDateTime(): Date {
        return this.date;
    }

    getCurrentTime(): number {
        return this.date.getTime();
    }
}

describe("DefaultPenaltyCalculator", () => {
    const dateTimeProvider: DateTimeProvider = new MockTimeProvider();
    const penaltyCalculator: DefaultPenaltyCalculator =
        new DefaultPenaltyCalculator(dateTimeProvider);

    describe("calculate", () => {
        it("Should return 0 if book is returned within the allowed borrowing time", () => {
            const book = new Book("book", "isbn..", 10);
            const borrowed = new Borrowed(
                book,
                new Date("2023-07-01").getTime(),
            );

            const penalty = penaltyCalculator.calculate(borrowed);

            expect(penalty).toBe(0);
        });

        it("Should correctly calculate the penalty if the book is returned after the allowed borrowing time", () => {
            const book = new Book("book", "isbn..", 10);
            const borrowed = new Borrowed(
                book,
                new Date("2023-06-29").getTime(),
            );

            const penalty = penaltyCalculator.calculate(borrowed);

            expect(penalty).toBe(0.2);
        });
    });
});
