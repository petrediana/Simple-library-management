import { PenaltyProvider } from "./contracts";
import { DateTimeProvider } from "../time/contracts";
import { Borrowed } from "../../book";

/**
 * Represents a default penalty calculator.
 * Implements the PenaltyProvider interface.
 */
export class DefaultPenaltyCalculator implements PenaltyProvider {
    /**
     * The DateTimeProvider instance used for calculating penalties.
     */
    private readonly dateTimeProvider: DateTimeProvider;

    /**
     * Creates an instance of DefaultPenaltyCalculator.
     *
     * @param {DateTimeProvider} dateTimeProvider - The DateTimeProvider instance to use for time calculations.
     */
    public constructor(dateTimeProvider: DateTimeProvider) {
        this.dateTimeProvider = dateTimeProvider;
    }

    /**
     * Calculates the penalty for a borrowed book.
     *
     * @param {Borrowed} borrowed - The Borrowed object representing the borrowed book.
     * @returns {number} - Returns the calculated penalty amount.
     */
    public calculate(borrowed: Borrowed): number {
        const borrowedDate = new Date(borrowed.borrowedDate);
        const returnDate = new Date(this.dateTimeProvider.getCurrentTime());

        const daysDifference =
            (returnDate.getTime() - borrowedDate.getTime()) /
            (1000 * 3600 * 24);

        if (daysDifference >= 15) {
            return borrowed.book.priceToBorrow * 0.01 * (daysDifference - 14);
        }

        return 0;
    }
}
