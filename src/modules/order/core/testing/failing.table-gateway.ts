import { ITableGateway } from "@ratatouille/modules/order/core/gateway/table.gateway";
import { OrderingDomainModel } from "@ratatouille/modules/order/core/model/ordering.domain-model";

export class FailingTablesGateway implements ITableGateway {
  constructor() {}

  async getTables(): Promise<OrderingDomainModel.Table[]> {
    return Promise.reject(new Error("Failed to fetch data"));
  }
}
