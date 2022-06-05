import { Container } from "inversify";
import ProducerService from "@services/producer.service";
import TransactionService from "@services/transaction.service";

var container = new Container();
container.bind<ProducerService>(ProducerService).to(ProducerService);
container.bind<TransactionService>(TransactionService).to(TransactionService);

export default container;