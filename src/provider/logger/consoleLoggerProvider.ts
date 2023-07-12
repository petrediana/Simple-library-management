import { LoggerProvider } from "./contracts";

export class ConsoleLoggerProvider implements LoggerProvider {
    public log(message: unknown): void {
        console.log(message);
    }
}
