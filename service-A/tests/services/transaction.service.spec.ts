import TransactionService from "@services/transaction.service";

describe("TransactionService", () => {
  let transactionService: TransactionService;

  beforeEach(() => {
    transactionService = new TransactionService();
  });

  it("should digest hash", () => {
    expect(transactionService.digest("message to hash")).toEqual(
      "daf0993ca545bafdff611b60be9fc7d51a2830cd595ef52eb7cbf13655c757f3"
    );
  });
});
