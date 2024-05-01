import { TableFactory } from "@ratatouille/modules/order/core/model/table.factory";
import { FailingTablesGateway } from "@ratatouille/modules/order/core/testing/failing.table-gateway";
import { StubTableGateway } from "@ratatouille/modules/order/core/testing/stub.table-gateway";
import { fetchTables } from "@ratatouille/modules/order/core/usecases/fetch-table.usecase";
import { createTestStore } from "@ratatouille/modules/testing/tests-environment";

describe("Fetch tables", () => {
  it("Should fetch tables", async () => {
    const table = TableFactory.create({
      id: "1",
    });

    const listOfTables = [table];
    const store = createTestStore({
      dependencies: {
        tableGateway: new StubTableGateway(listOfTables),
      },
    });

    const promise = store.dispatch(fetchTables);

    expect(store.getState().ordering.availableTables.status).toBe("loading");

    await promise;

    expect(store.getState().ordering.availableTables.data).toEqual(
      listOfTables
    );
    expect(store.getState().ordering.availableTables.status).toBe("success");
  });

  it("Should handle table fetching failure", async () => {
    const table = TableFactory.create({
      id: "1",
    });

    const listOfTables = [table];
    const store = createTestStore({
      dependencies: {
        tableGateway: new FailingTablesGateway(),
      },
    });

    const promise = store.dispatch(fetchTables);

    expect(store.getState().ordering.availableTables.status).toEqual("loading");

    await promise;

    expect(store.getState().ordering.availableTables.data).toEqual([]);
    expect(store.getState().ordering.availableTables.status).toEqual("error");
    expect(store.getState().ordering.availableTables.error).toEqual(
      "Failed to fetch data"
    );
  });
});
