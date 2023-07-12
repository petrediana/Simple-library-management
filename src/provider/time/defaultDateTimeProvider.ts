import { DateTimeProvider } from "./contracts";

export class DefaultDateTimeProvider implements DateTimeProvider {
    public getCurrentDateTime(): Date {
        return new Date(Date.now());
    }

    public getCurrentTime(): number {
        return Date.now();
    }
}
