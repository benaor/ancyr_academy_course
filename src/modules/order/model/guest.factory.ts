import { OrderingDomainModel } from "@ratatouille/modules/order/model/ordering.domain-model";

export class guestFactory {
  static create(
    data?: Partial<OrderingDomainModel.Guest>
  ): OrderingDomainModel.Guest {
    return {
      id: "",
      firstName: "",
      lastName: "",
      age: 24,
      ...data,
    };
  }
}
