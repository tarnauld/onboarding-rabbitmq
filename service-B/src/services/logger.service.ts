import { injectable } from "inversify";

@injectable()
export class LoggerService {
    public print(message: string): void {
        console.log(message);
    }
}