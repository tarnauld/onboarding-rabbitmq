import crypto from "crypto";
import { injectable } from "inversify";

interface ITransactionService {
    digest(message: string): string;
}

@injectable()
export default class TransactionService implements ITransactionService{
    digest(message: string): string {
        return crypto.createHash('sha256').update(message).digest('hex');
    }
}