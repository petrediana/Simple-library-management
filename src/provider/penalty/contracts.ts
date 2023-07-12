import { Borrowed } from "../../book";

export interface PenaltyProvider {
    calculate(borrowed: Borrowed): number;
}
