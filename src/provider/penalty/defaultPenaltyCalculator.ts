import {PenaltyProvider} from "./contracts";
import {DateTimeProvider} from "../time/contracts";
import {Borrowed} from "../../book";

export class DefaultPenaltyCalculator implements PenaltyProvider {
    private readonly dateTimeProvider: DateTimeProvider;

    public constructor(dateTimeProvider: DateTimeProvider) {
        this.dateTimeProvider = dateTimeProvider;
    }

    public calculate(borrowed: Borrowed): number {
        const borrowedDate = new Date(borrowed.borrowedDate);
        const returnDate = new Date(this.dateTimeProvider.getCurrentTime());

        const daysDifference = (returnDate.getTime() - borrowedDate.getTime()) / (1000 * 3600 * 24);

        if (daysDifference >= 15) {
            return borrowed.book.priceToBorrow * 0.01 * (daysDifference - 14);
        }

        return 0;
    }
}