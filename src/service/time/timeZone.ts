import {Time} from "./contracts";

export class TimeZone implements Time {

    public getCurrent(): number {
        return Date.now();
    }
}