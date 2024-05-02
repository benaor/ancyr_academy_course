import { ITableGateway } from "@ratatouille/modules/order/core/gateway/table.gateway";
import { OrderingDomainModel } from "@ratatouille/modules/order/core/model/ordering.domain-model";
import { TableFactory } from "@ratatouille/modules/order/core/model/table.factory";

export class inMemoryTableGateway implements ITableGateway {
  async getTables(): Promise<OrderingDomainModel.Table[]> {
    return [
      TableFactory.create({
        id: "1",
        title: "Close to the window",
        capacity: 3,
      }),
      TableFactory.create({
        id: "2",
        title: "Close to the kitchen",
        capacity: 4,
      }),
      TableFactory.create({
        id: "3",
        title: "Close to the bar",
        capacity: 2,
      }),
    ];
  }
}
